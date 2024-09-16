"use client";
import React from "react";
import { useCartContext } from "../context/CartContext";
import CartEmpty from "./CartEmpy";
import CartList from "./CartList";
import CartTotal from "./CartTotal";

const CartBody = () => {
  const { isCartEmpty } = useCartContext();

  return (
    <>
      {isCartEmpty() ? (
        <>
          <CartEmpty />
        </>
      ) : (
        <>
          <h3 className="text-2xl font-semibold text-center">
            Carrito de compras
          </h3>
          <div className="flex flex-wrap gap-2 justify-center">
            <CartList />
            <CartTotal />
          </div>
        </>
      )}
    </>
  );
};

const CartHeader = () => {
  return (
    <div className="hidden lg:grid grid-cols-12 grid-rows-1 gap-3 p-2">
      <p className="col-span-5 text-center">Producto</p>
      <p className="col-span-2 text-center">Precio</p>
      <p className="col-span-3 text-center">Unidades</p>
      <p className="col-span-2 text-center">Subtotal</p>
    </div>
  );
};

export default CartBody;
