"use client";
import React from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import Link from "next/link";
import Button from "../Button";

const headers = [
  {
    slug: "SKU",
    width: "w-2/12",
  },
  {
    slug: "TITULO",
    width: "w-3/12",
  },
  {
    slug: "PRECIO",
    width: "w-1/12",
  },
  {
    slug: "STOCK",
    width: "w-1/12",
  },
  {
    slug: "DURACIÓN",
    width: "w-2/12",
  },
  {
    slug: "CONSOLA",
    width: "w-1/12",
  },
  {
    slug: "ACCIÓN",
    width: "w-2/12",
  },
];

const SubscriptionsTable = ({ subscriptions, handleDeleteProduct }) => {
  return (
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
            />
          );
        })}
      </tbody>
    </table>
  );
};

const StyledSubscriptionRow = ({ item, handleDeleteProduct }) => {
  return (
    <tr className="bg-gray-100">
      <StyledTd>{item.id}</StyledTd>
      <StyledTd>{item.title}</StyledTd>
      <StyledTd>${item.price}</StyledTd>
      <StyledTd>{item.stock}</StyledTd>
      <StyledTd>{item.duration}</StyledTd>
      <StyledTd>{item.console.join("-")}</StyledTd>
      <td className="py-3 px-4 text-center flex gap-4 justify-center ">
        <Button onClick={async () => await handleDeleteProduct(item)}>
          <FaTrash />
        </Button>
        <Link href={`/admin/editar-producto/${item.category}/${item.id}`}>
          <Button>
            <FaPen />
          </Button>
        </Link>
      </td>
    </tr>
  );
};

const StyledTd = ({ children }) => {
  return <td className="py-3 px-4 text-center">{children}</td>;
};

export default SubscriptionsTable;
