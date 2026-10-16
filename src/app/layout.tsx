import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

export const metadata: Metadata = {
  title: "Osho.lk - Online Shopping | Tattoo, Nails, Lashes & Beauty Store",
  description:
    "Osho.lk - Online Shopping: shop 600+ imported tattoo and beauty products in Sri Lanka — cartridge needles, tattoo inks, machines, nail extensions, eyelash extensions, hair extensions, skincare and more, with real LKR prices and islandwide delivery.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
