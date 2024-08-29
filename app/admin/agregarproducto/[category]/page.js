import GamesForm from "@/components/AddProductsForms/GamesForm";
import GiftcardsForm from "@/components/AddProductsForms/GiftcardsForm";
import SubscriptionsForm from "@/components/AddProductsForms/SubscriptionsForm";
import React from "react";

const page = ({ params }) => {
  return (
    <div className="pt-24 border-4 border-red-600 flex justify-center">
      {params.category == "game" && <GamesForm />}
      {params.category == "subscription" && <SubscriptionsForm />}
      {params.category == "giftcard" && <GiftcardsForm />}
    </div>
  );
};

export default page;
