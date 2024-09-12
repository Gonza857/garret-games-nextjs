import { db } from "@/firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

const categories = ["games", "subscriptions", "giftcards"];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const GET = async () => {
  // Crea un array de promesas para obtener los productos de cada categoría
  const promises = categories.map(async (category) => {
    const databaseRef = collection(db, category);
    const querySnapshot = await getDocs(databaseRef);
    return querySnapshot.docs.map((d) => ({ ...d.data(), id: d.id }));
  });

  // Ejecuta todas las promesas en paralelo y espera a que todas se resuelvan
  const results = await Promise.all(promises);

  // Combina los resultados en un solo array
  const products = results.flat();

  // Revalida las rutas
  revalidatePath("/admin");
  revalidatePath("/");

  // Retorna los productos en formato JSON
  return NextResponse.json(products);
};
