"use client";
import React from "react";
import { useCartContext } from "./context/CartContext";
import { toastSuccess, toastWarn } from "@/helpers/toasts";
import Swal from "sweetalert2";

const alertToDelete = (funcion, data) => {
  Swal.fire({
    title: "Se eliminará producto del carrito.",
    text: "Esta acción no se puede deshacer.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      funcion(data);
      Swal.fire({
        title: "¡Eliminado!",
        text: "Producto/s eliminados del carrito.",
        icon: "success",
      });
    }
  });
};

const ProductCounter = ({
  tope,
  data,
  selectedQuantity,
  setSelectedQuantity,
  buttonVisibility,
}) => {
  const { addToCart, removeSingleUnitFromCart } = useCartContext();

  const addQuantity = () => {
    if (selectedQuantity == tope) {
      toastWarn("No podes llevar más de lo que hay.");
      return;
    }
    if (!buttonVisibility) {
      // VISTA CART
      addToCart({ ...data, quantity: 1 }, false);
      setSelectedQuantity(selectedQuantity + 1);
    } else {
      // VISTA DETAIL
      setSelectedQuantity(selectedQuantity + 1);
    }
  };

  const substractQuantity = () => {
    if (selectedQuantity == 1 && !buttonVisibility) {
      alertToDelete(removeSingleUnitFromCart, data);
    } else {
      if (!buttonVisibility) {
        removeSingleUnitFromCart(data);
        setSelectedQuantity(selectedQuantity - 1);
      } else {
        setSelectedQuantity(selectedQuantity - 1);
      }
    }
  };

  return (
    <div className="flex border rounded overflow-hidden w-fit">
      <div
        className="bg-cyan-800 w-4 flex items-center justify-center h-8 p-4 cursor-pointer text-white select-none hover:bg-cyan-700"
        onClick={() => substractQuantity()}
      >
        -
      </div>
      <div className="w-12 flex items-center justify-center h-8 p-4">
        {selectedQuantity}
      </div>
      <div
        className="bg-cyan-800 w-4 flex items-center justify-center h-8 p-4 cursor-pointer text-white select-none hover:bg-cyan-700"
        onClick={() => addQuantity()}
      >
        +
      </div>
    </div>
  );
};

export default ProductCounter;
