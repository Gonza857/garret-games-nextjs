import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/config";
import { getProductCategory } from "@/helpers/categories";

export const GET = async (request, { params }) => {
  try {
    let { category } = params;
    let c = getProductCategory(category);
    const databaseRef = collection(db, "productos");
    const q = query(databaseRef, where("category", "==", c));
    const querySnapshot = await getDocs(q);
    const docs = querySnapshot.docs.map((d) => {
      return { ...d.data(), id: d.id };
    });
    revalidatePath("/productos/[category]");
    return NextResponse.json(docs);
  } catch (e) {
    console.error("Error fetching products:", e);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
};
