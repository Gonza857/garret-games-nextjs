import ProductList from "@/components/Products/ProductList";
import { notFound } from "next/navigation";
import React from "react";

const getCategoryTextForUser = (category) => {
  switch (category) {
    case "tarjetasderegalo":
      return "Tarjetas de regalo";
    case "playstationplus":
      return "PlayStation Plus";
    case "juegos":
      return "juegos";
    default:
      notFound();
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
    { category: "juegos" },
    { category: "playstationplus" },
    { category: "tarjetasderegalo" },
  ];
}

export const revalidate = 900;

export async function generateMetadata({ params }) {
  return {
    title: `${getCategoryTextForUser(params.category)} | Garret Games`,
    description: `Categoria ${getCategoryTextForUser(
      params.category
    )} - Productos originales, garantía asegurada y soporte personalizado.`,
  };
}

async function TodosLosProductos({ params }) {
  let c = knowCategory(params.category);

  return (
    <main className="pt-20 flex flex-col items-center min-h-screen">
      <h3 className="text-2xl py-2">
        Estas visualizando {getCategoryTextForUser(params.category)}
      </h3>
      <ProductList category={`/${c}`} />
    </main>
  );
}

export default TodosLosProductos;
