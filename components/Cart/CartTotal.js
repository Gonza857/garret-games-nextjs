"use client";
import React from "react";
import { useCartContext } from "../context/CartContext";
import Button from "../UI/Button";
import Link from "next/link";

const CartTotal = () => {
  const { total } = useCartContext();

  return (
    <div className="md:w-1/4 flex flex-col gap-2 font-semibold text-xl p-3 md:border">
      <div className="w-full py-3 px-2 md:py-5 bg-cyan-800 rounded">
        <p className="text-white">Total: ${total.toFixed(2)}</p>
      </div>
      <div className="flex justify-center">
        <Link href={"/pages/orden"}>
          <Button>Realizar Orden</Button>
        </Link>
      </div>
    </div>
  );
};

export default CartTotal;
