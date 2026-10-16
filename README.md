# Osho.lk - Online Shopping — E-commerce Store

A full e-commerce style web store built with **Next.js (App Router) + TypeScript + Tailwind CSS v4**, generated from the "Tatoo Products Liast 11" product list (607 products).

## Features

- 🛍️ **607 products** with names, categories, LKR prices and stock status
- 🖼️ **Product image for every product** — mapped to 20 category-matched product photos
- 🔍 Live search + category filter + sorting (price / name) + "in stock only"
- 🛒 Cart drawer with quantity management (saved in `localStorage`)
- 📄 Product detail pages (`/product/[slug]`) with related products
- 📱 Fully responsive design with sticky header & search

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

- `src/data/products.json` — all products (parsed from the provided list)
- `src/lib/products.ts` — product helpers (price / stock formatting, categories)
- `src/lib/cart.tsx` — cart state (React context + localStorage)
- `src/components/` — Header, Hero, CategoryTiles, ProductGrid, ProductCard, CartDrawer, Footer
- `src/app/` — home page + `/product/[slug]` detail pages
- `public/products/` — product category images + hero banner

## Data notes

- Prices are shown in Sri Lankan Rupees (LKR) exactly as provided in the source list (single price or min–max range). Items without a listed price show "Price on request".
- Stock status comes from the source list: In stock / Out of stock / Availability varies.
