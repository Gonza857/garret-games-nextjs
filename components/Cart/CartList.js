"use client";
import React from "react";
import { useCartContext } from "../context/CartContext";
import CartEmpty from "./CartEmpy";
const CartList = () => {
  const { cart } = useCartContext();
  return (
    <CartWrapper>
      {cart.map((c) => (
        <CartProduct data={c} productcQuantity={c.quantity} key={c.id} />
      ))}
    </CartWrapper>
  );
};

const CartWrapper = ({ children }) => {
  return <div className="w-full flex flex-col gap-2">{children}</div>;
};

export default CartList;
