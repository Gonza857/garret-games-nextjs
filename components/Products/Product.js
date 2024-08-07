"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import Button from "../Button";

export const Product = ({ type, data }) => {
  console.log(data);
  const router = useRouter();
  return (
    <div
      className="bg-white border rounded overflow-hidden text-black flex flex-col justify-between p-2 hover:bg-gray-100 transition-all hover:scale-105 h-80"
      key={data.title}
    >
      {data.category === "giftcard" ? (
        <>
          <div className="w-40 h-40 mx-auto">
            <p className="text-2xl">{data.title}</p>
          </div>
        </>
      ) : (
        <>
          <div className="w-40 h-40 mx-auto relative">
            <Image
              src={data.imageUrl}
              width={1000}
              height={1000}
              alt={data.title + " Image"}
              className="w-full h-full object-fill"
            />
          </div>
        </>
      )}

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
      <Button onClick={() => router.replace(`/producto/${data.id}`)}>
        Agregar al carrito
      </Button>
    </div>
  );
};
