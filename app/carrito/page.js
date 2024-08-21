import React from "react";
import CartBody from "@/components/Cart/CartBody";

const Carrito = () => {
  return (
    <main className="min-h-screen w-full pt-20 flex">
      <div className="w-6/12 lg:w-10/12 mx-auto flex flex-col p-2">
        <CartBody />
      </div>
    </main>
  );
};

export default Carrito;
