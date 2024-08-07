import React from "react";
import { AiFillDelete } from "react-icons/ai";
import Button from "../Button";
import ProductCounter from "../ProductCounter";
import Image from "next/image";

const CartProduct = ({ data, quantity, sumarProductos }) => {
  const handleTotal = (q) => {
    console.log("Cantidad: " + q);
    // sumarProductos(data, q);
  };

  return (
    <div className="flex w-full min-h-fit border rounded items-center justify-around">
      <div className=" w-3/12 flex  justify-center">
        <Image
          src={"/images/generic.jpg"}
          width={100}
          height={100}
          alt={data.title}
        />
      </div>
      <div className="p-2 w-7/12 flex flex-col gap-2">
        <p className="text-cyan-800 font-semibold text-lg">{data.title}</p>
        <div className="flex gap-4 items-center">
          <p>Unidades: </p>
          <ProductCounter maxStock={data.stock} handleTotal={handleTotal} />
        </div>
        <div className="text-md text-cyan-800 font-semibold">
          Precio total: ${Math.floor(quantity * data.price)}
        </div>
      </div>
      <div className="w-2/12 flex items-center justify-center">
        <Button>
          <AiFillDelete />
        </Button>
      </div>
    </div>
  );
};

export default CartProduct;
