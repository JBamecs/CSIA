import { NextResponse } from 'next/server';
import { getRequestById, recordPayment } from '@/lib/db';

export async function POST(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const requestId = Number(params.id);
  const existing = getRequestById(requestId);
  if (!existing) return NextResponse.json({ error: 'Request not found' }, { status: 404 });
  if (!existing.pricing) return NextResponse.json({ error: 'Pricing missing' }, { status: 400 });

  const reference = `PAY-${requestId}-${Date.now()}`;
  recordPayment(requestId, reference);
  return NextResponse.json({ status: 'paid', reference });
}
