import { db } from "./firebase";
import { Timestamp } from "firebase-admin/firestore";

export type OrderItemInput = {
  type: "easy" | "link";
  brand?: string;
  category?: string;
  url?: string;
  details?: string;
  quantity: number;
  itemName?: string;
  color?: string;
  size?: string;
  budgetMin?: number | null;
  budgetMax?: number | null;
  notes?: string;
};

export type OrderInput = {
  brand?: string;
  customer: {
    name?: string;
    phone: string;
    email: string;
  };
  address: {
    area: string;
    details?: string;
  };
  items: OrderItemInput[];
};

export async function createOrder(data: OrderInput) {
  const orderRef = db.collection("orders").doc();
  const now = Timestamp.now();
  const orderPayload = {
    brand: data.brand ?? null,
    customer: data.customer,
    address: data.address,
    status: "submitted" as const,
    quote: null,
    payment: null,
    created_at: now,
  };

  await orderRef.set(orderPayload);
  const batch = db.batch();
  data.items.forEach((item) => {
    const itemRef = orderRef.collection("items").doc();
    batch.set(itemRef, {
      type: item.type,
      brand: item.brand ?? null,
      category: item.category ?? null,
      url: item.url ?? null,
      details: item.details ?? null,
      quantity: item.quantity,
      itemName: item.itemName ?? null,
      color: item.color ?? null,
      size: item.size ?? null,
      budgetMin: item.budgetMin ?? null,
      budgetMax: item.budgetMax ?? null,
      notes: item.notes ?? null,
      created_at: now,
    });
  });
  await batch.commit();
  return orderRef.id;
}

export async function listOrders() {
  const snapshot = await db
    .collection("orders")
    .orderBy("created_at", "desc")
    .limit(50)
    .get();
  const orders: any[] = [];
  for (const doc of snapshot.docs) {
    const itemsSnap = await doc.ref.collection("items").get();
    orders.push({ id: doc.id, ...doc.data(), items: itemsSnap.docs.map((d) => ({ id: d.id, ...d.data() })) });
  }
  return orders;
}

export async function getOrder(orderId: string) {
  const doc = await db.collection("orders").doc(orderId).get();
  if (!doc.exists) return null;
  const itemsSnap = await doc.ref.collection("items").get();
  return { id: doc.id, ...doc.data(), items: itemsSnap.docs.map((d) => ({ id: d.id, ...d.data() })) } as any;
}

export async function saveQuote(orderId: string, quote: {
  item_cost_usd: number;
  shipping_usd: number;
  customs_usd: number;
  service_fee_usd: number;
  fx_rate_used: number;
}) {
  const total_ghs =
    (quote.item_cost_usd + quote.shipping_usd + quote.customs_usd + quote.service_fee_usd) * quote.fx_rate_used;
  await db.collection("orders").doc(orderId).update({
    quote: { ...quote, total_ghs },
    status: "quoted",
  });
  return total_ghs;
}

export async function markPaid(orderId: string, payment: { provider: string; reference: string }) {
  await db.collection("orders").doc(orderId).update({
    status: "paid",
    payment: { ...payment, status: "paid" },
  });
}

export async function updateStatus(orderId: string, status: string) {
  await db.collection("orders").doc(orderId).update({ status });
}
