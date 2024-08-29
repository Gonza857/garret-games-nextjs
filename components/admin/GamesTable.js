"use client";
import React from "react";
import Button from "../Button";
import { FaPen, FaTrash } from "react-icons/fa";

const GamesTable = ({ games, handleDeleteProduct }) => {
  return (
    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
      <thead className="bg-gray-800 text-white">
        <tr>
          <th className="w-2/12 py-3 px-4 uppercase font-semibold text-sm text-center">
            ID
          </th>
          <th className="w-3/12 py-3 px-4 uppercase font-semibold text-sm text-center">
            Titulo
          </th>
          <th className="w-2/12 py-3 px-4 uppercase font-semibold text-sm text-center">
            Precio
          </th>
          <th className="w-1/12 py-3 px-4 uppercase font-semibold text-sm text-center">
            Stock
          </th>
          <th className="w-2/12 py-3 px-4 uppercase font-semibold text-sm text-center">
            Consola
          </th>
          <th className="w-2/12 py-3 px-4 uppercase font-semibold text-sm text-center">
            Acción
          </th>
        </tr>
      </thead>
      <tbody className="text-gray-700">
        {games.map((game) => {
          return (
            <tr className="bg-gray-100" key={game.id}>
              <td className="py-3 px-4 text-center">{game.id}</td>
              <td className="py-3 px-4 text-center">{game.title}</td>
              <td className="py-3 px-4 text-center">{game.price}</td>
              <td className="py-3 px-4 text-center">{game.stock}</td>
              <td className="py-3 px-4 text-center">
                {game.console.join("-")}
              </td>
              <td className="py-3 px-4 text-center flex gap-4 justify-center">
                <Button onClick={async () => await handleDeleteProduct(game)}>
                  <FaTrash />
                </Button>
                <Button>
                  <FaPen />
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default GamesTable;
