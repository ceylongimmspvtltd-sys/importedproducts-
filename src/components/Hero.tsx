import Image from "next/image";
import Link from "next/link";
import { products, categoryCounts } from "@/lib/products";

export default function Hero() {
  const total = products.length;
  const cats = categoryCounts().length;

  return (
    <section className="relative overflow-hidden bg-zinc-950">
      <Image
        src="/products/hero.jpg"
        alt="Tattoo machines, inks and beauty products"
        fill
        priority
        className="object-cover object-right"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/85 to-zinc-950/10" />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="max-w-2xl text-white">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-rose-400">
            Imported Tattoo &amp; Beauty Supplies
          </p>
          <h1 className="text-4xl font-extrabold leading-[1.1] sm:text-5xl md:text-6xl">
            Everything for your studio, nails &amp; lashes
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-zinc-300">
            {total}+ imported products — tattoo needles, inks, machines, nail extensions,
            eyelashes, hair extensions and skincare. Real LKR prices, islandwide delivery
            across Sri Lanka.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="#products"
              className="rounded-full bg-rose-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-rose-900/40 transition hover:bg-rose-500"
            >
              Shop all products
            </Link>
            <Link
              href="#categories"
              className="rounded-full border border-white/30 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Browse categories
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-zinc-300">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-rose-500" /> {total}+ products
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-rose-500" /> {cats} categories
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-rose-500" /> Islandwide delivery
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-rose-500" /> Pay in LKR
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
