import { products } from "@/app/globals";
import Image from "next/image";
import React from "react";

const ProductDetails = ({ params }) => {
  let product = products.find((e) => e.id === params.id);

  for (const key in product) {
    if (product.hasOwnProperty(key)) {
      console.log(`${key}: ${product[key]}`);
    }
  }

  product.description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque. Sub sollicitudin purus, nec iaculis urna ornare vel.";

  return (
    <main className="pt-20 w-full border-4 border-cyan-500">
      <div className="w-10/12 mx-auto border-red-600 border-4 flex h-fit gap-4">
        <div className="w-4/12 p-4 border-4 border-yellow-500">
          <Image
            src={"/images/generic.jpg"}
            width={1200}
            height={1200}
            className="object-contain"
          />
        </div>
        <div className="w-5/12 p-4 flex flex-col">
          <p className="text-3xl"> {product.title}</p>
          <p>Código: {product.id}</p>
          <p className="text-md">
            Cuenta{" "}
            {product.accountType === "primary" ? "principal" : "secundaria"}
          </p>
          <p>Juego de: {product.console.join("-").toUpperCase()}</p>
          <p className="text-sm">Descripcion: {product.description}</p>
        </div>
        <div className="w-3/12">
          <div>
            <p className="text-xl">${product.price}</p>
            <p className="text-sm">
              Precio exclusivo <br />
              Transferencia/Efectivo
            </p>
          </div>
          <div>
            <p className="text-xl">Métodos de Pago</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;
