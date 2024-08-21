import React from "react";
import { products } from "../../../globals";
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
      <h1>Hola: {params.console}</h1>
    </main>
  );
};

export default Juegos;
