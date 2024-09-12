"use client";
import React, { useState } from "react";
import Button from "../Button";
import { useParams } from "next/navigation";
import { Firebase } from "../classes/Firebase";
import { buildObject } from "@/helpers/product-builders";

const uploadProduct = async (values, category) => {
  let buildedProduct = buildObject(values, category);
  if (buildedProduct !== null) {
    await Firebase.postProductAndImage(buildedProduct)
      .then(() => {
        console.log("Todo OK amigo");
      })
      .catch((e) => console.log(e));
    return true;
  }
};

const GamesForm = ({ game }) => {
  const path = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({
    title: "",
    accountType: "",
    console: "",
    price: 0,
    stock: 0,
    description: "",
    image: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    const updatedValues = {
      title: formData.get("title"),
      accountType: formData.get("accountType"),
      console: formData.get("console"),
      price: formData.get("price"),
      stock: Number(formData.get("stock")),
      description: formData.get("description"),
      image: formData.get("image"),
    };
    setValues(updatedValues);
    console.log(updatedValues.image);
    if (updatedValues.image.size == 0) {
      console.log("No hay imagen");
    } else {
      console.log("hay imagen");
    }
    // setIsLoading(true);
    // await uploadProduct(e, path.category)
    //   .then((r) => {
    //     console.log("respuesta: ", r);
    //     setIsLoading(!r);
    //   })
    //   .catch((r) => console.log(r));
  };

  return (
    <form
      className="sm:w-8/12 lg:w-6/12 xl:w-4/12 flex gap-3 flex-col p-4 rounded-sm border"
      onSubmit={handleSubmit}
    >
      <InputsRow>
        <input
          className="w-full p-2 outline-none outline-cyan-800 rounded-sm"
          name="title"
          placeholder="Ingresa nombre del juego"
          type="text"
          required
        />
      </InputsRow>
      <InputsRow>
        <select
          className="w-6/12 p-2 outline-none outline-cyan-800 rounded-sm"
          name="accountType"
          required
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
          required
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
          className="w-6/12 p-2 outline-none outline-cyan-800 rounded-sm"
          name="price"
          placeholder="Precio"
          type="number"
          required
        />
        <input
          className="w-6/12 p-2 outline-none outline-cyan-800 rounded-sm"
          name="stock"
          placeholder="Stock"
          type="number"
          required
        />
      </InputsRow>
      <InputsRow>
        <textarea
          className="w-full p-2 outline-none outline-cyan-800 rounded-sm resize-none min-h-40"
          name="description"
          placeholder="Descripción"
          required
        ></textarea>
      </InputsRow>
      <InputsRow>
        <input
          type="file"
          name="img"
          onChange={(e) => {
            console.log(e.target.value);
          }}
        />
      </InputsRow>
      <Button>Agregar</Button>
    </form>
  );
};

const InputsRow = ({ children }) => {
  return <div className="flex gap-3 w-full">{children}</div>;
};

export default GamesForm;
