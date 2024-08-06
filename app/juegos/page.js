import React from "react";
import { products } from "../globals";
import { Product } from "@/components/Products/Product";
import ProductsWrapper from "@/components/Products/ProductsWrapper";
import Link from "next/link";

const games = products.filter((game) => game.category == "game");
games.forEach((g) => (g.imageUrl = "/images/generic.jpg"));

const consoles = [
  { url: "/ps3", slug: "PS3" },
  { url: "/ps4", slug: "PS4" },
  { url: "/ps5", slug: "PS5" },
];

const Juegos = ({ params }) => {
  console.log(params);
  return (
    <main className="pt-20">
      <div className="border-4 border-red-500 flex gap-4">
        {consoles.map((c) => (
          <Link href={`${c.url}`}>{c.slug}</Link>
        ))}
      </div>
      <ProductsWrapper>
        {games.map((g) => (
          <Product data={g} />
        ))}
      </ProductsWrapper>
    </main>
  );
};

export default Juegos;
