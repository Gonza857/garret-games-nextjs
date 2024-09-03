import React from "react";
import { useCartContext } from "./context/CartContext";

const ProductCounter = ({ data, maxStock, quantity }) => {
  const { addToCart, removeSingleUnitFromCart } = useCartContext();

  const addQuantity = () => {
    if (quantity >= maxStock) {
      return;
    }

    addToCart({ ...data, quantity: 1 });
  };

  const substractQuantity = () => {
    removeSingleUnitFromCart(data);
  };

  return (
    <div className="flex border rounded overflow-hidden w-fit">
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
