import { paymentMethods } from "@/app/globals";
import QuantityHandler from "@/components/Products/QuantityHandler";
import React from "react";

const ProductDetails = async ({ params }) => {
  const singleProduct = await fetch(
    `http://localhost:3000/api/producto/${params.category}/${params.id}`,
    {
      cache: "force-cache",
      next: { revalidate: 3600 },
    }
  ).then((r) => r.json());

  return (
    <main className="pt-20 w-full min-h-screen flex items-center">
      <div className="w-10/12 mx-auto flex h-fit gap-4 py-4">
        {/* IZQUIERDA */}
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

          <p className="text-sm">Descripcion: {singleProduct.description}</p>
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
