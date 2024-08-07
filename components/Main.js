import { products } from "@/app/globals";
import Image from "next/image";
import React from "react";
import { Product } from "./Products/Product";

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

const Main = () => {
  return (
    <main className="pt-20 min-h-screen flex items-center justify-center">
      <h3 className="text-2xl">Garret Games</h3>
    </main>
  );
};

export default Main;
