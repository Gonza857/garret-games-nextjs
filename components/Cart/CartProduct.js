import React from "react";
import ProductCounter from "../ProductCounter";
import Image from "next/image";
import QuantityHandler from "../Products/QuantityHandler";

const CartProduct = ({ data, productcQuantity = 0 }) => {
  return (
    <div className="grid grid-cols-12 w-full min-h-fit border rounded p-2 gap-2">
      <div className="flex col-span-5 ">
        <div>
          <Image src={data.image} width={100} height={100} alt={data.title} />
        </div>
        <p className="text-cyan-800 font-semibold text-lg p-2">{data.title}</p>
      </div>

      <div className="col-span-2 flex items-center justify-center">
        <p>${data.price}</p>
      </div>

      <div className="p-2 flex items-center justify-center gap-2 col-span-3">
        <QuantityHandler item={data} buttonVisibility={false} />
        {/* <div className="text-md text-cyan-800 font-semibold">
          Precio total: ${Math.floor(quantity * data.price)}
        </div> */}
      </div>

      <div className="col-span-2  flex items-center justify-center">
        <p>${(productcQuantity * data.price).toFixed(2)}</p>
      </div>

      {/* <div className="flex items-center justify-center col-span-2">
        <Button>
          <AiFillDelete />
        </Button>
      </div> */}
    </div>
  );
};

export default CartProduct;
