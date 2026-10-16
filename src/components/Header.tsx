"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useCart } from "@/lib/cart";

export default function Header() {
  const router = useRouter();
  const { count, setOpen, hydrated } = useCart();
  const [q, setQ] = useState("");

  function onSearch(e: FormEvent) {
    e.preventDefault();
    const term = q.trim();
    router.push(term ? `/?q=${encodeURIComponent(term)}` : "/");
  }

  const searchForm = (
    <form onSubmit={onSearch} className="flex w-full items-center gap-2">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search products (needles, ink, nails, lashes...)"
        aria-label="Search products"
        className="w-full rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white placeholder:text-zinc-400 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/40"
      />
      <button
        type="submit"
        className="shrink-0 rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-500"
      >
        Search
      </button>
    </form>
  );

  return (
    <header className="sticky top-0 z-40 bg-zinc-950 text-white shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center gap-4">
          <Link href="/" className="flex shrink-0 items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-rose-600 text-base font-black tracking-tight">
              O
            </span>
            <span className="leading-tight">
              <span className="block text-base font-extrabold tracking-wide sm:text-lg">
                Osho.lk
              </span>
              <span className="block text-[10px] uppercase tracking-[0.22em] text-zinc-400">
                Online Shopping · Sri Lanka
              </span>
            </span>
          </Link>

          <div className="ml-auto hidden max-w-xl flex-1 md:block">{searchForm}</div>

          <button
            onClick={() => setOpen(true)}
            className="relative ml-auto flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold transition hover:bg-white/10 md:ml-0"
            aria-label="Open cart"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13 5.4 5M7 13l-2.3 4.6A1 1 0 0 0 5.6 19H17" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="9" cy="21" r="1.4" fill="currentColor" stroke="none" />
              <circle cx="17" cy="21" r="1.4" fill="currentColor" stroke="none" />
            </svg>
            <span className="hidden sm:inline">Cart</span>
            {hydrated && count > 0 && (
              <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-rose-600 px-1 text-[11px] font-bold">
                {count > 99 ? "99+" : count}
              </span>
            )}
          </button>
        </div>

        <div className="pb-3 md:hidden">{searchForm}</div>

        <nav className="flex items-center gap-5 overflow-x-auto border-t border-white/10 py-2 text-xs font-medium text-zinc-300">
          <Link href="/" className="whitespace-nowrap transition hover:text-white">Home</Link>
          <Link href="/#products" className="whitespace-nowrap transition hover:text-white">All Products</Link>
          <Link href="/#categories" className="whitespace-nowrap transition hover:text-white">Categories</Link>
          <Link href="/?category=Tattoo%20Ink" className="whitespace-nowrap transition hover:text-white">Tattoo Inks</Link>
          <Link href="/?category=Nail%20Extension" className="whitespace-nowrap transition hover:text-white">Nails</Link>
          <Link href="/?category=Eyelash%20Extension" className="whitespace-nowrap transition hover:text-white">Lashes</Link>
          <Link href="/#footer" className="whitespace-nowrap transition hover:text-white">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
