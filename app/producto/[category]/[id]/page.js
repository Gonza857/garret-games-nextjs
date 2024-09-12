import { paymentMethods } from "@/app/globals";
import QuantityHandler from "@/components/Products/QuantityHandler";
import Image from "next/image";
import React from "react";

export async function generateMetadata({ params, searchParams }, parent) {
  const id = params.id;
  const category = params.category;
  const singleProduct = await getSingleProduct(id, category);
  return {
    title: singleProduct.title,
  };
}

const getSingleProduct = async (id, category) => {
  return await fetch(`http://localhost:3000/api/producto/${category}/${id}`, {
    cache: "no-store",
  }).then((r) => r.json());
};

const ProductDetails = async ({ params }) => {
  const id = params.id;
  const category = params.category;
  const singleProduct = await getSingleProduct(id, category);
  singleProduct.stock = Number(singleProduct.stock);

  return (
    <main className="pt-24 w-full min-h-screen flex">
      <div className="w-10/12 mx-auto flex h-fit gap-4 py-4">
        {/* IZQUIERDA */}
        <div className="w-4/12">
          <Image
            width={1000}
            height={1000}
            src={singleProduct.image}
            alt={singleProduct.title}
          />
        </div>
        {/* CENTRO */}
        <div className="w-5/12 px-4 flex flex-col border-l-2">
          <p className="text-3xl text-cyan-800 font-semibold">
            {singleProduct.title}
          </p>
          <p className="text-sm">Código: {singleProduct.id}</p>
          <p className="text-md">
            {singleProduct.category == "giftcard"
              ? `Región: ${singleProduct.region.toUpperCase()}`
              : `Cuenta: ${
                  singleProduct.accountType === "primary"
                    ? "principal"
                    : "secundaria"
                }`}
          </p>
          <p>
            {singleProduct.category === "game" &&
              singleProduct.console.join("-").toUpperCase()}
          </p>
          <p>Stock: {singleProduct.stock}</p>

          <p className="text-sm whitespace-pre-wrap">
            Descripcion: {singleProduct.description}
          </p>
        </div>
        {/* DERECHA */}
        <div className="w-3/12 border-l-2 px-4 flex flex-col gap-2">
          <div className="bg-cyan-800 text-white flex flex-col gap-2 p-2">
            <p className="text-2xl">${singleProduct.price}</p>
            <p className="text-sm">
              Precio exclusivo <br />
              Transferencia/Efectivo
            </p>
          </div>
          <div className="flex flex-col">
            <p className="text-xl font-semibold">Métodos de Pago</p>
            <ul className="px-4 flex flex-col">
              {paymentMethods.map((m) => (
                <li className="list-disc">{m}</li>
              ))}
            </ul>
          </div>
          <div className="flex justify-center flex-col gap-4 items-center">
            <QuantityHandler item={singleProduct} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;
