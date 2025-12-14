import { NextResponse } from "next/server";
import { updateStatus } from "@/lib/orders";

export async function POST(
  req: Request,
  { params }: { params: { orderId: string } }
) {
  const body = await req.json();
  await updateStatus(params.orderId, body.status);
  return NextResponse.json({ ok: true });
}
