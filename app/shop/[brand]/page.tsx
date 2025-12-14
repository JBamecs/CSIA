"use client";

import { useMemo, useState } from "react";
import { useCart } from "@/app/components/CartProvider";
import { ProgressSteps } from "@/app/components/ProgressSteps";
import Link from "next/link";

const categories = ["Shoes", "Clothing", "Electronics", "Beauty", "Other"];

const brandCopy: Record<string, string> = {
  amazon: "Amazon finds shipped to Ghana without the headache.",
  nike: "Fresh drops and classics—let us handle US delivery and duties.",
  boohoo: "UK fashion curated for Accra delivery.",
  asos: "ASOS looks, one Ghana payment.",
  shein: "Affordable fits, handled end-to-end.",
};

export default function BrandShop({ params }: { params: { brand: string } }) {
  const brand = params.brand.toLowerCase();
  const description = brandCopy[brand] ?? "Shop global brands, pay once in Ghana";
  const { addItem } = useCart();
  const [mode, setMode] = useState<"easy" | "link">("easy");
  const [easyForm, setEasyForm] = useState({
    category: "Shoes",
    itemName: "",
    size: "",
    color: "",
    budgetMin: "",
    budgetMax: "",
    quantity: 1,
    notes: "",
  });
  const [linkForm, setLinkForm] = useState({ url: "", details: "", quantity: 1 });
  const [notice, setNotice] = useState<string | null>(null);

  const heroTitle = useMemo(() => brand.charAt(0).toUpperCase() + brand.slice(1), [brand]);

  const addEasy = () => {
    addItem({
      type: "easy",
      brand,
      category: easyForm.category,
      itemName: easyForm.itemName || `${easyForm.category} item`,
      size: easyForm.size || undefined,
      color: easyForm.color || undefined,
      budgetMin: easyForm.budgetMin ? Number(easyForm.budgetMin) : null,
      budgetMax: easyForm.budgetMax ? Number(easyForm.budgetMax) : null,
      quantity: Number(easyForm.quantity) || 1,
      notes: easyForm.notes || undefined,
    });
    setNotice("Added to cart. Continue shopping or head to checkout.");
  };

  const addLink = () => {
    if (!linkForm.url) return setNotice("Paste the product link to add.");
    addItem({
      type: "link",
      brand,
      url: linkForm.url,
      details: linkForm.details || undefined,
      quantity: Number(linkForm.quantity) || 1,
    });
    setNotice("Link item added to cart.");
  };

  return (
    <div className="space-y-6">
      <ProgressSteps current={0} />
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-3">
        <p className="text-sm text-emerald-700 font-semibold">Shop {heroTitle}</p>
        <h1 className="text-3xl font-bold text-slate-900">{heroTitle} for Ghana</h1>
        <p className="text-slate-700">{description}</p>
        <div className="flex gap-3 text-sm text-slate-600 flex-wrap">
          <span className="px-3 py-1 rounded-full bg-slate-100">No US address needed</span>
          <span className="px-3 py-1 rounded-full bg-slate-100">One Ghana payment</span>
          <span className="px-3 py-1 rounded-full bg-slate-100">Manual fulfillment via MyUS</span>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm">
        <div className="flex border-b border-slate-200">
          <button
            className={`flex-1 px-4 py-3 text-center font-semibold ${
              mode === "easy" ? "bg-slate-900 text-white" : "bg-white text-slate-700"
            }`}
            onClick={() => setMode("easy")}
          >
            Easy Mode (no links)
          </button>
          <button
            className={`flex-1 px-4 py-3 text-center font-semibold ${
              mode === "link" ? "bg-slate-900 text-white" : "bg-white text-slate-700"
            }`}
            onClick={() => setMode("link")}
          >
            Link Mode
          </button>
        </div>

        {mode === "easy" ? (
          <div className="p-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <label className="block text-sm font-semibold text-slate-800">
                Category
                <select
                  className="input"
                  value={easyForm.category}
                  onChange={(e) => setEasyForm({ ...easyForm, category: e.target.value })}
                >
                  {categories.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </label>
              <label className="block text-sm font-semibold text-slate-800">
                Item name / keywords
                <input
                  className="input"
                  value={easyForm.itemName}
                  placeholder="e.g., Air Force 1 white"
                  onChange={(e) => setEasyForm({ ...easyForm, itemName: e.target.value })}
                />
              </label>
              <label className="block text-sm font-semibold text-slate-800">
                Size
                <input
                  className="input"
                  value={easyForm.size}
                  onChange={(e) => setEasyForm({ ...easyForm, size: e.target.value })}
                  placeholder="EU 42 / US 9"
                />
              </label>
              <label className="block text-sm font-semibold text-slate-800">
                Color
                <input
                  className="input"
                  value={easyForm.color}
                  onChange={(e) => setEasyForm({ ...easyForm, color: e.target.value })}
                  placeholder="Black"
                />
              </label>
              <label className="block text-sm font-semibold text-slate-800">
                Budget range (USD)
                <div className="flex gap-3">
                  <input
                    className="input"
                    type="number"
                    placeholder="Min"
                    value={easyForm.budgetMin}
                    onChange={(e) => setEasyForm({ ...easyForm, budgetMin: e.target.value })}
                  />
                  <input
                    className="input"
                    type="number"
                    placeholder="Max"
                    value={easyForm.budgetMax}
                    onChange={(e) => setEasyForm({ ...easyForm, budgetMax: e.target.value })}
                  />
                </div>
              </label>
              <label className="block text-sm font-semibold text-slate-800">
                Quantity
                <input
                  className="input"
                  type="number"
                  min={1}
                  value={easyForm.quantity}
                  onChange={(e) => setEasyForm({ ...easyForm, quantity: Number(e.target.value) })}
                />
              </label>
            </div>
            <label className="block text-sm font-semibold text-slate-800">
              Notes (optional)
              <textarea
                className="input"
                rows={3}
                value={easyForm.notes}
                onChange={(e) => setEasyForm({ ...easyForm, notes: e.target.value })}
                placeholder="Link to inspo pics or extra details"
              />
            </label>
            <div className="flex gap-3">
              <button onClick={addEasy} className="btn-primary">
                Add to cart
              </button>
              <Link href="/cart" className="btn-secondary">
                Go to cart
              </Link>
            </div>
          </div>
        ) : (
          <div className="p-6 space-y-4">
            <label className="block text-sm font-semibold text-slate-800">
              Product URL
              <input
                className="input"
                value={linkForm.url}
                onChange={(e) => setLinkForm({ ...linkForm, url: e.target.value })}
                placeholder="https://..."
              />
            </label>
            <label className="block text-sm font-semibold text-slate-800">
              Details (size/color)
              <input
                className="input"
                value={linkForm.details}
                onChange={(e) => setLinkForm({ ...linkForm, details: e.target.value })}
              />
            </label>
            <label className="block text-sm font-semibold text-slate-800">
              Quantity
              <input
                className="input"
                type="number"
                min={1}
                value={linkForm.quantity}
                onChange={(e) => setLinkForm({ ...linkForm, quantity: Number(e.target.value) })}
              />
            </label>
            <div className="flex gap-3">
              <button onClick={addLink} className="btn-primary">
                Add to cart
              </button>
              <Link href="/cart" className="btn-secondary">
                Go to cart
              </Link>
            </div>
          </div>
        )}
      </div>

      {notice && <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-900">{notice}</div>}
    </div>
  );
}
