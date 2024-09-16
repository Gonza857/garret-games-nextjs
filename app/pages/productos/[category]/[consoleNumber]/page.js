import ProductList from "@/components/Products/ProductList";
import React from "react";

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

export function generateStaticParams() {
  return [
    { consoleNumber: "ps3" },
    { consoleNumber: "ps4" },
    { consoleNumber: "ps5" },
  ];
}

export const revalidate = 900;

export const dynamic = "force-dynamic";

const Juegos = async ({ params }) => {
  let baseUrl = process.env.VERCEL_URL
    ? `http://${process.env.VERCEL_URL}`
    : "http://localhost:3000";
  let c = knowCategory(params.category);
  const products = await fetch(
    `${baseUrl}/api/productos/${c}/${params.consoleNumber}`,
    {
      cache: "no-store",
      next: {
        tags: ["console"],
      },
    }
  ).then((r) => r.json());
  console.log(c);

  return (
    <main className="pt-20 flex flex-col items-center">
      <h1>
        <h3 className="text-2xl py-2">
          Estas visualizando {params.category} para consola{" "}
          {params.consoleNumber.toUpperCase()}
        </h3>
      </h1>
      <ProductList category={c} products={products} />
    </main>
  );
};

export default Juegos;
