"use client";

import { useEffect, useState } from "react";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "concierge-admin";

const statuses = ["submitted", "quoted", "paid", "ordered", "shipped", "delivered"];

export default function AdminPage() {
  const [passwordInput, setPasswordInput] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [quote, setQuote] = useState({
    item_cost_usd: 0,
    shipping_usd: 0,
    customs_usd: 0,
    service_fee_usd: 0,
    fx_rate_used: 15,
  });

  useEffect(() => {
    if (authorized) refresh();
  }, [authorized]);

  async function refresh() {
    const res = await fetch("/api/orders");
    const data = await res.json();
    setOrders(data.orders || []);
  }

  function select(id: string) {
    setSelectedId(id);
    const found = orders.find((o) => o.id === id);
    if (found?.quote) setQuote(found.quote);
  }

  async function saveQuote() {
    if (!selectedId) return;
    const res = await fetch(`/api/orders/${selectedId}/quote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(quote),
    });
    if (res.ok) {
      setMessage("Quote saved. Share pay link.");
      refresh();
    } else {
      setMessage("Could not save quote.");
    }
  }

  async function changeStatus(status: string) {
    if (!selectedId) return;
    await fetch(`/api/orders/${selectedId}/status`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    refresh();
  }

  const selectedOrder = orders.find((o) => o.id === selectedId);
  const payLink = selectedOrder ? `${typeof window !== "undefined" ? window.location.origin : ""}/pay/${selectedOrder.id}` : "";

  if (!authorized) {
    return (
      <div className="max-w-md card p-6 space-y-4">
        <h1 className="text-2xl font-semibold text-slate-900">Admin access</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setAuthorized(passwordInput === ADMIN_PASSWORD);
            setMessage(passwordInput === ADMIN_PASSWORD ? "" : "Incorrect password");
          }}
          className="space-y-3"
        >
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
          <h1 className="text-2xl font-semibold text-slate-900">Orders</h1>
          <button onClick={refresh} className="text-sm text-emerald-700 font-semibold hover:text-emerald-800">
            Refresh
          </button>
        </div>
        <div className="space-y-3">
          {orders.map((order) => (
            <button
              key={order.id}
              onClick={() => select(order.id)}
              className={`w-full text-left card p-4 border-2 ${
                selectedId === order.id ? "border-emerald-500" : "border-transparent"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-900">Order {order.id}</p>
                  <p className="text-sm text-slate-600">{order.customer?.phone}</p>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700">{order.status}</span>
              </div>
              <p className="text-xs text-slate-500">{new Date(order.created_at._seconds * 1000).toLocaleString()}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="lg:col-span-2">
        {selectedOrder ? (
          <div className="card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Order {selectedOrder.id}</h2>
                <p className="text-sm text-slate-600">Status: {selectedOrder.status}</p>
              </div>
              {payLink && (
                <a className="text-sm text-emerald-700 hover:text-emerald-800" href={payLink} target="_blank">
                  Open pay link
                </a>
              )}
            </div>

            <div className="bg-slate-50 rounded-lg p-4 text-sm space-y-1">
              <p className="font-semibold text-slate-800">Customer</p>
              <p>{selectedOrder.customer?.name}</p>
              <p>{selectedOrder.customer?.phone} · {selectedOrder.customer?.email}</p>
              <p>Address: {selectedOrder.address?.area} · {selectedOrder.address?.details}</p>
            </div>

            <div className="space-y-2">
              <p className="font-semibold text-slate-800">Items</p>
              <ul className="list-disc list-inside text-sm text-slate-700">
                {selectedOrder.items?.map((it: any) => (
                  <li key={it.id} className="break-all">
                    {it.type === "link" ? it.url : it.itemName} x{it.quantity}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {([
                ["item_cost_usd", "Item cost (USD)"],
                ["shipping_usd", "Shipping (USD)"],
                ["customs_usd", "Customs (USD)"],
                ["service_fee_usd", "Service fee (USD)"],
                ["fx_rate_used", "FX rate used"],
              ] as const).map(([key, label]) => (
                <label key={key} className="text-sm font-semibold text-slate-800 space-y-1">
                  {label}
                  <input
                    type="number"
                    step="0.01"
                    value={quote[key as keyof typeof quote]}
                    onChange={(e) => setQuote({ ...quote, [key]: Number(e.target.value) })}
                    className="input"
                  />
                </label>
              ))}
            </div>
            <button className="btn-primary" onClick={saveQuote}>
              Save quote & mark quoted
            </button>

            <div className="flex gap-2 flex-wrap">
              {statuses.map((s) => (
                <button
                  key={s}
                  onClick={() => changeStatus(s)}
                  className={`px-3 py-2 rounded-lg border text-sm ${
                    selectedOrder.status === s ? "bg-emerald-600 text-white" : "bg-white border-slate-200"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            {message && <p className="text-sm text-emerald-700">{message}</p>}
          </div>
        ) : (
          <div className="card p-6 text-slate-700">Select an order to manage.</div>
        )}
      </div>
    </div>
  );
}
