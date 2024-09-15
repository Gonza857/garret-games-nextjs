"use client";
import React, { useState } from "react";
import Button from "../Button";
import Swal from "sweetalert2";
import Firebase from "../classes/Firebase";

const throwAlert = () => {
  Swal.fire({
    title: "Se guardara el producto sin imagén.",
    text: "Esta acción no se puede revertir.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, establecer producto sin imágen.",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "¡Actualizado!",
        text: "Se actualizó el producto correctamente.",
        icon: "success",
      });
    }
  });
};

const getFormValues = (eTarget) => {
  let formData = new FormData(eTarget);
  return {
    title: formData.get("title"),
    accountType: formData.get("accountType"),
    console: formData.get("console").split("-"),
    price: formData.get("price"),
    stock: Number(formData.get("stock")),
    description: formData.get("description"),
    image: formData.get("image"),
    category: "game",
  };
};

const GamesForm = ({ product }) => {
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
    updatedValues.id = product.id;
    await Firebase.updateProduct(updatedValues, isImageChanged)
      .then(() => {
        setIsLoading(false);
      })
      .catch((r) => console.log(r));
  };

  return (
    <form
      className="w-full flex gap-3 p-4 rounded-sm border border-red-400"
      onSubmit={handleSubmit}
    >
      {isLoading && <h1>CARGANDO AMIGO!</h1>}
      <div className="w-4/12 p-4 flex flex-col items-center gap-2">
        <ImageHandler
          productUrl={product.image}
          state={actualImage}
          handleImageChange={handleImageChange}
          imagePreview={imagePreview}
        />
        <div className="flex gap-2">
          <ButtonHandler
            productUrl={product.image}
            state={actualImage}
            setActualImage={setActualImage}
            actualImage={actualImage}
          />
        </div>
      </div>
      <div className="w-8/12 p-4 flex flex-col gap-4">
        <InputsRow extraClasses={"flex-col"}>
          <label htmlFor="title">Titulo</label>
          <input
            className="w-full p-2 outline-none outline-cyan-800 rounded-sm"
            name="title"
            placeholder="Ingresa nombre del juego"
            type="text"
            defaultValue={product.title}
          />
        </InputsRow>
        <InputsRow extraClasses={"flex-row"}>
          <div className="flex flex-col gap-2 w-1/2">
            <label htmlFor="accountType">Tipo de cuenta</label>
            <select
              className="w-full p-2 outline-none outline-cyan-800 rounded-sm"
              name="accountType"
              defaultValue={product.accountTyoe}
            >
              <option disabled>Tipo de cuenta</option>
              <option>Primaria</option>
              <option>Secundaria</option>
              <option>-</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 w-1/2">
            <label htmlFor="console">Consola</label>
            <select
              className="w-full p-2 outline-none outline-cyan-800 rounded-sm"
              name="console"
              defaultValue={product.console.join("-")}
            >
              <option disabled>Plataforma</option>
              <option>PS3</option>
              <option>PS4</option>
              <option>PS5</option>
              <option>PS4-PS5</option>
            </select>
          </div>
        </InputsRow>
        <InputsRow>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="price">Precio</label>
            <input
              className="w-full p-2 outline-none outline-cyan-800 rounded-sm"
              name="price"
              placeholder="Precio"
              type="number"
              defaultValue={product.price}
              step={1}
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="stock">Stock</label>
            <input
              className="w-full p-2 outline-none outline-cyan-800 rounded-sm"
              name="stock"
              placeholder="Stock"
              type="number"
              defaultValue={product.stock}
            />
          </div>
        </InputsRow>
        <InputsRow>
          <textarea
            className="w-full p-2 outline-none outline-cyan-800 rounded-sm resize-none min-h-40"
            name="description"
            defaultValue={product.description}
          ></textarea>
        </InputsRow>
        <Button>Guardar cambios realizados</Button>
      </div>
    </form>
  );
};

const ImageHandler = ({
  productUrl,
  state,
  handleImageChange,
  imagePreview,
}) => {
  if (state == "update") {
    return <input type="file" name="image" onChange={handleImageChange} />;
  } else if (state == productUrl) {
    return <img src={productUrl} />;
  } else if (state == "") {
    return <img src={"/images/no-image.jpg"} />;
  } else if ((state = "new uploaded")) {
    return <img src={imagePreview} />;
  }
};

const ButtonHandler = ({ productUrl, state, setActualImage, actualImage }) => {
  if (state == productUrl || state == "new uploaded") {
    return (
      <>
        <Button type={"button"} onClick={() => setActualImage("update")}>
          Actualizar
        </Button>
        <Button type={"button"} onClick={() => setActualImage("")}>
          Eliminar
        </Button>
      </>
    );
  } else if (state == "update") {
    return (
      <Button
        type={"button"}
        onClick={() => {
          if (actualImage == "new uploaded") {
            setActualImage("uploaded");
          }
        }}
      >
        Guardar imágen
      </Button>
    );
  } else if (state == "") {
    return (
      <Button type={"button"} onClick={() => setActualImage("update")}>
        Cargar imágen
      </Button>
    );
  }
};

const InputsRow = ({ children, extraClasses }) => {
  return <div className={`flex gap-2 ${extraClasses}`}>{children}</div>;
};

export default GamesForm;
