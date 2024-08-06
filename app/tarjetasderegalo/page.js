import React from "react";
import { products } from "../globals";
import ProductsWrapper from "@/components/Products/ProductsWrapper";
import { Product } from "@/components/Products/Product";

const giftcards = products.filter((game) => game.category == "giftcard");
giftcards.forEach((g) => (g.imageUrl = "/images/generic.jpg"));
const Giftcards = () => {
  return (
    <main className="pt-20">
      <ProductsWrapper>
        {giftcards.map((g) => (
          <Product data={g} />
        ))}
      </ProductsWrapper>
    </main>
  );
};

export default Giftcards;
