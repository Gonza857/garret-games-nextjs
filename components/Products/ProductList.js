import React from "react";
import ProductsWrapper from "./ProductsWrapper";
import { Product } from "./Product";

const GAMES = "juegos";
const SUBSCRIPTION = "playstationplus";
const GIFTCARD = "tarjetasderegalo";

const knowCategory = (c) => {
  // juegos,playstationplus,tarjetaderegalo
  switch (c) {
    case GAMES:
      return "game";
    case SUBSCRIPTION:
      return "subscription";
    case GIFTCARD:
      return "giftcard";
    default:
      return "todos";
  }
};

const objOriginal = {
  cache: "force-cache",
  next: {
    tags: ["productos"],
  },
};

async function ProductList({ category }) {
  category = knowCategory(category);
  const response = await fetch(
    `http://localhost:3000/api/productos/${category}`,
    { cache: "no-cache" }
  ).then((r) => r.json());
  return (
    <ProductsWrapper>
      {response.map((p) => (
        <Product data={p} key={p.id} />
      ))}
    </ProductsWrapper>
  );
}

export default ProductList;
