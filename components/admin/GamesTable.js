"use client";
import React from "react";
import Button from "../Button";
import { FaPen, FaTrash } from "react-icons/fa";
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
    slug: "TIPO",
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

const GamesTable = ({ games, handleDeleteProduct }) => {
  console.log(games);
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
        {games.map((game) => {
          return (
            <StyledGameRow
              key={game.id}
              game={game}
              handleDeleteProduct={handleDeleteProduct}
            />
          );
        })}
      </tbody>
    </table>
  );
};

const StyledGameRow = ({ game, handleDeleteProduct }) => {
  return (
    <tr className="bg-gray-100">
      <StyledTd>{game.id}</StyledTd>
      <StyledTd>{game.title}</StyledTd>
      <StyledTd>${game.price}</StyledTd>
      <StyledTd>{game.stock}</StyledTd>
      <StyledTd>{game.accountType}</StyledTd>
      <StyledTd>{game.console.join("-")}</StyledTd>
      <td className="py-3 px-4 text-center flex gap-4 justify-center">
        <Button onClick={async () => await handleDeleteProduct(game)}>
          <FaTrash />
        </Button>
        <Link href={`/admin/editar-producto/${game.category}/${game.id}`}>
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

export default GamesTable;
