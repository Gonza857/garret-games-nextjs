import CategoriesMenu from "@/components/CategoriesMenu";
import ProductList from "@/components/Products/ProductList";
import Link from "next/link";
import React from "react";

const consoles = [
  { url: "/ps3", slug: "PS3" },
  { url: "/ps4", slug: "PS4" },
  { url: "/ps5", slug: "PS5" },
];

export function generateStaticParams() {
  return [
    { categoria: "" },
    { categoria: "games" },
    { categoria: "playstationplus" },
    { categoria: "giftcards" },
  ];
}

export const revalidate = 1800;

async function TodosLosProductos({ params }) {
  let needConsoleFilter = false;
  const { category } = params;
  if (category == "juegos") needConsoleFilter = true;

  return (
    <main className="pt-20">
      {/* {needConsoleFilter && <ConsoleCategories />} */}
      <CategoriesMenu />
      <ProductList category={category} />
    </main>
  );
}

export default TodosLosProductos;

const ConsoleCategories = () => {
  return (
    <div className=" w-fit rounded-4 mx-auto border flex justify-center items-center gap-4 h-10 px-2">
      <p>Consola: </p>
      {consoles.map((c) => (
        <Link
          href={`/productos/juegos/${c.url}`}
          className="text-cyan-800 font-semibold transition-all hover:scale-110"
        >
          {c.slug}
        </Link>
      ))}
    </div>
  );
};
