"use client";

import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { formatLKR } from "@/lib/products";

export default function CartDrawer() {
  const { items, open, setOpen, setQty, remove, clear, total, count } = useCart();
  const [ordered, setOrdered] = useState(false);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-zinc-950/50 backdrop-blur-sm"
        onClick={() => {
          setOrdered(false);
          setOpen(false);
        }}
      />
      <aside className="relative flex h-full w-full max-w-md flex-col bg-white shadow-2xl animate-slide-in-right">
        <header className="flex items-center justify-between border-b border-zinc-200 px-5 py-4">
          <h2 className="text-lg font-extrabold text-zinc-900">
            Your Cart{" "}
            <span className="ml-1 text-sm font-semibold text-zinc-500">({count} items)</span>
          </h2>
          <button
            onClick={() => {
              setOrdered(false);
              setOpen(false);
            }}
            aria-label="Close cart"
            className="grid h-9 w-9 place-items-center rounded-full text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
              <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
            </svg>
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-zinc-100 text-2xl">
              🛍️
            </div>
            <p className="font-semibold text-zinc-700">Your cart is empty</p>
            <p className="text-sm text-zinc-500">
              Browse the store and add some products to get started.
            </p>
            <button
              onClick={() => {
                setOrdered(false);
                setOpen(false);
              }}
              className="mt-2 rounded-full bg-zinc-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-600"
            >
              Continue shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 rounded-2xl border border-zinc-200 p-3">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-zinc-100">
                    <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <p className="line-clamp-2 text-xs font-semibold leading-snug text-zinc-900">
                      {item.name}
                    </p>
                    <p className="mt-1 text-sm font-bold text-rose-600">
                      {item.price > 0 ? formatLKR(item.price) : "Price on request"}
                    </p>
                    <div className="mt-auto flex items-center justify-between gap-2 pt-2">
                      <div className="flex items-center rounded-full border border-zinc-300">
                        <button
                          onClick={() => setQty(item.id, item.qty - 1)}
                          aria-label="Decrease quantity"
                          className="grid h-7 w-7 place-items-center rounded-full text-zinc-600 transition hover:bg-zinc-100"
                        >
                          −
                        </button>
                        <span className="w-7 text-center text-xs font-bold">{item.qty}</span>
                        <button
                          onClick={() => setQty(item.id, item.qty + 1)}
                          aria-label="Increase quantity"
                          className="grid h-7 w-7 place-items-center rounded-full text-zinc-600 transition hover:bg-zinc-100"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => remove(item.id)}
                        className="text-xs font-semibold text-zinc-400 transition hover:text-rose-600"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <footer className="border-t border-zinc-200 px-5 py-4">
              <div className="flex items-center justify-between text-sm text-zinc-600">
                <span>Subtotal</span>
                <span className="text-lg font-extrabold text-zinc-900">{formatLKR(total)}</span>
              </div>
              <p className="mt-1 text-[11px] leading-relaxed text-zinc-500">
                Range-priced items are added at their starting price. Delivery and final
                variant pricing are confirmed when your order is processed.
              </p>
              {ordered ? (
                <p className="mt-3 rounded-xl bg-emerald-50 px-4 py-3 text-xs font-semibold text-emerald-700">
                  Thank you! This is a demo store — connect your checkout or WhatsApp
                  ordering to go live.
                </p>
              ) : (
                <button
                  onClick={() => setOrdered(true)}
                  className="mt-3 w-full rounded-full bg-rose-600 py-3 text-sm font-bold text-white transition hover:bg-rose-500"
                >
                  Proceed to checkout
                </button>
              )}
              <button
                onClick={clear}
                className="mt-2 w-full rounded-full py-2 text-xs font-semibold text-zinc-500 transition hover:text-rose-600"
              >
                Clear cart
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
