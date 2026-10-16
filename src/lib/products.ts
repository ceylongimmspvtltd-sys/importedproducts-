import raw from "@/data/products.json";

export type Stock = "in" | "out" | "unknown";

export interface Product {
  id: string;
  name: string;
  category: string;
  priceMin: number | null;
  priceMax: number | null;
  stock: Stock;
  url: string;
  image: string;
}

export const products: Product[] = raw as Product[];

export function formatLKR(amount: number): string {
  return "රු" + Math.round(amount).toLocaleString("en-US");
}

export function priceLabel(p: { priceMin: number | null; priceMax: number | null }): string {
  if (p.priceMin == null) return "Price on request";
  if (p.priceMax == null || p.priceMax === p.priceMin) return formatLKR(p.priceMin);
  return `${formatLKR(p.priceMin)} – ${formatLKR(p.priceMax)}`;
}

export function stockLabel(stock: Stock): string {
  return stock === "in" ? "In stock" : stock === "out" ? "Out of stock" : "Availability varies";
}

export function stockDotClass(stock: Stock): string {
  return stock === "in" ? "bg-emerald-500" : stock === "out" ? "bg-rose-500" : "bg-amber-500";
}

export function categoryCounts(): { name: string; count: number }[] {
  const map = new Map<string, number>();
  for (const p of products) map.set(p.category, (map.get(p.category) ?? 0) + 1);
  return [...map.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

/** Top categories with a representative product image — used for category tiles. */
export function topCategories(limit = 12): { name: string; count: number; image: string }[] {
  return categoryCounts()
    .slice(0, limit)
    .map((c) => {
      const sample = products.find((p) => p.category === c.name);
      return { ...c, image: sample?.image ?? "/products/accessories.jpg" };
    });
}

export function descriptionFor(p: Product): string {
  return `The ${p.name} is part of our imported ${p.category.toLowerCase()} range, picked for professional tattoo studios, nail bars and beauty artists across Sri Lanka. Every item is priced in LKR, and our team can help you choose the right variant before you order.`;
}
