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
      className="bg-white border rounded overflow-hidden text-black flex flex-col justify-between p-2 hover:bg-gray-100 transition-all hover:scale-105 h-100"
      key={data.title}
    >
      {/* {data.category === "giftcard" ? (
        <Link href={`/producto/${data.category}/${data.id}`}>
          <div className="w-40 h-40 mx-auto">
            <p className="text-2xl">{data.title}</p>
          </div>
        </Link>
      ) : (
        
      )} */}
      <Link href={`/producto/${data.category}/${data.id}`}>
        <div className="w-40 h-48 mx-auto rounded-md p-1">
          <Image
            src={data.image.url}
            width={1000}
            height={1000}
            alt={data.title + " Image"}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>
      <div className="flex flex-col gap-1">
        <p className="font-semibold">
          {data.title.length > 40
            ? data.title.slice(0, 39) + "..."
            : data.title}
        </p>
        <p className="text-xs">
          {data.category === "giftcard"
            ? data.region
            : data.console.join("-").toUpperCase()}
        </p>
        <p>${data.price}</p>
      </div>
      <Button
        onClick={() => {
          addToCart({ ...data, quantity: 1 });
        }}
      >
        Agregar al carrito
      </Button>
    </div>
  );
};
