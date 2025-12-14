"use client";

import Link from "next/link";
import { useCart } from "@/app/components/CartProvider";
import { ProgressSteps } from "@/app/components/ProgressSteps";

export default function CartPage() {
  const { items, updateQuantity, removeItem } = useCart();
  const estimated = items.length * 50; // placeholder estimate

  return (
    <div className="space-y-6">
      <ProgressSteps current={1} />
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-900">Your cart</h1>
        <Link href="/checkout" className="btn-primary">
          Continue to checkout
        </Link>
      </div>
      <p className="text-sm text-slate-600">Final quote shared after review. Mix Easy Mode and Link Mode items.</p>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">{item.type === "easy" ? "Easy Mode" : "Link"}</p>
              <h3 className="text-lg font-semibold text-slate-900">{item.type === "easy" ? item.itemName : item.url}</h3>
              <p className="text-sm text-slate-600">
                {item.type === "easy"
                  ? `${item.category} ${item.color || ""} ${item.size || ""} ${item.notes || ""}`
                  : item.details}
              </p>
              {item.type === "easy" && (item.budgetMin || item.budgetMax) && (
                <p className="text-xs text-slate-500">Budget: ${item.budgetMin || "-"} - ${item.budgetMax || "-"} USD</p>
              )}
            </div>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                className="w-20 input"
              />
              <button onClick={() => removeItem(item.id)} className="text-sm text-rose-600 font-semibold">
                Remove
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-xl p-6 text-slate-700">Your cart is empty. Add items from a brand page.</div>
        )}
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-600">Estimated total (placeholder)</p>
          <p className="text-2xl font-bold text-slate-900">GHS {estimated.toFixed(2)}</p>
          <p className="text-xs text-slate-500">Final quote after review. You can pay via MoMo or card.</p>
        </div>
        <Link href="/checkout" className="btn-primary">
          Checkout
        </Link>
      </div>
    </div>
  );
}
