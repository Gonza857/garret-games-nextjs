import { categories, products } from "@/app/globals";
import React, { Suspense } from "react";
import { Product } from "./Products/Product";
import ProductsWrapper from "./Products/ProductsWrapper";
import CategoriesMenu from "./CategoriesMenu";

let capitalizarArray = (array) => {
  for (let i = 0; i < array.length; i++) {
    array[i] = array[i].toUpperCase();
  }
  return array;
};

let games = products.filter((product) => product.category === "game");
games.forEach((game) => {
  game.console = capitalizarArray(game.console);
  game.imageUrl = "/images/generic.jpg";
});

let plus = products.filter((product) => product.category === "subscription");
let giftcards = products.filter((product) => product.category === "giftcard");

const Main = async () => {
  const response = await fetch("http://localhost:3000/api/productos", {
    cache: "no-store",
  }).then((r) => r.json());

  return (
    <main className="pt-20 min-h-screen flex flex-col items-center">
      <h3 className="text-2xl">Garret Games</h3>
      <div className="flex gap-2 items-center justify-center">
        <p className="font-extrabold">Categorias</p>
        <CategoriesMenu />
      </div>
      <div>
        <ProductsWrapper>
          <Suspense fallback={<h1>CARGANDO AMIGO BANCA</h1>}>
            {response.map((p) => (
              <Product data={p} key={p.id} />
            ))}
          </Suspense>
        </ProductsWrapper>
      </div>
    </main>
  );
};

export default Main;
