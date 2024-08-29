import React, { Suspense } from "react";
import { Product } from "./Products/Product";
import ProductsWrapper from "./Products/ProductsWrapper";

export function generateStaticParams() {
  return [
    { category: "games" },
    { category: "subscriptions" },
    { category: "giftcards" },
  ];
}

const Main = async () => {
  const response = await fetch("http://localhost:3000/api/productos", {
    cache: "force-cache",
    next: {
      revalidate: 1800,
    },
  }).then((r) => r.json());

  return (
    <main className="pt-20 min-h-screen flex flex-col items-center border-8 border-yellow-300">
      <h3 className="text-2xl">¡Bienvenido!</h3>
      <p className="text-xl">Estas visualizando todos nuestros productos.</p>
      <ProductsWrapper>
        <Suspense fallback={<h1>Cargando...</h1>}>
          {response.map((p) => (
            <Product data={p} key={p.id} />
          ))}
        </Suspense>
      </ProductsWrapper>
    </main>
  );
};

export default Main;
