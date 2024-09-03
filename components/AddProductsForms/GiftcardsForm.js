"use client";
import React, { useState } from "react";
import Button from "../Button";
import { uploadProduct } from "@/helpers/actions";
import { useParams } from "next/navigation";

const GiftcardsForm = () => {
  const path = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    setIsLoading(true);
    await uploadProduct(e, path.category)
      .then((r) => {
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
          placeholder="Titulo de la tarjeta de regalo"
          type="text"
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
        />
      </InputsRow>
      <InputsRow>
        <input
          className=" w-6/12 p-2 outline-none outline-cyan-800 rounded-sm"
          name="price"
          placeholder="Precio"
          type="number"
          step={1}
        />
        <input
          className=" w-6/12 p-2 outline-none outline-cyan-800 rounded-sm"
          name="stock"
          placeholder="Stock"
          type="number"
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
