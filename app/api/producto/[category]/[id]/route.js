import { products } from "@/app/globals";
import { db } from "@/firebase/config";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

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

export async function GET(req, { params }) {
  const { category, id } = params;
  let c = knowCategory(category);
  const docRef = doc(db, c, id);
  const docSnapshot = await getDoc(docRef);

  revalidatePath("/admin/editar-producto/[category]/[id]");
  revalidatePath("/producto/[category]/[id]");
  return NextResponse.json({ ...docSnapshot.data(), id: docSnapshot.id });
}
