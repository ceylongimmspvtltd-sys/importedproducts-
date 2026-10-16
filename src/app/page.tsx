import Hero from "@/components/Hero";
import CategoryTiles from "@/components/CategoryTiles";
import ProductGrid from "@/components/ProductGrid";

// Allow blocking prerender so searchParams can seed the product filters.
export const instant = false;

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const sp = await searchParams;

  return (
    <>
      <Hero />

      {/* Trust strip */}
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-6 sm:px-6 md:grid-cols-4 lg:px-8">
          {[
            { title: "600+ Products", desc: "Tattoo, nails, lashes & beauty" },
            { title: "Islandwide Delivery", desc: "Colombo to Jaffna, door to door" },
            { title: "Real LKR Prices", desc: "No hidden conversion charges" },
            { title: "Studio Grade", desc: "Imported pro-quality supplies" },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-3">
              <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-rose-600" />
              <div>
                <p className="text-sm font-bold text-zinc-900">{item.title}</p>
                <p className="text-xs text-zinc-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CategoryTiles />
      <ProductGrid initialQuery={sp.q ?? ""} initialCategory={sp.category ?? ""} />
    </>
  );
}
