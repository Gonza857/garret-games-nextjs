"use client";
import React, { useState } from "react";
import ProductCounter from "../ProductCounter";
import Link from "next/link";
import Button from "../Button";
import { useCartContext } from "../context/CartContext";

const QuantityHandler = ({ item }) => {
  const { addToCart } = useCartContext();
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    addToCart({ ...item, quantity });
  };

  return (
    <>
      <ProductCounter
        data={item}
        setQuantity={setQuantity}
        quantity={quantity}
        maxStock={item.stock}
      />
      <Button onClick={handleAdd}>Agregar al carrito</Button>
      <Link href={"/carrito"}>No tocar</Link>
    </>
  );
};

export default QuantityHandler;
