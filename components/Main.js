import React, { Suspense } from "react";
import ProductList from "./Products/ProductList";
import ProductSkeleton from "./ProductSkeleton/ProductSkeleton";
import ProductsWrapper from "./Products/ProductsWrapper";

const Main = async () => {
  return (
    <main className="pt-20 min-h-screen flex flex-col items-center ">
      <h3 className="text-2xl">¡Bienvenido!</h3>
      <p className="text-xl">Estas visualizando todos nuestros productos.</p>
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
        .map(() => (
          <ProductSkeleton />
        ))}
    </ProductsWrapper>
  );
};

export default Main;

// force-cache

//     next: {
//  revalidate: 1800,
//},
