"use client";
import React, { useEffect, useState } from "react";
import ProductCounter from "../ProductCounter";
import Link from "next/link";
import Button from "../Button";
import { useCartContext } from "../context/CartContext";
import { toastSuccess } from "@/helpers/toasts";

const QuantityHandler = ({ item, buttonVisibility = true }) => {
  const { addToCart, cart, getCartItem } = useCartContext();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [thisItemOnCart, setThisItemOnCart] = useState({});
  const [thisItem, setThisItem] = useState({});

  useEffect(() => {
    if (getCartItem(item) != undefined) {
      setThisItem(getCartItem(item));
    } else {
      setThisItem(item);
    }
    console.log("Cambie el producto");
    console.log(item);
  }, [cart]);

  const handleAdd = () => {
    toastSuccess(`Agregaste ${selectedQuantity} unidades al carrito.`);
    addToCart({ ...item, quantity: selectedQuantity });
  };

  return (
    <>
      <HandleCounterDesign
        thisItem={thisItem}
        tope={item.stock}
        selectedQuantity={selectedQuantity}
        setSelectedQuantity={setSelectedQuantity}
        data={item}
        buttonVisibility={buttonVisibility}
        handleAdd={handleAdd}
      />
    </>
  );
};

const HandleCounterDesign = ({
  thisItem,
  tope,
  selectedQuantity,
  setSelectedQuantity,
  data,
  buttonVisibility,
  handleAdd,
}) => {
  if (!buttonVisibility && thisItem.quantity <= thisItem.stock) {
    // return <p className="text-sm">{thisItem.quantity}</p>;
    return (
      <ProductCounter
        tope={tope}
        selectedQuantity={thisItem.quantity}
        data={data}
        setSelectedQuantity={setSelectedQuantity}
        buttonVisibility={false}
      />
    );
  } else if (thisItem.quantity == thisItem.stock) {
    return (
      <>
        <p className="text-sm">No hay más productos disponibles</p>
        <Link href={"/carrito"}>
          <Button>Ver carrito</Button>
        </Link>
      </>
    );
  } else if (buttonVisibility) {
    return (
      <>
        <ProductCounter
          tope={tope}
          selectedQuantity={selectedQuantity}
          data={data}
          setSelectedQuantity={setSelectedQuantity}
          buttonVisibility={buttonVisibility}
        />
        <Button onClick={handleAdd}>Agregar al carrito</Button>
      </>
    );
  }
};

export default QuantityHandler;
