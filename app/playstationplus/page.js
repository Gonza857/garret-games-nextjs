import { Product } from "@/components/Products/Product";
import ProductsWrapper from "@/components/Products/ProductsWrapper";
import React from "react";
import { products } from "../globals";

const plus = products.filter((game) => game.category == "subscription");
plus.forEach((g) => (g.imageUrl = "/images/generic.jpg"));

const PlayStationPlus = () => {
  return (
    <main className="pt-20">
      <ProductsWrapper>
        {plus.map((g) => (
          <Product data={g} />
        ))}
      </ProductsWrapper>
    </main>
  );
};

export default PlayStationPlus;
