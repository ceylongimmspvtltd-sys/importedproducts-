import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
import ProductCard from "@/components/ProductCard";
import {
  products,
  priceLabel,
  stockLabel,
  descriptionFor,
  type Product,
} from "@/lib/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.id }));
}

// Allow blocking prerender so params can resolve per product page.
export const instant = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.id === slug);
  if (!product) return { title: "Product not found" };
  return {
    title: `${product.name} — Imported Products LK`,
    description: `${product.name} — ${priceLabel(product)}. ${product.category}, available in Sri Lanka with islandwide delivery.`,
  };
}

function stockBadge(product: Product) {
  const cls =
    product.stock === "in"
      ? "bg-emerald-100 text-emerald-700"
      : product.stock === "out"
        ? "bg-rose-100 text-rose-700"
        : "bg-amber-100 text-amber-700";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${cls}`}>
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
    </span>
  );
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.id === slug);
  if (!product) notFound();

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-1.5 text-xs text-zinc-500">
          <Link href="/" className="font-semibold transition hover:text-rose-600">
            Home
          </Link>
          <span>/</span>
          <Link href="/#products" className="font-semibold transition hover:text-rose-600">
            Products
          </Link>
          <span>/</span>
          <Link
            href={`/?category=${encodeURIComponent(product.category)}`}
            className="font-semibold transition hover:text-rose-600"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="line-clamp-1 text-zinc-700">{product.name}</span>
        </nav>

        <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Image */}
          <div>
            <div className="relative aspect-square overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-zinc-700 shadow-sm">
                {product.category}
              </span>
            </div>
          </div>

          {/* Info */}
          <div>
            <h1 className="text-3xl font-extrabold leading-tight text-zinc-900 sm:text-4xl">
              {product.name}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              {stockBadge(product)}
              <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-600">
                {product.category}
              </span>
            </div>

            <p className="mt-6 text-3xl font-extrabold text-rose-600">{priceLabel(product)}</p>
            {product.priceMin != null && product.priceMax != null && product.priceMax > product.priceMin && (
              <p className="mt-1 text-xs text-zinc-500">
                Price varies by size / variant — from {priceLabel({ priceMin: product.priceMin, priceMax: product.priceMin })} up to{" "}
                {priceLabel({ priceMin: product.priceMax, priceMax: product.priceMax })}.
              </p>
            )}

            <div className="mt-7">
              <AddToCartButton product={product} />
            </div>

            <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-5">
              <h2 className="text-sm font-bold uppercase tracking-wide text-zinc-900">
                Product details
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                {descriptionFor(product)}
              </p>
              <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                    Category
                  </dt>
                  <dd className="mt-1 font-semibold text-zinc-800">{product.category}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                    Availability
                  </dt>
                  <dd className="mt-1 font-semibold text-zinc-800">{stockLabel(product.stock)}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                    Currency
                  </dt>
                  <dd className="mt-1 font-semibold text-zinc-800">LKR (Sri Lankan Rupee)</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                    Delivery
                  </dt>
                  <dd className="mt-1 font-semibold text-zinc-800">Islandwide in Sri Lanka</dd>
                </div>
              </dl>
              {product.url && (
                <a
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 transition hover:text-rose-500"
                >
                  View original product listing
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
                    <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-zinc-900">
            More in {product.category}
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
