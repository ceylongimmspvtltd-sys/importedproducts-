import Link from "next/link";
import { topCategories } from "@/lib/products";
import Year from "@/components/Year";

export default function Footer() {
  const cats = topCategories(6);

  return (
    <footer id="footer" className="scroll-mt-40 bg-zinc-950 text-zinc-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-rose-600 text-sm font-black text-white">
                IP
              </span>
              <span className="leading-tight">
                <span className="block text-sm font-extrabold tracking-wide text-white">
                  IMPORTED PRODUCTS
                </span>
                <span className="block text-[10px] uppercase tracking-[0.22em] text-zinc-400">
                  Tattoo &amp; Beauty Store · Sri Lanka
                </span>
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400">
              Your one-stop shop for imported tattoo machines, needles, inks, nail
              extensions, eyelashes, hair extensions and salon essentials — with honest
              LKR pricing and islandwide delivery.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white">Shop</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {cats.map((c) => (
                <li key={c.name}>
                  <Link
                    href={`/?category=${encodeURIComponent(c.name)}`}
                    className="transition hover:text-white"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white">Help</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/#products" className="transition hover:text-white">
                  All products
                </Link>
              </li>
              <li>
                <Link href="/#categories" className="transition hover:text-white">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/" className="transition hover:text-white">
                  Shipping &amp; delivery
                </Link>
              </li>
              <li>
                <Link href="/" className="transition hover:text-white">
                  Returns &amp; refunds
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white">Contact</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-zinc-400">
              <li>Colombo, Sri Lanka</li>
              <li>Mon – Sat · 9.00am – 6.00pm</li>
              <li>hello@importedproducts.lk</li>
              <li>Islandwide delivery available</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-zinc-500 sm:flex-row">
          <p>
            © <Year /> Imported Products LK. All rights reserved.
          </p>
          <p>Prices shown in Sri Lankan Rupees (LKR).</p>
        </div>
      </div>
    </footer>
  );
}
