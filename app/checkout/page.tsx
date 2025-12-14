"use client";

import { FormEvent, useState } from "react";
import { useCart } from "@/app/components/CartProvider";
import { useRouter } from "next/navigation";
import { ProgressSteps } from "@/app/components/ProgressSteps";

export default function CheckoutPage() {
  const { items, clear } = useCart();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", phone: "", email: "", area: "Accra", details: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      setError("Add items first.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brand: items[0]?.brand,
          customer: { name: form.name || undefined, phone: form.phone, email: form.email },
          address: { area: form.area, details: form.details },
          items: items.map((it) => ({
            type: it.type,
            brand: it.brand,
            category: it.type === "easy" ? it.category : undefined,
            url: it.type === "link" ? it.url : undefined,
            details: it.type === "link" ? it.details : undefined,
            quantity: it.quantity,
            itemName: it.type === "easy" ? it.itemName : undefined,
            color: it.type === "easy" ? it.color : undefined,
            size: it.type === "easy" ? it.size : undefined,
            budgetMin: it.type === "easy" ? it.budgetMin : null,
            budgetMax: it.type === "easy" ? it.budgetMax : null,
            notes: it.type === "easy" ? it.notes : undefined,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit order");
      clear();
      router.push(`/pay/${data.id}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <ProgressSteps current={1} />
      <h1 className="text-3xl font-bold text-slate-900">Checkout</h1>
      <p className="text-sm text-slate-600">Accra delivery for the pilot. We&apos;ll review and send a firm quote to pay.</p>

      <form className="bg-white border border-slate-200 rounded-xl p-6 space-y-4" onSubmit={submit}>
        <div className="grid md:grid-cols-2 gap-4">
          <label className="block text-sm font-semibold text-slate-800">
            Full name (optional)
            <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </label>
          <label className="block text-sm font-semibold text-slate-800">
            Phone
            <input
              className="input"
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="020..."
            />
          </label>
          <label className="block text-sm font-semibold text-slate-800">
            Email
            <input
              className="input"
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </label>
          <label className="block text-sm font-semibold text-slate-800">
            Delivery area (Accra only)
            <select className="input" value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })}>
              <option>Accra</option>
            </select>
          </label>
        </div>
        <label className="block text-sm font-semibold text-slate-800">
          Address details
          <textarea
            className="input"
            rows={3}
            value={form.details}
            onChange={(e) => setForm({ ...form, details: e.target.value })}
            placeholder="Landmark, estate, instructions"
          />
        </label>

        {error && <div className="p-3 bg-rose-50 border border-rose-100 text-rose-700 rounded-lg text-sm">{error}</div>}

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Submitting..." : "Submit order"}
        </button>
      </form>
    </div>
  );
}
