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
    <main className="pt-20 flex flex-col">
      <h3 className="font-semibold text-2xl text-center py-4">
        Juegos digitales
      </h3>
      <div className=" w-fit rounded-4 mx-auto border flex justify-center items-center gap-4 h-10 px-2">
        <p>Consola: </p>
        {consoles.map((c) => (
          <Link
            href={`/juegos/${c.url}`}
            className="text-cyan-800 font-semibold transition-all hover:scale-110"
          >
            {c.slug}
          </Link>
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
