import { db } from "@/firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

const categories = ["games", "subscriptions", "giftcards"];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const GET = async () => {
  let products = [];
  for (let category of categories) {
    const databaseRef = collection(db, category);
    const querySnapshot = await getDocs(databaseRef);
    querySnapshot.docs.forEach((d) => {
      products.push({ ...d.data(), id: d.id });
    });
  }
  // await sleep(20000);
  return NextResponse.json(products);
};
