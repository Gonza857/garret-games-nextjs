import GamesForm from "@/components/AddProductsForms/GamesForm";
import GiftcardsForm from "@/components/AddProductsForms/GiftcardsForm";
import SubscriptionsForm from "@/components/AddProductsForms/SubscriptionsForm";
import React from "react";

const page = ({ params }) => {
  return (
    <main className="w-full min-h-screen pt-24 flex flex-col items-center">
      {params.category == "game" && (
        <h3 className="font-semibold mx-auto w-fit pb-4 text-lg md:pb-4">
          Agregar juego
        </h3>
      )}
      {params.category == "subscription" && (
        <h3 className="font-semibold mx-auto w-fit pb-4 text-lg md:pb-4">
          Agregar PlayStation Plus
        </h3>
      )}
      {params.category == "giftcard" && (
        <h3 className="font-semibold mx-auto w-fit pb-4 text-lg md:pb-4">
          Agregar tarjeta de regalo
        </h3>
      )}
      {params.category == "game" && <GamesForm />}
      {params.category == "subscription" && <SubscriptionsForm />}
      {params.category == "giftcard" && <GiftcardsForm />}
    </main>
  );
};

export default page;
