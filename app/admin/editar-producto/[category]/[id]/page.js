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
    <div className="pt-24 border-4 border-red-600 flex justify-center">
      {params.category == "game" && <GamesForm product={product} />}
      {params.category == "subscription" && (
        <SubscriptionsForm product={product} />
      )}
      {params.category == "giftcard" && <GiftcardsForm product={product} />}
    </div>
  );
};

export default page;
