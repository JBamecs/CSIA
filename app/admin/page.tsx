'use client';

import { useEffect, useMemo, useState } from 'react';

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'concierge-admin';

interface PricingInput {
  item_price_usd: number;
  shipping_cost: number;
  customs_estimate: number;
  service_fee: number;
}

interface RequestRecord {
  id: number;
  product_url: string;
  quantity: number;
  size_color?: string;
  delivery_location: string;
  phone: string;
  email: string;
  status: string;
  created_at: string;
  pricing?: PricingInput & { total_ghs: number };
  payment_status?: string;
}

export default function AdminPage() {
  const [passwordInput, setPasswordInput] = useState('');
  const [authorized, setAuthorized] = useState(false);
  const [requests, setRequests] = useState<RequestRecord[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [pricing, setPricing] = useState<PricingInput>({
    item_price_usd: 0,
    shipping_cost: 0,
    customs_estimate: 0,
    service_fee: 0,
  });
  const [message, setMessage] = useState('');

  const selectedRequest = useMemo(
    () => requests.find((r) => r.id === selectedId) ?? null,
    [requests, selectedId],
  );

  useEffect(() => {
    if (!authorized) return;
    fetchRequests();
  }, [authorized]);

  const fetchRequests = async () => {
    const res = await fetch('/api/requests');
    if (!res.ok) return;
    const data = await res.json();
    setRequests(data.requests);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthorized(passwordInput === ADMIN_PASSWORD);
    setMessage(passwordInput === ADMIN_PASSWORD ? '' : 'Incorrect password');
  };

  const handleSelect = (id: number) => {
    setSelectedId(id);
    const found = requests.find((r) => r.id === id);
    if (found?.pricing) {
      setPricing({
        item_price_usd: found.pricing.item_price_usd,
        shipping_cost: found.pricing.shipping_cost,
        customs_estimate: found.pricing.customs_estimate,
        service_fee: found.pricing.service_fee,
      });
    } else {
      setPricing({ item_price_usd: 0, shipping_cost: 0, customs_estimate: 0, service_fee: 0 });
    }
  };

  const handlePricingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedId) return;
    const res = await fetch(`/api/requests/${selectedId}/pricing`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pricing),
    });
    if (res.ok) {
      setMessage('Pricing saved and customer can pay.');
      fetchRequests();
    } else {
      setMessage('Could not save pricing.');
    }
  };

  const paymentLink = selectedRequest ? `${typeof window !== 'undefined' ? window.location.origin : ''}/pay/${selectedRequest.id}` : '';

  if (!authorized) {
    return (
      <div className="max-w-md card p-6 space-y-4">
        <h1 className="text-2xl font-semibold text-slate-900">Admin access</h1>
        <form onSubmit={handleLogin} className="space-y-3">
          <input
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            placeholder="Enter password"
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
          <button className="w-full bg-slate-900 text-white py-2 rounded-lg">Enter</button>
          {message && <p className="text-sm text-red-600">{message}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-slate-900">Requests</h1>
          <button
            onClick={fetchRequests}
            className="text-sm text-emerald-700 font-semibold hover:text-emerald-800"
          >
            Refresh
          </button>
        </div>
        <div className="space-y-3">
          {requests.map((request) => (
            <button
              key={request.id}
              onClick={() => handleSelect(request.id)}
              className={`w-full text-left card p-4 border-2 ${
                selectedId === request.id ? 'border-emerald-500' : 'border-transparent'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-900">Request #{request.id}</p>
                  <p className="text-sm text-slate-600 line-clamp-1">{request.product_url}</p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    request.status === 'paid'
                      ? 'bg-emerald-100 text-emerald-800'
                      : request.status === 'priced'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {request.status}
                </span>
              </div>
              <p className="text-xs text-slate-500">{new Date(request.created_at).toLocaleString()}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="lg:col-span-2">
        {selectedRequest ? (
          <div className="card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Request #{selectedRequest.id}</h2>
                <p className="text-sm text-slate-600">Status: {selectedRequest.status}</p>
              </div>
              {paymentLink && (
                <a className="text-sm text-emerald-700 hover:text-emerald-800" href={paymentLink} target="_blank">
                  Open payment page
                </a>
              )}
            </div>

            <div className="bg-slate-50 rounded-lg p-4 text-sm space-y-1">
              <p className="font-semibold text-slate-800">Product</p>
              <a href={selectedRequest.product_url} className="text-emerald-700 underline break-all" target="_blank">
                {selectedRequest.product_url}
              </a>
              <p>Quantity: {selectedRequest.quantity}</p>
              {selectedRequest.size_color && <p>Size/Color: {selectedRequest.size_color}</p>}
              <p>Delivery: {selectedRequest.delivery_location}</p>
              <p>Contact: {selectedRequest.phone} · {selectedRequest.email}</p>
            </div>

            <form onSubmit={handlePricingSubmit} className="grid md:grid-cols-2 gap-4">
              {([
                ['item_price_usd', 'Item price (USD)'],
                ['shipping_cost', 'Shipping cost (USD)'],
                ['customs_estimate', 'Customs estimate (USD)'],
                ['service_fee', 'Service fee (USD)'],
              ] as const).map(([key, label]) => (
                <div key={key} className="space-y-2">
                  <label className="block text-sm font-medium text-slate-800">{label}</label>
                  <input
                    type="number"
                    step="0.01"
                    value={pricing[key]}
                    onChange={(e) => setPricing({ ...pricing, [key]: Number(e.target.value) })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2"
                  />
                </div>
              ))}
              <div className="md:col-span-2">
                <button className="bg-slate-900 text-white px-4 py-2 rounded-lg">Save pricing</button>
              </div>
            </form>

            {selectedRequest.pricing && (
              <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4 text-emerald-900 text-sm">
                <p className="font-semibold">Quote breakdown</p>
                <p>Item: ${selectedRequest.pricing.item_price_usd.toFixed(2)}</p>
                <p>Shipping: ${selectedRequest.pricing.shipping_cost.toFixed(2)}</p>
                <p>Customs: ${selectedRequest.pricing.customs_estimate.toFixed(2)}</p>
                <p>Service fee: ${selectedRequest.pricing.service_fee.toFixed(2)}</p>
                <p className="mt-2 text-lg font-semibold">Total (GHS): {selectedRequest.pricing.total_ghs.toFixed(2)}</p>
                <p className="text-xs text-emerald-800 mt-1">Share payment link with customer: {paymentLink}</p>
                {selectedRequest.payment_status === 'paid' && (
                  <p className="text-sm text-emerald-800 mt-2">Payment received.</p>
                )}
              </div>
            )}

            {message && <p className="text-sm text-slate-700">{message}</p>}
          </div>
        ) : (
          <div className="text-slate-600">Select a request to manage pricing.</div>
        )}
      </div>
    </div>
  );
}
