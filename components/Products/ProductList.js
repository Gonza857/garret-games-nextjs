import React from "react";
import ProductsWrapper from "./ProductsWrapper";
import { Product } from "./Product";
import Link from "next/link";

const consoles = [
  { url: "ps3", slug: "PS3" },
  { url: "ps4", slug: "PS4" },
  { url: "ps5", slug: "PS5" },
];

async function ProductList({ category = "" }) {
  const products = await fetch(
    `http://localhost:3000/api/productos${category}`,
    {
      cache: "no-store",
      next: {},
    }
  ).then((r) => r.json());

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
