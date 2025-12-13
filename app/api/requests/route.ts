import { NextResponse } from 'next/server';
import { createRequest, listRequests } from '@/lib/db';

export async function GET() {
  const requests = listRequests();
  return NextResponse.json({ requests });
}

export async function POST(request: Request) {
  const body = await request.json();
  if (!body.product_url || !body.delivery_location || !body.phone || !body.email) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  const id = createRequest({
    product_url: body.product_url,
    quantity: Number(body.quantity) || 1,
    size_color: body.size_color || '',
    delivery_location: body.delivery_location,
    phone: body.phone,
    email: body.email,
  });
  return NextResponse.json({ id, status: 'submitted' });
}
