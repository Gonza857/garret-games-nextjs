import React, { Suspense } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "@/firebase/config";
import SubscriptionsTable from "./SubscriptionsTable";
import GamesTable from "./GamesTable";
import GiftcardsForm from "../AddProductsForms/GiftcardsForm";
import GiftcardsTable from "./GiftcardsTable";
import { deleteObject, ref } from "firebase/storage";
import { toastSuccess } from "@/helpers/toasts";

const GAMES = "game";
const SUBSCRIPTION = "subscription";
const GIFTCARD = "giftcard";

const knowCategory = (c) => {
  switch (c) {
    case GAMES:
      return "games";
    case SUBSCRIPTION:
      return "subscriptions";
    case GIFTCARD:
      return "giftcards";
    default:
      return "todos";
  }
};

const deleteProductImage = async (id) => {
  let aux = false;
  const desertRef = ref(storage, `productos/${id}`);
  deleteObject(desertRef).then(() => {
    aux = true;
  });
  return aux;
};

async function handleDeleteProduct(product) {
  "use server";
  await deleteDoc(doc(db, "productos", product.id))
    .then(() => {
      deleteProductImage(product.id, product.category)
        .then(() => {
          toastSuccess("Producto eliminado correctamente");
        })
        .catch((e) => console.error(e.message));
    })
    .catch((e) => {
      console.error(e.message);
    });
}

const getProducts = async () => {
  let baseUrl = process.env.VERCEL_URL
    ? `http://${process.env.VERCEL_URL}`
    : "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/productos`, {
    cache: "no-store",
  }).then((r) => r.json());
  return response;
};

const AdminProductList = async () => {
  const response = await getProducts();

  let games = response.filter((p) => p.category == "game");
  let subscriptions = response.filter((p) => p.category == "subscription");
  let giftcards = response.filter((p) => p.category == "giftcard");

  return (
    <div className="text-black flex flex-col gap-4 w-full">
      <h3 className="text-2xl text-white text-center">Juegos</h3>
      <GamesTable games={games} handleDeleteProduct={handleDeleteProduct} />

      <h3 className="text-2xl text-white text-center">PlayStation Plus</h3>
      <SubscriptionsTable
        subscriptions={subscriptions}
        handleDeleteProduct={handleDeleteProduct}
      />
      <h3 className="text-2xl text-white text-center">Tarjetas de regalo</h3>
      <GiftcardsTable
        giftcards={giftcards}
        handleDeleteProduct={handleDeleteProduct}
      />
    </div>
  );
};

export default AdminProductList;
