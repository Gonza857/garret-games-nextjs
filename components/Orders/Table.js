"use client";
import React, { useState } from "react";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import { FaEye } from "react-icons/fa";

const headers = [
  {
    slug: "Correo",
    width: "hidden md:w-3/12 md:table-cell",
  },
  {
    slug: "Nombre",
    width: "w-5/12 md:w-4/12",
  },
  {
    slug: "Total",
    width: "w-3/12 md:w-2/12",
  },
  {
    slug: "Productos",
    width: "w-2/12 md:w-1/12",
  },
  {
    slug: "Acción",
    width: "w-2/12 md:w-2/12",
  },
];

const OrdersTable = ({ orders }) => {
  const [open, setOpen] = useState(false);
  const [orderToView, setOrderToView] = useState({});

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <table className="w-full h-fit bg-white shadow-md rounded-lg overflow-hidden mt-4">
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
            return (
              <StyledOrderRow
                key={o.id}
                order={o}
                setOpen={setOpen}
                setOrderToView={setOrderToView}
              />
            );
          })}
        </tbody>
      </table>
      <Modal onClose={onClose} open={open}>
        <p>ID: {orderToView.user?.email}</p>
        <p>Cliente: {orderToView.user?.fullname}</p>
        <p>Total: ${orderToView.total}</p>
        <p>Productos: {orderToView.items?.length}</p>
      </Modal>
    </>
  );
};

const StyledTd = ({ children, hideOnResponsive = false }) => {
  return (
    <td
      className={`py-1 px-2 md:py-3 md:px-4 text-center ${
        hideOnResponsive ? "hidden md:table-cell" : "text-sm md:text-normal"
      }`}
    >
      {children}
    </td>
  );
};

const StyledOrderRow = ({ order, setOpen, setOrderToView }) => {
  return (
    <tr className="bg-gray-100 h-fit">
      <StyledTd hideOnResponsive={true}>{order?.user.email}</StyledTd>
      <StyledTd>{order?.user.fullname}</StyledTd>
      <StyledTd>${order?.total}</StyledTd>
      <StyledTd>{order?.items.length}</StyledTd>
      <td className="py-3 px-4 text-center flex gap-4 justify-center">
        <Button
          onClick={() => {
            setOpen(true);
            setOrderToView(order);
          }}
        >
          <FaEye />
        </Button>
      </td>
    </tr>
  );
};

export default OrdersTable;
