import { products } from "@/app/globals";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/firebase/config";

const sleep = (timer) => {
  return new Promise((resolve) => setTimeout(resolve, timer));
};

const GAMES = "game";
const SUBSCRIPTION = "subscription";
const GIFTCARD = "giftcard";

const knowCategory = (c) => {
  // juegos,playstationplus,tarjetaderegalo
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

export const GET = async (request, { params }) => {
  let { category } = params;
  category = knowCategory(category);
  const databaseRef = collection(db, category);
  const querySnapshot = await getDocs(databaseRef);
  const docs = querySnapshot.docs.map((d) => {
    return { ...d.data(), id: d.id };
  });
  // const data =
  //   category == "todos"
  //     ? products
  //     : products.filter((p) => p.category == category);
  // data.forEach((p) => (p.imageUrl = "/images/generic.jpg"));
  // await sleep(1000);

  // revalidateTag("productos");
  //revalidatePath("/productos/[category]"); // usa ruta
  // return NextResponse.json({});
  return NextResponse.json(docs);
};
