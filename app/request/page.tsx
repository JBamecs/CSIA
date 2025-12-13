'use client';

import { FormEvent, useState } from 'react';

interface RequestPayload {
  product_url: string;
  quantity?: number;
  size_color?: string;
  delivery_location: string;
  phone: string;
  email: string;
}

export default function RequestPage() {
  const [form, setForm] = useState<RequestPayload>({
    product_url: '',
    quantity: 1,
    size_color: '',
    delivery_location: 'Accra',
    phone: '',
    email: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setError('');
    try {
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        throw new Error('Could not submit your request. Please check the details and try again.');
      }
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
      setError('We could not save your request. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-wide text-emerald-700 font-semibold">Step 1</p>
        <h1 className="text-3xl font-bold text-slate-900">Request an item</h1>
        <p className="text-slate-700">
          Send us the product link and details. We&apos;ll calculate everything—item price, shipping, customs, and our
          service fee—and text/email you a payment link.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="card p-6 space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-800">Product URL *</label>
          <input
            required
            type="url"
            value={form.product_url}
            onChange={(e) => setForm({ ...form, product_url: e.target.value })}
            placeholder="https://www.amazon.com/your-item"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-emerald-500 focus:outline-none"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-800">Quantity</label>
            <input
              type="number"
              min={1}
              value={form.quantity ?? 1}
              onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-emerald-500 focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-800">Size / color (optional)</label>
            <input
              type="text"
              value={form.size_color ?? ''}
              onChange={(e) => setForm({ ...form, size_color: e.target.value })}
              placeholder="e.g., US 10, Red"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-800">Delivery location</label>
            <select
              value={form.delivery_location}
              onChange={(e) => setForm({ ...form, delivery_location: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-emerald-500 focus:outline-none"
            >
              <option value="Accra">Accra</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-800">Phone number</label>
            <input
              type="tel"
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="024 000 0000"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-800">Email</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-emerald-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-semibold py-3 rounded-lg"
        >
          {status === 'submitting' ? 'Sending request...' : 'Submit request'}
        </button>

        {status === 'success' && (
          <div className="rounded-lg bg-emerald-50 border border-emerald-100 p-4 text-emerald-900 text-sm">
            We&apos;re calculating your total price. You&apos;ll receive a payment link shortly.
          </div>
        )}
        {status === 'error' && (
          <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-red-900 text-sm">{error}</div>
        )}
      </form>
    </div>
  );
}
