import React from "react";
import ProductCounter from "../ProductCounter";
import Image from "next/image";
import QuantityHandler from "../Products/QuantityHandler";

const CartProduct = ({ data, productcQuantity = 0 }) => {
  return (
    <div className=" flex flex-wrap w-fit md:w-full min-h-fit border rounded p-2 gap-2">
      {/* IMAGE + TITLE */}
      <div className="w-full flex flex-wrap">
        <div className="w-4/12 md:w-2/12 h-28 flex items-center">
          <Image
            src={data.image}
            width={750}
            height={750}
            alt={data.title}
            className="object-contain"
          />
        </div>
        <div className="w-8/12 md:w-10/12 p-2">
          <p className="text-cyan-800 font-semibold md:text-lg m-0 pb-1">
            {data.title}
          </p>
          <p className="text-sm md:text-base m-0 pb-1">
            {data.category == "giftcard"
              ? "Region: " + data.region
              : "Consola: " + data.console.join("/")}
          </p>
          <div className="hidden md:flex w-full justify-between items-center">
            <QuantityHandler item={data} buttonVisibility={false} />
            <p>Subtotal: ${(productcQuantity * data.price).toFixed(2)}</p>
          </div>
        </div>
      </div>
      {/* COUNTER + PRICE */}
      <div className="md:hidden w-full flex justify-between items-center">
        <QuantityHandler item={data} buttonVisibility={false} />
        <p>Subtotal: ${(productcQuantity * data.price).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CartProduct;
