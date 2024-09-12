"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
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

const toastError = (message) => {
  toast.error(message, {
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

  useEffect(() => {
    console.log("cart actualizado");
  }, [cart]);

  const addToCart = (item, isFromDetailView = true) => {
    // let existsOnCart = alreadyExistsOnCart(item);
    // let canBuyMore = canAddMoreUnits(item);

    let cartItem = getCartItem(item);

    if (cartItem !== undefined) {
      if (cartItem.stock - cartItem.quantity > 0) {
        console.log(`Stock: ${cartItem.stock}`);
        console.log(`En carrito:: ${cartItem.quantity}`);
        console.log(`Restan: ${cartItem.stock - cartItem.quantity}`);
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
        console.log("te queres llevar más y podes tranqui");
      }
    } else {
      setTotal(total + item.quantity * item.price);
      setCart([...cart, item]);
    }

    // if (alreadyExistsOnCart(item)) {
    //   if (canAddMoreUnits(item.id)) {
    //
    //   } else {
    //     toastError("No podes llevar más de las que hay");
    //   }
    // } else {
    //   setTotal(total + item.quantity * item.price);
    //   setCart([...cart, item]);
    // }
    // if (isFromDetailView)
    //   toastSuccess(
    //     `Se añadió ${item.quantity} unidad/es del producto al carrito correctamente`
    //   );
  };

  const canAddMoreUnits = (item) => {
    let canAdd = false;
    let buscado = getCartItem(item);
    console.log("me llega el item:");
    console.log(buscado);
    if (buscado != undefined) {
      if (buscado.quantity <= buscado.stock) {
        canAdd = true;
      }
    }
    return canAdd;
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
    getCartItem,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
