import React from "react";
import ProductsWrapper from "./ProductsWrapper";
import { Product } from "./Product";

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

async function ProductList({ category }) {
  let c = knowCategory(category);
  console.log(c);
  const response = await fetch(`http://localhost:3000/api/productos/${c}`, {
    cache: "no-store",
    next: {
      tags: ["productos"],
    },
  }).then((r) => r.json());
  return (
    <ProductsWrapper>
      {response.map((p) => (
        <Product data={p} key={p.id} />
      ))}
    </ProductsWrapper>
  );
}

export default ProductList;
