"use client";
import React, { useState } from "react";
import Button from "../Button";
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

const SubscriptionsForm = () => {
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
      className="w-4/12 flex gap-3 flex-col p-4 rounded-sm border"
      onSubmit={handleSubmit}
    >
      <InputsRow>
        <input
          className="w-full p-2 outline-none outline-cyan-800 rounded-sm"
          name="title"
          placeholder="Titulo de la subscripción"
          type="text"
        />
      </InputsRow>
      <InputsRow>
        <select
          className="w-6/12 p-2 outline-none outline-cyan-800 rounded-sm"
          name="console"
          defaultValue={"PS4-PS5"}
        >
          <option disabled>Plataforma</option>
          <option>PS4</option>
          <option>PS5</option>
          <option>PS4-PS5</option>
        </select>
        <input
          className="w-6/12 p-2 outline-none outline-cyan-800 rounded-sm"
          name="duration"
          placeholder="Duración"
          type="text"
        />
      </InputsRow>
      <InputsRow>
        <input
          className=" w-6/12 p-2 outline-none outline-cyan-800 rounded-sm"
          name="price"
          placeholder="Precio"
          type="number"
        />
        <input
          className=" w-6/12 p-2 outline-none outline-cyan-800 rounded-sm"
          name="stock"
          placeholder="Stock"
          type="number"
          step={1}
        />
      </InputsRow>
      <InputsRow></InputsRow>
      <InputsRow>
        <input type="file" name="image" />
      </InputsRow>
      <Button>{isLoading ? "Enviando" : "Agregar"}</Button>
    </form>
  );
};

const InputsRow = ({ children }) => {
  return <div className="flex gap-3">{children}</div>;
};

export default SubscriptionsForm;
