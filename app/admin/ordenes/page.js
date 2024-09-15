import Button from "@/components/Button";
import React from "react";
import { FaPen, FaTrash } from "react-icons/fa";

const headers = [
  {
    slug: "Correo",
    width: "w-3/12",
  },
  {
    slug: "Nombre",
    width: "w-3/12",
  },
  {
    slug: "Total",
    width: "w-2/12",
  },
  {
    slug: "Productos",
    width: "w-1/12",
  },
  {
    slug: "Acción",
    width: "w-3/12",
  },
];

const AdminOrders = async () => {
  const orders = await fetch(`http://localhost:3000/api/ordenes`, {
    cache: "no-store",
  }).then((r) => r.json());

  return (
    <main className="min-h-screen w-full pt-20 flex justify-center">
      <table className="w-7/12 h-fit bg-white shadow-md rounded-lg overflow-hidden mt-4">
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
          {orders.map((o) => {
            return <StyledOrderRow key={o.id} order={o} />;
          })}
        </tbody>
      </table>
    </main>
  );
};

const StyledOrderRow = ({ order }) => {
  return (
    <tr className="bg-gray-100 h-fit">
      <StyledTd>{order.user.email}</StyledTd>
      <StyledTd>{order.user.fullname}</StyledTd>
      <StyledTd>${order.total}</StyledTd>
      <StyledTd>{order.items.length}</StyledTd>
      <td className="py-3 px-4 text-center flex gap-4 justify-center">
        <Button>
          <FaTrash />
        </Button>
        <Button>
          <FaPen />
        </Button>
      </td>
    </tr>
  );
};

const StyledTd = ({ children }) => {
  return <td className="py-3 px-4 text-center">{children}</td>;
};

export default AdminOrders;
