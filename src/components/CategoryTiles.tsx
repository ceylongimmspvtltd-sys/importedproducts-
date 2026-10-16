import Image from "next/image";
import Link from "next/link";
import { topCategories } from "@/lib/products";

export default function CategoryTiles() {
  const tiles = topCategories(12);

  return (
    <section id="categories" className="mx-auto max-w-7xl scroll-mt-40 px-4 pt-16 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900">Shop by Category</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Jump straight to the range you need — from tattoo needles to nail art.
          </p>
        </div>
        <Link
          href="#products"
          className="text-sm font-bold text-rose-600 transition hover:text-rose-500"
        >
          View all products →
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {tiles.map((c) => (
          <Link
            key={c.name}
            href={`/?category=${encodeURIComponent(c.name)}`}
            className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
              <Image
                src={c.image}
                alt={c.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover transition duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-3">
              <p className="line-clamp-1 text-sm font-bold text-zinc-900">{c.name}</p>
              <p className="mt-0.5 text-[11px] font-medium text-zinc-500">{c.count} products</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
