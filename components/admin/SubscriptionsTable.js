"use client";
import React, { useState } from "react";
import { FaEye, FaPen, FaTrash } from "react-icons/fa";
import Link from "next/link";
import Button from "../UI/Button";
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
    slug: "DURACIÓN",
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

const SubscriptionsTable = ({ subscriptions, handleDeleteProduct }) => {
  const [open, setOpen] = useState(false);
  const [productToView, setProductToView] = useState({});

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      {" "}
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
          {subscriptions.map((s) => {
            return (
              <StyledSubscriptionRow
                key={s.id}
                item={s}
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
        <p>Duración: {productToView.duration}</p>
        <p>Consola: {productToView.console?.join("/")}</p>
        <p>
          Imágen:{" "}
          {productToView.image == null ? "No establecida" : "Establecida"}
        </p>
      </Modal>
    </>
  );
};

const StyledSubscriptionRow = ({
  item,
  handleDeleteProduct,
  setOpen,
  setProductToView,
}) => {
  return (
    <tr className="bg-gray-100">
      <StyledTd hideOnResponsive={true}>{item.id}</StyledTd>
      <StyledTd>{item.title}</StyledTd>
      <StyledTd>${item.price}</StyledTd>
      <StyledTd hideOnResponsive={true}>{item.stock}</StyledTd>
      <StyledTd hideOnResponsive={true}>{item.duration}</StyledTd>
      <StyledTd hideOnResponsive={true}>{item.console.join("-")}</StyledTd>
      <td className="py-3 px-4 text-center gap-1 lg:gap-4">
        <div className="h-full flex flex-wrap gap-1 items-center">
          <Button onClick={async () => await handleDeleteProduct(item)}>
            <FaTrash />
          </Button>
          <Link href={`/admin/editar-producto/${item.category}/${item.id}`}>
            <Button>
              <FaPen />
            </Button>
          </Link>
          <div
            className=""
            onClick={() => {
              setOpen(true);
              setProductToView(item);
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

export default SubscriptionsTable;
