import { products } from "@/app/globals";
import { db } from "@/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

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

const sleep = (timer) => {
  return new Promise((resolve) => setTimeout(resolve, timer));
};

export async function GET(req, { params }) {
  const { category, id } = params;
  let c = knowCategory(category);
  const docRef = doc(db, c, id);
  const docSnapshot = await getDoc(docRef);
  return NextResponse.json({ ...docSnapshot.data(), id: docSnapshot.id });
  // await sleep(1000);
  // return NextResponse.json(products.find((p) => p.id == params.id));
  // return NextResponse.json({});
}
