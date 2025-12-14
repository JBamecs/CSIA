"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CartItem =
  | {
      id: string;
      type: "easy";
      brand?: string;
      category?: string;
      itemName: string;
      size?: string;
      color?: string;
      budgetMin?: number | null;
      budgetMax?: number | null;
      quantity: number;
      notes?: string;
    }
  | {
      id: string;
      type: "link";
      brand?: string;
      url: string;
      details?: string;
      quantity: number;
    };

type CartContextValue = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "id">) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function randomId() {
  return Math.random().toString(36).slice(2, 9);
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("cart-items");
    if (stored) setItems(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart-items", JSON.stringify(items));
  }, [items]);

  const value = useMemo<CartContextValue>(() => ({
    items,
    addItem: (item) => setItems((prev) => [...prev, { ...item, id: randomId() } as CartItem]),
    updateQuantity: (id, quantity) =>
      setItems((prev) => prev.map((it) => (it.id === id ? { ...it, quantity } : it))),
    removeItem: (id) => setItems((prev) => prev.filter((it) => it.id !== id)),
    clear: () => setItems([]),
  }), [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
