import React from "react";

const Button = ({ children, ...args }) => {
  return (
    <button
      className="px-4 py-2 bg-cyan-700 rounded-xl cursor-pointer text-white"
      {...args}
    >
      {children}
    </button>
  );
};

export default Button;
