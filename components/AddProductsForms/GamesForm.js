"use client";
import React, { useState } from "react";
import Button from "../Button";
import { uploadProduct } from "@/helpers/actions";
import { useParams } from "next/navigation";

const GamesForm = ({ game }) => {
  const path = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    setIsLoading(true);
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
        />
      </InputsRow>
      <InputsRow>
        <select
          className="w-6/12 p-2 outline-none outline-cyan-800 rounded-sm"
          name="accountType"
          defaultValue={"Primaria"}
        >
          <option disabled>Tipo de cuenta</option>
          <option>Primaria</option>
          <option>Secundaria</option>
          <option>-</option>
        </select>
        <select
          className="w-6/12 p-2 outline-none outline-cyan-800 rounded-sm"
          name="console"
          defaultValue={"PS4-PS5"}
        >
          <option disabled>Plataforma</option>
          <option>PS3</option>
          <option>PS4</option>
          <option>PS5</option>
          <option>PS4-PS5</option>
        </select>
      </InputsRow>
      <InputsRow>
        <input
          className="p-2 outline-none outline-cyan-800 rounded-sm"
          name="price"
          placeholder="Precio"
          type="number"
        />
        <input
          className="p-2 outline-none outline-cyan-800 rounded-sm"
          name="stock"
          placeholder="Stock"
          type="number"
        />
      </InputsRow>
      <InputsRow>
        <textarea
          className="w-full p-2 outline-none outline-cyan-800 rounded-sm resize-none min-h-40"
          name="description"
          value={"abcdefghijklmnopqrstuvwxyz"}
        ></textarea>
      </InputsRow>
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

export default GamesForm;
