"use client";
import Image from "next/image";
import React from "react";
import Button from "../Button";
import Link from "next/link";
import { useCartContext } from "../context/CartContext";

export const Product = ({ type, data }) => {
  const { addToCart } = useCartContext();
  return (
    <div
      className="bg-white border rounded overflow-hidden text-black flex flex-col p-2 hover:bg-gray-100 transition-all hover:scale-105 w-52"
      style={{ height: "360px" }}
      key={data.title}
    >
      <Link href={`/producto/${data.category}/${data.id}`}>
        <div className="w-40 h-48 mx-auto rounded-md p-1">
          <Image
            src={data.image || "/images/no-image.jpg"}
            width={1000}
            height={1000}
            alt={data.title + " Image"}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>
      <p className="font-semibold min-h-10 flex items-center">
        {data.title.length > 40 ? data.title.slice(0, 39) + "..." : data.title}
      </p>
      <div className="mt-auto flex flex-col gap-2">
        <p className="text-xs">
          {data.category === "giftcard"
            ? `Region: ${data.region}`
            : `Consola ${data.console.join("/").toUpperCase()}`}
        </p>
        <p>${data.price}</p>
        <Button
          onClick={() => {
            addToCart({ ...data, quantity: 1 });
          }}
        >
          Agregar al carrito
        </Button>
      </div>
    </div>
  );
};
