"use client";
import React, { createContext, useContext, useState } from "react";
import { Bounce, toast } from "react-toastify";

const toastSuccess = (message) => {
  toast.success(message, {
    position: "top-center",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
  });
};

const CartContext = createContext();

export const useCartContext = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const addToCart = (item) => {
    if (alreadyExistsOnCart(item)) {
      setCart(
        [...cart].map((p) => {
          if (p.id == item.id) {
            p.quantity += item.quantity;
          }
          return p;
        })
      );
      setTotal(total + item.quantity * item.price);
    } else {
      setTotal(total + item.quantity * item.price);
      setCart([...cart, item]);
    }
    toastSuccess("Añadido al carrito correctamente");
  };

  const alreadyExistsOnCart = (item) => {
    if (cart.find((i) => i.id == item.id)) return true;
  };
  const getCartItem = (item) => {
    return [...cart].find((i) => i.id == item.id);
  };

  const getItemIndex = (item) => {
    return [...cart].findIndex((i) => i.id == item.id);
  };

  const removeProductFromCart = (product) => {
    setTotal(total - product.price * 1);
    let item = getCartItem(product);
    let itemIndex = getItemIndex(product);
    let copyCart = [...cart];
    copyCart.splice(itemIndex, 1);
    return copyCart;
  };

  const substractSingleUnitFromItemOfCart = (item) => {
    setTotal(total - item.price * 1);
    return [...cart].map((p) => {
      if (p.id == item.id) return { ...p, quantity: p.quantity - 1 };
    });
  };

  const removeSingleUnitFromCart = (item) => {
    if (cart.find((i) => i.id == item.id) !== undefined) {
      if (item.quantity == 1) {
        setCart(removeProductFromCart(item));
        toastSuccess("Se eliminó el producto correctamante");
      } else {
        setCart(substractSingleUnitFromItemOfCart(item));
      }
    }
  };

  const isCartEmpty = () => {
    if (cart.length === 0) return true;
    return false;
  };

  const value = {
    addToCart,
    cart,
    total,
    removeSingleUnitFromCart,
    isCartEmpty,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
