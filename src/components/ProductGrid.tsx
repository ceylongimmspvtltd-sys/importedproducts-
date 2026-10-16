"use client";

import { useMemo, useState } from "react";
import {
  products as allProducts,
  categoryCounts,
  type Product,
} from "@/lib/products";
import ProductCard from "./ProductCard";

const PAGE_SIZE = 24;

const SORTS = [
  { value: "featured", label: "Default order" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name", label: "Name: A – Z" },
];

export default function ProductGrid({
  initialQuery = "",
  initialCategory = "",
}: {
  initialQuery?: string;
  initialCategory?: string;
}) {
  const [q, setQ] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState("featured");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [visible, setVisible] = useState(PAGE_SIZE);

  const categories = useMemo(() => categoryCounts(), []);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    const list = allProducts.filter((p) => {
      if (category && p.category !== category) return false;
      if (inStockOnly && p.stock !== "in") return false;
      if (term && !`${p.name} ${p.category}`.toLowerCase().includes(term)) return false;
      return true;
    });

    const priceKey = (p: Product) => p.priceMin ?? Number.POSITIVE_INFINITY;
    if (sort === "price-asc") {
      return [...list].sort((a, b) => priceKey(a) - priceKey(b));
    }
    if (sort === "price-desc") {
      return [...list].sort((a, b) => (b.priceMin ?? -1) - (a.priceMin ?? -1));
    }
    if (sort === "name") {
      return [...list].sort((a, b) => a.name.localeCompare(b.name));
    }
    return list;
  }, [q, category, sort, inStockOnly]);

  function reset<T>(setter: (v: T) => void) {
    return (value: T) => {
      setter(value);
      setVisible(PAGE_SIZE);
    };
  }

  const shown = filtered.slice(0, visible);

  return (
    <section id="products" className="mx-auto max-w-7xl scroll-mt-40 px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900">All Products</h2>
          <p className="mt-1 text-sm text-zinc-500">
            {filtered.length.toLocaleString("en-US")} products found
            {category ? ` in “${category}”` : ""}
            {q.trim() ? ` for “${q.trim()}”` : ""}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
        <div className="grid gap-3 md:grid-cols-4">
          <div className="md:col-span-1">
            <label htmlFor="grid-search" className="sr-only">
              Search
            </label>
            <input
              id="grid-search"
              value={q}
              onChange={(e) => reset(setQ)(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-xl border border-zinc-300 px-3.5 py-2.5 text-sm focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/30"
            />
          </div>
          <div>
            <label htmlFor="grid-category" className="sr-only">
              Category
            </label>
            <select
              id="grid-category"
              value={category}
              onChange={(e) => reset(setCategory)(e.target.value)}
              className="w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-sm focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/30"
            >
              <option value="">All categories</option>
              {categories.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name} ({c.count})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="grid-sort" className="sr-only">
              Sort by
            </label>
            <select
              id="grid-sort"
              value={sort}
              onChange={(e) => reset(setSort)(e.target.value)}
              className="w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-sm focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/30"
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
          <label className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-zinc-300 px-3.5 py-2.5 text-sm">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => reset(setInStockOnly)(e.target.checked)}
              className="h-4 w-4 rounded border-zinc-300 text-rose-600 focus:ring-rose-500"
            />
            <span className="font-medium text-zinc-700">In stock only</span>
          </label>
        </div>
      </div>

      {/* Grid */}
      {shown.length > 0 ? (
        <>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {shown.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {visible < filtered.length && (
            <div className="mt-10 text-center">
              <button
                onClick={() => setVisible((v) => v + PAGE_SIZE)}
                className="rounded-full border-2 border-zinc-900 bg-white px-8 py-3 text-sm font-bold text-zinc-900 transition hover:bg-zinc-900 hover:text-white"
              >
                Load more ({(filtered.length - visible).toLocaleString("en-US")} remaining)
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="mt-10 rounded-2xl border border-dashed border-zinc-300 bg-white p-16 text-center">
          <p className="text-lg font-semibold text-zinc-700">No products found</p>
          <p className="mt-2 text-sm text-zinc-500">
            Try a different search term or clear the filters.
          </p>
          <button
            onClick={() => {
              setQ("");
              setCategory("");
              setInStockOnly(false);
              setVisible(PAGE_SIZE);
            }}
            className="mt-5 rounded-full bg-rose-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-500"
          >
            Clear filters
          </button>
        </div>
      )}
    </section>
  );
}
