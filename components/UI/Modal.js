import React from "react";
import Button from "./Button";

const Modal = ({ onClose, open, children }) => {
  return (
    <div
      onClick={onClose}
      className={`fixed flex inset-0 z-50 justify-center items-center transition-all ${
        open ? "block bg-black/50" : "hidden"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-2xl shadow p-2 transition-all relative flex flex-col gap-2 w-fit ${
          open ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        <div
          className="w-full h-8 flex items-center justify-between px-3 py-1"
          onClick={onClose}
        >
          <h3 className="font-semibold text-xl">Detalle de producto</h3>
          <p className="p-3 cursor-pointer hover:scale-105 transition-all hover:font-bold">
            X
          </p>
        </div>
        <hr />
        <div className="py-2 px-3 w-full flex flex-col gap-2">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
