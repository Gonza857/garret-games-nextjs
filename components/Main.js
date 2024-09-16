import React, { Suspense } from "react";
import ProductList from "./Products/ProductList";
import ProductSkeleton from "./ProductSkeleton/ProductSkeleton";
import ProductsWrapper from "./Products/ProductsWrapper";

const Main = async () => {
  return (
    <main className="w-full pt-20 min-h-screen flex flex-col flex-wrap items-center px-1">
      <h3 className="text-center text-xl md:text-2xl">¡Bienvenido!</h3>
      <p className="text-center md:text-xl">
        Estas visualizando todos nuestros productos.
      </p>
      <Suspense fallback={<Skeletons quantity={10} />}>
        <ProductList />
      </Suspense>
    </main>
  );
};

const Skeletons = ({ quantity }) => {
  return (
    <ProductsWrapper>
      {Array(quantity)
        .fill({})
        .map((v, i) => (
          <ProductSkeleton key={i} />
        ))}
    </ProductsWrapper>
  );
};

export default Main;

// force-cache

//     next: {
//  revalidate: 1800,
//},
