import { paymentMethods, products } from "@/app/globals";
import Button from "@/components/Button";
import ProductCounter from "@/components/ProductCounter";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const pd =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque. Sub sollicitudin purus, nec iaculis urna ornare vel.";

export const randomStock = () => {
  return Math.floor(Math.random() * 10);
};

const ProductDetails = ({ params }) => {
  let product = products.find((e) => e.id === params.id);
  product.stock = Math.floor(Math.random() * 10);
  if (product.stock <= 0) product.stock = randomStock();
  product.description = pd;

  return (
    <main className="pt-20 w-full min-h-screen flex items-center">
      <div className="w-10/12 mx-auto flex h-fit gap-4 py-4">
        {/* IZQUIERDA */}
        <div className="w-4/12 px-4">
          <Image
            src={"/images/generic.jpg"}
            width={1200}
            height={1200}
            className="object-contain"
          />
        </div>
        {/* CENTRO */}
        <div className="w-5/12 px-4 flex flex-col border-l-2">
          <p className="text-3xl text-cyan-800 font-semibold">
            {" "}
            {product.title}
          </p>
          <p>Código: #{product.id}</p>
          <p className="text-md">
            {product.category == "giftcard"
              ? `Región: ${product.region.toUpperCase()}`
              : `Cuenta: ${
                  product.accountType === "primary" ? "principal" : "secundaria"
                }`}
          </p>
          <p>
            {product.category === "game" &&
              product.console.join("-").toUpperCase()}
          </p>
          <p>Stock: {product.stock}</p>

          <p className="text-sm">Descripcion: {product.description}</p>
        </div>
        {/* DERECHA */}
        <div className="w-3/12 border-l-2 px-4 flex flex-col gap-2">
          <div className="bg-cyan-800 text-white flex flex-col gap-2 p-2">
            <p className="text-2xl">${product.price}</p>
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
            <ProductCounter maxStock={product.stock} />
            <Link href={"/carrito"}>
              <Button>Agregar al carrito</Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;
