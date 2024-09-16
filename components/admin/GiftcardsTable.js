"use client";
import React, { useState } from "react";
import { FaEye, FaPen, FaTrash } from "react-icons/fa";
import Button from "../UI/Button";
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
    slug: "REGIÓN",
    width: "lg:w-2/12 hidden lg:table-cell",
  },
  {
    slug: "VALOR",
    width: "lg:w-1/12 hidden lg:table-cell",
  },
  {
    slug: "ACCIÓN",
    width: "w-5/12 lg:w-2/12",
  },
];

const GiftcardsTable = ({ giftcards, handleDeleteProduct }) => {
  const [open, setOpen] = useState(false);
  const [productToView, setProductToView] = useState({});

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <TableHead />
        <tbody className="text-gray-700">
          {giftcards.map((s) => {
            return (
              <StyledGiftCardRow
                key={s.id}
                s={s}
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
        <p>Región: {productToView.region}</p>
        <p>Valor: {productToView.value}</p>
        <p>
          Imágen:{" "}
          {productToView.image == null ? "No establecida" : "Establecida"}
        </p>
      </Modal>
    </>
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

const StyledGiftCardRow = ({
  s,
  handleDeleteProduct,
  setOpen,
  setProductToView,
}) => {
  return (
    <tr className="bg-gray-100">
      <StyledTd hideOnResponsive={true}>{s.id}</StyledTd>
      <StyledTd>{s.title}</StyledTd>
      <StyledTd>${s.price}</StyledTd>
      <StyledTd hideOnResponsive={true}>{s.stock}</StyledTd>
      <StyledTd hideOnResponsive={true}>{s.region}</StyledTd>
      <StyledTd hideOnResponsive={true}>${s.value}</StyledTd>
      <td className="py-3 px-4 text-center gap-1 lg:gap-4">
        <div className="h-full flex flex-wrap gap-1 items-center">
          <Button onClick={async () => await handleDeleteProduct(s)}>
            <FaTrash />
          </Button>
          <Link href={`/admin/editar-producto/${s.category}/${s.id}`}>
            <Button>
              <FaPen />
            </Button>
          </Link>
          <div
            className=""
            onClick={() => {
              setOpen(true);
              setProductToView(s);
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

const TableHead = () => {
  return (
    <thead className="bg-gray-800 text-white">
      <tr>
        {headers.map((e) => (
          <StyledHeaderRow e={e} key={`${e.slug}${e.width}`} />
        ))}
      </tr>
    </thead>
  );
};

const StyledHeaderRow = ({ e }) => {
  return (
    <th
      className={`${e.width} py-3 px-4 uppercase font-semibold text-sm text-center`}
    >
      {e.slug}
    </th>
  );
};

export default GiftcardsTable;
