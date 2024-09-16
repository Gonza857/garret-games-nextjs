"use client";
import Button from "@/components/UI/Button";
import Firebase from "@/components/classes/Firebase";
import { useCartContext } from "@/components/context/CartContext";
import { useRouter } from "next/navigation";
import React from "react";
import Swal from "sweetalert2";

const successModal = (orderNumber) => {
  return Swal.fire({
    title: "Orden realizada correctamente.",
    text: `Tu número de orden es ${orderNumber}`,
    icon: "success",
    confirmButtonText: "Volver a inicio",
  });
};

const warnModal = () => {
  return Swal.fire({
    title: "Hay productos sin stock, intentalo nuevamente",
    icon: "warning",
    confirmButtonText: "Volver a inicio",
  });
};

const getFormdata = (eTarget, total, items) => {
  let c = new FormData(eTarget);
  return {
    user: {
      email: c.get("email"),
      fullname: c.get("fullname"),
      phone: c.get("phone"),
    },
    total: total,
    items: items,
  };
};

const Orden = () => {
  const { total, cart, emptyCart } = useCartContext();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = getFormdata(e.target, total, [...cart]);
    Firebase.makeOrder(formData)
      .then((r) => {
        if (r.length > 16) {
          successModal(r).then(() => {
            emptyCart();
            router.replace("/");
          });
        } else {
          warnModal().then(() => {
            router.replace("/");
          });
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <main className="min-h-screen w-full pt-14 flex justify-center items-center">
      <form
        className="w-11/12 sm:w-8/12 md:w-5/12 lg:w-4/12 xl:w-3/12 flex flex-col gap-4 p-4 border rounded"
        onSubmit={handleSubmit}
      >
        <caption className="text-2xl">Realizar orden</caption>
        <input
          className="w-full p-2 outline-none outline-cyan-800 rounded-sm text-neutral-400"
          name="email"
          placeholder="Correo electrónico"
          type="email"
        />
        <input
          className="w-full p-2 outline-none outline-cyan-800 rounded-sm text-neutral-400"
          name="fullname"
          placeholder="Nombre completo"
          type="text"
        />
        <input
          className="w-full p-2 outline-none outline-cyan-800 rounded-sm text-neutral-400"
          name="phone"
          placeholder="+54 9 11 2020-2020"
          type="text"
        />
        <div className="flex justify-between px-4">
          <p>Productos: {cart.length}</p>
          <p>Total: ${total}</p>
        </div>
        <Button>Realizar pedido</Button>
      </form>
    </main>
  );
};

export default Orden;
