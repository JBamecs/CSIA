import PaymentAction from './PaymentAction';
import { getRequestById } from '@/lib/db';

export default function PaymentPage({ params }: { params: { requestId: string } }) {
  const requestId = Number(params.requestId);
  const request = getRequestById(requestId);

  if (!request) {
    return <div className="text-slate-700">This payment link is invalid.</div>;
  }

  if (!request.pricing) {
    return <div className="text-slate-700">Pricing not ready yet. Please check back shortly.</div>;
  }

  return (
    <div className="max-w-xl space-y-6">
      <div>
        <p className="text-sm uppercase tracking-wide text-emerald-700 font-semibold">Payment</p>
        <h1 className="text-3xl font-bold text-slate-900">Complete your order</h1>
        <p className="text-slate-700">Review the breakdown and pay to confirm. We will purchase and deliver to you.</p>
      </div>

      <div className="card p-6 space-y-4">
        <div className="space-y-1 text-sm text-slate-700">
          <p className="font-semibold text-slate-900">Item</p>
          <a href={request.product_url} className="text-emerald-700 underline break-all" target="_blank">
            {request.product_url}
          </a>
          <p>Quantity: {request.quantity}</p>
          {request.size_color && <p>Size/Color: {request.size_color}</p>}
        </div>

        <div className="border-t border-slate-200 pt-4 space-y-2 text-sm text-slate-800">
          <div className="flex justify-between">
            <span>Item price (USD)</span>
            <span>${request.pricing.item_price_usd.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>${request.pricing.shipping_cost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Customs estimate</span>
            <span>${request.pricing.customs_estimate.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Service fee</span>
            <span>${request.pricing.service_fee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg pt-2">
            <span>Total (GHS)</span>
            <span>{request.pricing.total_ghs.toFixed(2)}</span>
          </div>
        </div>

        <PaymentAction requestId={requestId} disabled={request.payment_status === 'paid'} />
        {request.payment_status === 'paid' && (
          <div className="rounded-lg bg-emerald-50 border border-emerald-100 p-4 text-emerald-900 text-sm">
            Payment confirmed. We&apos;ve logged your order and will update you.
          </div>
        )}
      </div>
    </div>
  );
}
