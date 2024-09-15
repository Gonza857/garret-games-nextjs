import React from "react";
import CartBody from "@/components/Cart/CartBody";
import Button from "@/components/Button";
import MakeOrder from "@/components/Cart/MakeOrder";
import Link from "next/link";

const Carrito = () => {
  return (
    <main className="min-h-screen w-full pt-20 flex">
      <div className="w-6/12 lg:w-10/12 mx-auto flex flex-col p-2 gap-2">
        <CartBody />
        <div className="flex justify-center">
          <Link href={"/pages/orden"}>
            <Button>Realizar Orden</Button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Carrito;
