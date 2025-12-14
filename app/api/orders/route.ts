import { NextResponse } from "next/server";
import { createOrder, listOrders } from "@/lib/orders";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const id = await createOrder(body);
    return NextResponse.json({ id }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create order" }, { status: 400 });
  }
}

export async function GET() {
  const orders = await listOrders();
  return NextResponse.json({ orders });
}
