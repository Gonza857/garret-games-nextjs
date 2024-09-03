import CategoriesMenu from "@/components/CategoriesMenu";
import ProductList from "@/components/Products/ProductList";
import Link from "next/link";
import React from "react";

const getCategoryTextForUser = (category) => {
  switch (category) {
    case "tarjetasderegalo":
      return "Tarjetas de regalo";
    case "subscriptions":
      return "PlayStation Plus";
    case "juegos":
      return "juegos";
    default:
      return "Error";
  }
};

const GAMES = "juegos";
const SUBSCRIPTION = "playstationplus";
const GIFTCARD = "tarjetasderegalo";

const knowCategory = (c) => {
  switch (c) {
    case GAMES:
      return "games";
    case SUBSCRIPTION:
      return "subscriptions";
    case GIFTCARD:
      return "giftcards";
    default:
      return "todos";
  }
};

export function generateStaticParams() {
  return [
    { category: "" },
    { category: "games" },
    { category: "playstationplus" },
    { category: "giftcards" },
  ];
}

export const revalidate = 1800;

async function TodosLosProductos({ params }) {
  let c = knowCategory(params.category);
  const products = await fetch(`http://localhost:3000/api/productos/${c}`, {
    cache: "no-store",
    next: {
      tags: ["productos"],
    },
  }).then((r) => r.json());

  return (
    <main className="pt-20 flex flex-col items-center min-h-screen">
      <h3 className="text-2xl py-2">
        Estas visualizando {getCategoryTextForUser(params.category)}
      </h3>
      <ProductList category={c} products={products} />
    </main>
  );
}

export default TodosLosProductos;
