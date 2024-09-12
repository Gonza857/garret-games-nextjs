"use client";
import React from "react";
import { useCartContext } from "../context/CartContext";

const CartTotal = () => {
  const { total } = useCartContext();

  return (
    <div className="w-full flex justify-end font-semibold text-xl p-3">
      Total: ${total.toFixed(2)}
    </div>
  );
};

export default CartTotal;
