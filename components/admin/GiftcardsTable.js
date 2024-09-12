"use client";
import React from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import Button from "../Button";
import Link from "next/link";

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
    slug: "REGIÓN",
    width: "w-2/12",
  },
  {
    slug: "VALOR",
    width: "w-1/12",
  },
  {
    slug: "ACCIÓN",
    width: "w-2/12",
  },
];

const GiftcardsTable = ({ giftcards, handleDeleteProduct }) => {
  return (
    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
      <TableHead />
      <tbody className="text-gray-700">
        {giftcards.map((s) => {
          return (
            <StyledGiftCardRow
              key={s.id}
              s={s}
              handleDeleteProduct={handleDeleteProduct}
            />
          );
        })}
      </tbody>
    </table>
  );
};

const StyledTd = ({ children }) => {
  return <td className="py-3 px-4 text-center">{children}</td>;
};

const StyledGiftCardRow = ({ s, handleDeleteProduct }) => {
  return (
    <tr className="bg-gray-100">
      <StyledTd>{s.id}</StyledTd>
      <StyledTd>{s.title}</StyledTd>
      <StyledTd>${s.price}</StyledTd>
      <StyledTd>{s.stock}</StyledTd>
      <StyledTd>{s.region}</StyledTd>
      <StyledTd>${s.value}</StyledTd>
      <td className="py-3 px-4 text-center flex gap-4 justify-center ">
        <Button onClick={async () => await handleDeleteProduct(s)}>
          <FaTrash />
        </Button>
        <Link href={`/admin/editar-producto/${s.category}/${s.id}`}>
          <Button>
            <FaPen />
          </Button>
        </Link>
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
