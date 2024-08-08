"use client";
import React, { useState } from "react";

const ProductCounter = ({ maxStock }) => {
  const [quantity, setQuantity] = useState(1);

  const addQuantity = () => {
    if (quantity >= maxStock) return;
    setQuantity(quantity + 1);
  };

  const substractQuantity = () => {
    if (quantity <= 1) return;
    setQuantity(quantity - 1);
  };

  return (
    <div className="flex border rounded overflow-hidden">
      <div
        className="bg-cyan-800 w-4 flex items-center justify-center h-8 p-4 cursor-pointer text-white select-none hover:bg-cyan-700"
        onClick={() => substractQuantity()}
      >
        -
      </div>
      <div className="w-12 flex items-center justify-center h-8 p-4">
        {quantity}
      </div>
      <div
        className="bg-cyan-800 w-4 flex items-center justify-center h-8 p-4 cursor-pointer text-white select-none hover:bg-cyan-700"
        onClick={() => addQuantity()}
      >
        +
      </div>
    </div>
  );
};

export default ProductCounter;
