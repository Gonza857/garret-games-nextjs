import GamesForm from "@/components/EditProductsForms/GamesForm";
import GiftcardsForm from "@/components/EditProductsForms/GiftcardsForm";
import SubscriptionsForm from "@/components/EditProductsForms/SubscriptionsForm";
import React from "react";

const getSingleProduct = async (id, category) => {
  return await fetch(`http://localhost:3000/api/producto/${category}/${id}`, {
    cache: "no-store",
  }).then((r) => r.json());
};

const page = async ({ params }) => {
  const id = params.id;
  const category = params.category;
  const product = await getSingleProduct(id, category);
  return (
    <main className="pt-24 border-4 border-red-600 flex justify-center min-h-screen">
      <div className="w-2/12 border-8"></div>
      <div className="w-10/12 border-8 p-4 flex justify-center">
        {params.category == "game" && <GamesForm product={product} />}
        {params.category == "subscription" && (
          <SubscriptionsForm product={product} />
        )}
        {params.category == "giftcard" && <GiftcardsForm product={product} />}
      </div>
    </main>
  );
};

export default page;
