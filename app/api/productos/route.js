import { db } from "@/firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

const sleep = (timer) => {
  return new Promise((resolve) => setTimeout(resolve, timer));
};

const categories = ["games", "subscriptions", "giftcards"];

export const GET = async () => {
  console.log("Trayendo todos amigo");
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
