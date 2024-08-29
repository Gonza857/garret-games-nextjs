"use client";
import React, { useState } from "react";
import Button from "../Button";
import { uploadProduct } from "@/helpers/actions";
import { useParams } from "next/navigation";

const GiftcardsForm = () => {
  const path = useParams();
  console.log(path);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    setIsLoading(true);
    console.log(e.get("img"));
    await uploadProduct(e, path.category)
      .then((r) => {
        console.log("respuesta: ", r);
        setIsLoading(!r);
      })
      .catch((r) => console.log(r));
  };

  return (
    <form
      className="w-4/12 flex gap-3 flex-col p-4 rounded-sm border"
      action={handleSubmit}
    >
      <InputsRow>
        <input
          className="w-full p-2 outline-none outline-cyan-800 rounded-sm"
          name="title"
          placeholder="Ingresa nombre del juego"
          type="text"
          value={"Steam Wallet Gift Card $5 USD"}
        />
      </InputsRow>
      <InputsRow>
        <select
          className="w-6/12 p-2 outline-none outline-cyan-800 rounded-sm"
          name="region"
          defaultValue={"ARG/USA"}
        >
          <option disabled selected>
            Región
          </option>
          <option>ARG/USA</option>
          <option>USA</option>
          <option>ARG</option>
        </select>
        <input
          className="w-6/12 p-2 outline-none outline-cyan-800 rounded-sm"
          name="value"
          placeholder="Valor"
          type="text"
          value={"5"}
        />
      </InputsRow>
      <InputsRow>
        <input
          className=" w-6/12 p-2 outline-none outline-cyan-800 rounded-sm"
          name="price"
          placeholder="Precio"
          type="number"
          value={50.99}
        />
        <input
          className=" w-6/12 p-2 outline-none outline-cyan-800 rounded-sm"
          name="stock"
          placeholder="Stock"
          type="number"
          value={8}
        />
      </InputsRow>
      <InputsRow></InputsRow>
      <InputsRow>
        <input type="file" name="img" />
      </InputsRow>
      <Button>Agregar</Button>
    </form>
  );
};

const InputsRow = ({ children }) => {
  return <div className="flex gap-3">{children}</div>;
};

export default GiftcardsForm;
