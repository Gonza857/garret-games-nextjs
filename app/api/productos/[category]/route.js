import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/firebase/config";

export const GET = async (request, { params }) => {
  let { category } = params;
  const databaseRef = collection(db, category);
  const querySnapshot = await getDocs(databaseRef);
  const docs = querySnapshot.docs.map((d) => {
    return { ...d.data(), id: d.id };
  });
  revalidateTag("productos");
  // revalidatePath("/productos/[category]");
  return NextResponse.json(docs);
};
