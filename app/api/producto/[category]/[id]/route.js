import { products } from "@/app/globals";
import { db } from "@/firebase/config";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;
  const docRef = doc(db, "productos", id);
  const docSnapshot = await getDoc(docRef);
  revalidatePath("/admin/editar-producto/[category]/[id]");
  revalidatePath("/producto/[category]/[id]");
  return NextResponse.json({ ...docSnapshot.data(), id: docSnapshot.id });
}
