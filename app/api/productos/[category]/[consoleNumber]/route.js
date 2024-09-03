import { db } from "@/firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  let { category, consoleNumber } = params;
  const databaseRef = collection(db, category);
  const querySnapshot = await getDocs(databaseRef);
  const docs = querySnapshot.docs.map((d) => {
    return { ...d.data(), id: d.id };
  });
  let filteredResult = docs.filter((j) =>
    j.console.includes(consoleNumber.toUpperCase())
  );

  revalidateTag("consoles");
  // revalidatePath("/productos/[category]");
  return NextResponse.json(filteredResult);
};
