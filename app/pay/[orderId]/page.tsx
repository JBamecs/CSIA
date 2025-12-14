import PaymentAction from "./PaymentAction";
import { getOrder } from "@/lib/orders";

export default async function PaymentPage({ params }: { params: { orderId: string } }) {
  const order = await getOrder(params.orderId);

  if (!order) {
    return <div className="text-slate-700">This payment link is invalid.</div>;
  }

  if (!order.quote) {
    return <div className="text-slate-700">We are finalizing your quote. Please check back soon.</div>;
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
          <p className="font-semibold text-slate-900">Items ({order.items?.length || 0})</p>
          <ul className="list-disc list-inside text-slate-700">
            {order.items?.map((it: any) => (
              <li key={it.id} className="break-all">
                {it.type === "link" ? it.url : it.itemName} x{it.quantity}
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-slate-200 pt-4 space-y-2 text-sm text-slate-800">
          <div className="flex justify-between">
            <span>Item cost (USD)</span>
            <span>${order.quote.item_cost_usd.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>${order.quote.shipping_usd.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Customs</span>
            <span>${order.quote.customs_usd.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Service fee</span>
            <span>${order.quote.service_fee_usd.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>FX rate used</span>
            <span>{order.quote.fx_rate_used}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg pt-2">
            <span>Total (GHS)</span>
            <span>{order.quote.total_ghs.toFixed(2)}</span>
          </div>
        </div>

        <PaymentAction orderId={params.orderId} disabled={order.status === "paid"} />
        {order.status === "paid" && (
          <div className="rounded-lg bg-emerald-50 border border-emerald-100 p-4 text-emerald-900 text-sm">
            Payment confirmed. We&apos;ve logged your order and will update you.
          </div>
        )}
      </div>
    </div>
  );
}
