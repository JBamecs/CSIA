import { NextResponse } from "next/server";
import { getOrder, markPaid } from "@/lib/orders";

const HUBTEL_BASE = "https://payproxyapi.hubtel.com/items/initiate";

export async function POST(_: Request, { params }: { params: { orderId: string } }) {
  try {
    const order = await getOrder(params.orderId);
    if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });
    if (!order.quote) return NextResponse.json({ error: "Quote not ready" }, { status: 400 });

    const providerKey = process.env.HUBTEL_API_KEY;
    const providerAccount = process.env.HUBTEL_MERCHANT_ACCOUNT;
    const callbackUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/payments/hubtel/webhook`;
    const returnUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/pay/${params.orderId}`;

    if (!providerKey || !providerAccount || !process.env.NEXT_PUBLIC_BASE_URL) {
      await markPaid(params.orderId, { provider: "mock", reference: "mock-ref" });
      return NextResponse.json({ message: "Payment simulated" });
    }

    const payload = {
      totalAmount: order.quote.total_ghs,
      description: `Order ${params.orderId}`,
      callbackUrl,
      returnUrl,
      merchantAccountNumber: providerAccount,
      clientReference: params.orderId,
      customerEmail: order.customer?.email,
      customerPhoneNumber: order.customer?.phone,
      channel: "momo" as const,
    };

    const res = await fetch(HUBTEL_BASE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`${providerKey}:`).toString("base64")}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json({ error: data.message || "Hubtel error" }, { status: 400 });
    }

    if (data.checkoutUrl) {
      return NextResponse.json({ redirectUrl: data.checkoutUrl, reference: data.checkoutId });
    }

    return NextResponse.json({ error: "Unexpected Hubtel response" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Unable to start payment" }, { status: 400 });
  }
}
