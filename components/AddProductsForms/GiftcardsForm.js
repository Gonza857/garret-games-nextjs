"use client";
import React, { useState } from "react";
import Button from "../Button";
import { uploadProduct } from "@/actions/actions";
import { useParams } from "next/navigation";

const GiftcardsForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [actualImage, setActualImage] = useState(product.image || "");
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Asigna la imagen leída como preview
        setActualImage("new uploaded");
      };
      reader.readAsDataURL(file); // Lee el archivo como una URL de datos
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let updatedValues = getFormValues(e.target);
    let isImageChanged = false;
    if (actualImage == product.image) {
      // console.log("No la cambió");
      updatedValues.image = product.image;
    } else if (actualImage == "new uploaded") {
      // console.log("no es la misma, la actualizamos");
      isImageChanged = true;
      updatedValues.image = imagePreview;
    } else if (actualImage == "") {
      // console.log("la borramos y dejamos una por defecto");
      throwAlert();
    }
    updatedValues.category = product.category;
    updatedValues.id = product.id;
    updatedValues.console = updatedValues.console.split("-");
    await Firebase.postProductAndImage(updatedValues, isImageChanged)
      .then((r) => {
        setIsLoading(false);
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
