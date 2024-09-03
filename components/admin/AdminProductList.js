import React, { Suspense } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "@/firebase/config";
import SubscriptionsTable from "./SubscriptionsTable";
import GamesTable from "./GamesTable";
import GiftcardsForm from "../AddProductsForms/GiftcardsForm";
import GiftcardsTable from "./GiftcardsTable";
import { deleteObject, ref } from "firebase/storage";

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

const deleteProductImage = async (id, category) => {
  let aux = false;
  const desertRef = ref(storage, `${knowCategory(category)}/${id}`);
  deleteObject(desertRef).then(() => {
    aux = true;
  });
  return aux;
};

async function handleDeleteProduct(product) {
  "use server";
  console.log("eliminando", product.id);
  let c = knowCategory(product.category);
  await deleteDoc(doc(db, c, product.id))
    .then(() => {
      console.log("Eliminé producto");
      deleteProductImage(product.image.id, product.category)
        .then(() => {
          console.log("Eliminé imagen");
        })
        .catch((e) => console.log(e.message));
    })
    .catch((e) => {
      console.log(e.message);
    });
}

const AdminProductList = async () => {
  const response = await fetch("http://localhost:3000/api/productos", {
    cache: "no-store",
  }).then((r) => r.json());

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
