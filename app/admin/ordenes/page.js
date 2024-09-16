import OrdersTable from "@/components/Orders/Table";
import React from "react";

export const dynamic = "force-dynamic";

const AdminOrders = async () => {
  let baseUrl = process.env.VERCEL_URL
    ? `http://${process.env.VERCEL_URL}`
    : "http://localhost:3000";
  const orders = await fetch(`${baseUrl}/api/ordenes`, {
    cache: "no-store",
  }).then((r) => r.json());

  return (
    <main className="w-full min-h-screen pt-20 flex justify-center">
      <div className="w-full sm:w-11/12 md:w-10/12 lg:w-8/12 xl:w-6/12">
        <OrdersTable orders={orders} />
      </div>
    </main>
  );
};

export default AdminOrders;
