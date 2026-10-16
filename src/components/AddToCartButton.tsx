"use client";

import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { priceLabel, stockLabel, type Product } from "@/lib/products";

export default function AddToCartButton({ product }: { product: Product }) {
  const { add, setOpen } = useCart();
  const [qty, setQty] = useState(1);
  const out = product.stock === "out";

  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="flex items-center rounded-full border-2 border-zinc-300">
          <button
            onClick={() => setQty((n) => Math.max(1, n - 1))}
            aria-label="Decrease quantity"
            className="grid h-11 w-11 place-items-center rounded-full text-zinc-600 transition hover:bg-zinc-100"
          >
            −
          </button>
          <span className="w-9 text-center text-sm font-bold">{qty}</span>
          <button
            onClick={() => setQty((n) => n + 1)}
            aria-label="Increase quantity"
            className="grid h-11 w-11 place-items-center rounded-full text-zinc-600 transition hover:bg-zinc-100"
          >
            +
          </button>
        </div>
        <button
          onClick={() => {
            add(
              {
                id: product.id,
                name: product.name,
                image: product.image,
                price: product.priceMin ?? 0,
              },
              qty,
            );
            setOpen(true);
          }}
          disabled={out}
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-rose-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-rose-900/25 transition hover:bg-rose-500 disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-500 disabled:shadow-none"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13 5.4 5M7 13l-2.3 4.6A1 1 0 0 0 5.6 19H17" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="9" cy="21" r="1.4" fill="currentColor" stroke="none" />
            <circle cx="17" cy="21" r="1.4" fill="currentColor" stroke="none" />
          </svg>
          {out ? "Out of stock" : "Add to cart"}
        </button>
      </div>
      <div className="mt-3 flex items-center gap-3 text-xs text-zinc-500">
        <span className="font-semibold text-zinc-700">{priceLabel(product)}</span>
        <span className="text-zinc-300">|</span>
        <span>{stockLabel(product.stock)}</span>
      </div>
    </div>
  );
}
