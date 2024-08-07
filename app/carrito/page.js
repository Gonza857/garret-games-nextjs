"use client";
import React, { useState } from "react";
import { products } from "../globals";

import { randomStock } from "../producto/[id]/page";

import CartProduct from "@/components/Cart/CartProduct";

const Carrito = () => {
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);

  let copyProducts = [...products];
  let fiveExampleProducts = copyProducts.splice(40, 5);
  fiveExampleProducts.forEach((p) => (p.stock = randomStock()));

  const sumarProductos = (product, quantity) => {
    setTotal((anterior) => anterior + product.price * quantity);
  };

  return (
    <main className="min-h-screen w-full pt-20 flex border-4">
      <div className="w-6/12 mx-auto flex flex-col">
        <h3>Carrito de compras</h3>
        {/*  Products  */}
        <div className="w-full flex flex-col gap-2">
          {fiveExampleProducts.map((c) => (
            <CartProduct
              data={c}
              sumarProductos={sumarProductos}
              quantity={quantity}
              key={c.id}
            />
          ))}
        </div>
        <div className="w-full flex justify-end font-semibold text-xl pt-3">
          Total: ${total}
        </div>
      </div>
    </main>
  );
};

export default Carrito;
