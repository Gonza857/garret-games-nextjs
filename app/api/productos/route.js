import { db } from "@/firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

const categories = ["games", "subscriptions", "giftcards"];

export const GET = async () => {
  let products = [];
  for (let category of categories) {
    const databaseRef = collection(db, category);
    const querySnapshot = await getDocs(databaseRef);
    querySnapshot.docs.forEach((d) => {
      products.push({ ...d.data(), id: d.id });
    });
  }
  return NextResponse.json(products);
};
