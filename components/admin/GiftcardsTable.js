"use client";
import React from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import Button from "../Button";

const GiftcardsTable = ({ giftcards, handleDeleteProduct }) => {
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
            Región
          </th>
          <th className="w-1/12 py-3 px-4 uppercase font-semibold text-sm text-center">
            Valor
          </th>
          <th className="w-1/12 py-3 px-4 uppercase font-semibold text-sm text-center">
            Stock
          </th>
          <th className="w-1/12 py-3 px-4 uppercase font-semibold text-sm text-center">
            Precio
          </th>
          <th className="w-2/12 py-3 px-4 uppercase font-semibold text-sm text-center">
            Acción
          </th>
        </tr>
      </thead>
      <tbody className="text-gray-700">
        {giftcards.map((s) => {
          return (
            <tr className="bg-gray-100" key={s.id}>
              <td className="py-3 px-4 text-center">{s.id}</td>
              <td className="py-3 px-4 text-center">{s.title}</td>
              <td className="py-3 px-4 text-center">{s.region}</td>
              <td className="py-3 px-4 text-center">${s.value}</td>
              <td className="py-3 px-4 text-center">{s.stock}</td>
              <td className="py-3 px-4 text-center">${s.price}</td>
              <td className="py-3 px-4 text-center flex gap-4 justify-center ">
                <Button onClick={async () => await handleDeleteProduct(s)}>
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

export default GiftcardsTable;
