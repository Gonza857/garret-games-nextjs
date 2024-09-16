import React from "react";
import ProductsWrapper from "./ProductsWrapper";
import { Product } from "./Product";
import Link from "next/link";

const consoles = [
  { url: "ps3", slug: "PS3" },
  { url: "ps4", slug: "PS4" },
  { url: "ps5", slug: "PS5" },
];

export const dynamic = "force-dynamic";

async function ProductList({ category = "" }) {
  let baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";
  let normal = "http://localhost:3000";
  const products = await fetch(`${normal}/api/productos${category}`, {
    cache: "no-store",
    next: {},
  }).then((r) => r.json());

  return (
    <>
      {category == "games" && <ConsoleCategories />}
      <ProductsWrapper>
        {products.map((p) => (
          <Product data={p} key={p.id} />
        ))}
      </ProductsWrapper>
    </>
  );
}

const ConsoleCategories = () => {
  return (
    <div className=" w-fit rounded-4 mx-auto border flex justify-center items-center gap-4 h-10 px-2">
      <p>Consola: </p>
      {consoles.map((c) => (
        <Link
          key={`${c.slug}+${c.url}`}
          href={`/productos/juegos/${c.url}`}
          className="text-cyan-800 font-semibold transition-all hover:scale-110"
        >
          {c.slug}
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
