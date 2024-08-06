"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export const Product = ({ type, data }) => {
  console.log(data);
  const router = useRouter();
  return (
    <div
      className="bg-white border-4 border-red-500 text-black flex flex-col p-2 gap-2 hover:bg-gray-400 transition-all hover:scale-105"
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
          <div className="border-blue-500 border-4 w-40 h-40 mx-auto relative">
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
        <p className="font-bold">{data.title}</p>
        <p className="text-xs">
          {data.category === "giftcard"
            ? data.region
            : data.console.join("-").toUpperCase()}
        </p>
        <p>${data.price}</p>
      </div>
      <button onClick={() => router.replace(`/producto/${data.id}`)}>
        Agregar al carrito
      </button>
    </div>
  );
};

const ps4 = () => {};
