import { db } from "@/firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const ordersRef = collection(db, "orders");
    const response = await getDocs(ordersRef);
    let orders = response.docs.map((o) => {
      return {
        ...o.data(),
        id: o.id,
      };
    });

    // Revalida las rutas
    revalidatePath("/admin/ordenes");

    // Retorna los productos en formato JSON
    return NextResponse.json(orders);
  } catch (e) {
    console.error("Error fetching orders:", e);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
};
