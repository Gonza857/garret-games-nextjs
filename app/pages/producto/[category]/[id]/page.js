import { paymentMethods } from "@/app/globals";
import QuantityHandler from "@/components/Products/QuantityHandler";
import Image from "next/image";
import React from "react";

// export async function generateMetadata({ params, searchParams }, parent) {
//   const id = params.id;
//   const category = params.category;
//   const singleProduct = await getSingleProduct(id, category);
//   return {
//     title: singleProduct.title,
//   };
// }

const getSingleProduct = async (id, category) => {
  let baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";
  return await fetch(`${baseUrl}/api/producto/${category}/${id}`, {
    cache: "no-store",
  }).then((r) => r.json());
};

const ProductDetails = async ({ params }) => {
  const id = params.id;
  const category = params.category;
  const singleProduct = await getSingleProduct(id, category);
  singleProduct.stock = Number(singleProduct.stock);

  return (
    <main className="w-full min-h-screen flex">
      <div className="pt-16 md:pt-0 md:mt-24 w-full lg:w-10/12 h-fit mx-auto flex flex-col items-center md:items-start md:flex-row gap-4 py-4 md:px-1 lg:px-0">
        {/* IZQUIERDA */}
        <div className="w-8/12 md:w-4/12">
          <Image
            width={1000}
            height={1000}
            src={singleProduct.image}
            alt={singleProduct.title}
          />
        </div>
        {/* CENTRO */}
        <div className="w-full md:w-5/12 px-4 flex flex-col md:border-l-2">
          <p className="text-3xl text-cyan-800 font-semibold py-2 md:py-0">
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
        <div className="w-full md:w-3/12 border-l-2 px-4 flex flex-col gap-2">
          <div className="bg-cyan-800 text-white flex flex-col gap-2 p-2 order-1 md:order-1">
            <p className="text-2xl">${singleProduct.price}</p>
            <p className="text-sm">
              Precio exclusivo <br />
              Transferencia/Efectivo
            </p>
          </div>
          <div className="flex flex-col order-3 md:order-2">
            <p className="text-xl font-semibold">Métodos de Pago</p>
            <ul className="px-4 flex flex-col">
              {paymentMethods.map((m) => (
                <li className="list-disc" key={m}>
                  {m}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-center flex-col gap-4 items-center order-2 md:order-3">
            <QuantityHandler item={singleProduct} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;
