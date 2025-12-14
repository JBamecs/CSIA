import { NextResponse } from "next/server";
import { markPaid } from "@/lib/orders";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const orderId = body?.Data?.ClientReference || body?.clientReference;
    const status = body?.ResponseCode === "0000" || body?.ResponseCode === "0001";
    if (orderId && status) {
      await markPaid(orderId, { provider: "hubtel", reference: body?.TransactionId || "" });
    }
    return NextResponse.json({ received: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Webhook error" }, { status: 400 });
  }
}
