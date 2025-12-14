import { NextResponse } from "next/server";
import { saveQuote } from "@/lib/orders";

export async function POST(
  req: Request,
  { params }: { params: { orderId: string } }
) {
  try {
    const body = await req.json();
    const total_ghs = await saveQuote(params.orderId, body);
    return NextResponse.json({ total_ghs });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Unable to save quote" }, { status: 400 });
  }
}
