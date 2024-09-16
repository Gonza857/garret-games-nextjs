import { db } from "@/firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const databaseRef = collection(db, "productos");
    const querySnapshot = await getDocs(databaseRef);
    let result = querySnapshot.docs.map((d) => ({ ...d.data(), id: d.id }));
    revalidatePath("/admin");
    revalidatePath("/");
    return NextResponse.json(result);
  } catch (e) {
    console.error("Error fetching products:", e);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
};
