import React from "react";
import CartBody from "@/components/Cart/CartBody";
import Button from "@/components/UI/Button";
import MakeOrder from "@/components/Cart/MakeOrder";
import Link from "next/link";

const Carrito = () => {
  return (
    <main className="min-h-screen w-full pt-14 md:pt-20 flex">
      <div className="w-full md:w-6/12 lg:w-8/12 mx-auto flex flex-col p-2 gap-2">
        <CartBody />
      </div>
    </main>
  );
};

export default Carrito;
