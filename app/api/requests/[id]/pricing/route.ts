import { NextResponse } from 'next/server';
import { getRequestById, savePricing } from '@/lib/db';

const GHS_PER_USD = parseFloat(process.env.EXCHANGE_RATE_GHS_PER_USD || '12');

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const requestId = Number(params.id);
  const existing = getRequestById(requestId);
  if (!existing) return NextResponse.json({ error: 'Request not found' }, { status: 404 });

  const item_price_usd = Number(body.item_price_usd || 0);
  const shipping_cost = Number(body.shipping_cost || 0);
  const customs_estimate = Number(body.customs_estimate || 0);
  const service_fee = Number(body.service_fee || 0);
  const totalUsd = item_price_usd + shipping_cost + customs_estimate + service_fee;
  const total_ghs = totalUsd * GHS_PER_USD;

  savePricing(requestId, {
    item_price_usd,
    shipping_cost,
    customs_estimate,
    service_fee,
    total_ghs,
  });

  return NextResponse.json({ total_ghs });
}
