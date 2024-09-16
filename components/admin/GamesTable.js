"use client";
import React, { useState } from "react";
import Button from "../UI/Button";
import { FaEye, FaPen, FaTrash } from "react-icons/fa";
import Link from "next/link";
import Modal from "../UI/Modal";

const headers = [
  {
    slug: "SKU",
    width: "lg:w-2/12 hidden lg:table-cell",
  },
  {
    slug: "TITULO",
    width: "w-5/12 lg:w-3/12",
  },
  {
    slug: "PRECIO",
    width: "w-2/12 lg:w-1/12",
  },
  {
    slug: "STOCK",
    width: "lg:w-1/12 hidden lg:table-cell",
  },
  {
    slug: "TIPO",
    width: "lg:w-2/12 hidden lg:table-cell",
  },
  {
    slug: "CONSOLA",
    width: "lg:w-1/12 hidden lg:table-cell",
  },
  {
    slug: "ACCIÓN",
    width: "w-5/12 lg:w-2/12",
  },
];

const GamesTable = ({ games, handleDeleteProduct }) => {
  const [open, setOpen] = useState(false);
  const [productToView, setProductToView] = useState({});

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            {headers.map((e) => (
              <th
                key={`${e.slug}${e.width}`}
                className={`${e.width} py-3 px-4 uppercase font-semibold text-sm text-center`}
              >
                {e.slug}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {games.map((game) => {
            return (
              <StyledGameRow
                key={game.id}
                game={game}
                handleDeleteProduct={handleDeleteProduct}
                setOpen={setOpen}
                setProductToView={setProductToView}
              />
            );
          })}
        </tbody>
      </table>
      <Modal onClose={onClose} open={open}>
        <p>ID: {productToView.id}</p>
        <p>Titulo: {productToView.title}</p>
        <p>Precio: ${productToView.price}</p>
        <p>Stock: {productToView.stock}</p>
        <p>Cuenta: {productToView.accountType}</p>
        <p>Consola/s: {productToView.console?.join("/")}</p>
        <p>
          Imágen:{" "}
          {productToView.image == null ? "No establecida" : "Establecida"}
        </p>
      </Modal>
    </>
  );
};

const StyledGameRow = ({
  game,
  handleDeleteProduct,
  setOpen,
  setProductToView,
}) => {
  return (
    <tr className="bg-gray-100">
      <StyledTd hideOnResponsive={true}>{game.id}</StyledTd>
      <StyledTd>{game.title}</StyledTd>
      <StyledTd>${game.price}</StyledTd>
      <StyledTd hideOnResponsive={true}>{game.stock}</StyledTd>
      <StyledTd hideOnResponsive={true}>{game.accountType}</StyledTd>
      <StyledTd hideOnResponsive={true}>{game.console.join("-")}</StyledTd>
      <td className="py-3 px-4 text-center gap-1 lg:gap-4">
        <div className="h-full flex flex-wrap gap-1 items-center">
          <Button onClick={async () => await handleDeleteProduct(game)}>
            <FaTrash />
          </Button>
          <Link href={`/admin/editar-producto/${game.category}/${game.id}`}>
            <Button>
              <FaPen />
            </Button>
          </Link>
          <div
            className=""
            onClick={() => {
              setOpen(true);
              setProductToView(game);
            }}
          >
            <Button>
              <FaEye />
            </Button>
          </div>
        </div>
      </td>
    </tr>
  );
};

const StyledTd = ({
  children,
  extraClasses = "",
  hideOnResponsive = false,
}) => {
  return (
    <td
      className={`py-1 px-2 md:py-3 md:px-4 text-center ${
        hideOnResponsive ? "hidden lg:table-cell" : "text-sm lg:text-normal"
      } ${extraClasses}`}
    >
      {children}
    </td>
  );
};

export default GamesTable;
