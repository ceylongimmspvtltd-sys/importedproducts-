"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { priceLabel, stockLabel, type Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  const { add, setOpen } = useCart();
  const out = product.stock === "out";

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl">
      <Link
        href={`/product/${product.id}`}
        className="relative block aspect-square overflow-hidden bg-zinc-100"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
        <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-zinc-700 shadow-sm">
          {product.category}
        </span>
        {out && (
          <span className="absolute right-2 top-2 rounded-full bg-zinc-900/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
            Out of stock
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-3.5">
        <Link href={`/product/${product.id}`}>
          <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold leading-snug text-zinc-900 transition hover:text-rose-600">
            {product.name}
          </h3>
        </Link>

        <p className="mt-2 text-base font-bold text-zinc-900">{priceLabel(product)}</p>
        <p className="mt-1 flex items-center gap-1.5 text-[11px] font-medium text-zinc-500">
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              product.stock === "in"
                ? "bg-emerald-500"
                : product.stock === "out"
                  ? "bg-rose-500"
                  : "bg-amber-500"
            }`}
          />
          {stockLabel(product.stock)}
        </p>

        <button
          onClick={() => {
            add({
              id: product.id,
              name: product.name,
              image: product.image,
              price: product.priceMin ?? 0,
            });
            setOpen(true);
          }}
          disabled={out}
          className="mt-3 w-full rounded-full bg-zinc-900 py-2.5 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-rose-600 disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-500"
        >
          {out ? "Unavailable" : "Add to cart"}
        </button>
      </div>
    </article>
  );
}
