"use client";
import React, { useState } from "react";
import Button from "../UI/Button";
import { useParams } from "next/navigation";
import Firebase from "../classes/Firebase";
import { buildObject } from "@/helpers/product-builders";

const uploadProduct = async (values, isUsingImage) => {
  await Firebase.postProductAndImage(values, isUsingImage)
    .then(() => {
      console.log("Todo OK amigo");
    })
    .catch((e) => console.log(e));
  return true;
};

const getDataForm = (eTarget, category) => {
  let n = new FormData(eTarget);
  return buildObject(n, category);
};

const GiftcardsForm = () => {
  const path = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let isUsingImage = false;
    let formData = getDataForm(e.target, path.category);
    if (formData.image != null) isUsingImage = true;
    await uploadProduct(formData, isUsingImage)
      .then((r) => {
        setIsLoading(!r);
      })
      .catch((r) => console.log(r));
  };

  return (
    <form
      className="ww-full sm:w-8/12 lg:w-6/12 xl:w-4/12 flex gap-3 flex-col p-4 rounded-sm border"
      onSubmit={handleSubmit}
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
        <input type="file" name="image" className="w-full" />
      </InputsRow>
      <Button>{isLoading ? "Enviando" : "Agregar"}</Button>
    </form>
  );
};

const InputsRow = ({ children }) => {
  return <div className="flex gap-3">{children}</div>;
};

export default GiftcardsForm;
