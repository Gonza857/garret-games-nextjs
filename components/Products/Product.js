"use client";
import Image from "next/image";
import React from "react";
import Button from "../UI/Button";
import Link from "next/link";
import { useCartContext } from "../context/CartContext";
import { toastSuccess } from "@/helpers/toasts";

export const Product = ({ type, data }) => {
  const { addToCart } = useCartContext();
  return (
    <div
      className="bg-white border rounded overflow-hidden text-black flex flex-col p-2 hover:bg-gray-100 transition-all hover:scale-105 w-40 md:w-52 productCard"
      key={data.title}
    >
      <Link href={`/pages/producto/${data.category}/${data.id}`}>
        <div className="w-32 h-36 md:w-40 md:h-48 mx-auto rounded-md p-1">
          <Image
            src={data.image || "/images/no-image.jpg"}
            width={1000}
            height={1000}
            alt={data.title + " Image"}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>
      <p className="font-semibold min-h-10 flex items-center text-xs md:text-base leading-4 md:leading-normal">
        {data.title.length > 40 ? data.title.slice(0, 37) + "..." : data.title}
      </p>
      <div className="mt-auto flex flex-col gap-1 md:gap-2">
        <p className="text-xs">
          {data.category === "giftcard"
            ? `Region: ${data.region}`
            : `Consola ${data.console.join("/").toUpperCase()}`}
        </p>
        <p className="text-sm font-semibold">${data.price}</p>
        <Button
          onClick={() => {
            addToCart({ ...data, quantity: 1 });
            toastSuccess("Producto agregado al carrito correctamente.");
          }}
        >
          Agregar al carrito
        </Button>
      </div>
    </div>
  );
};
