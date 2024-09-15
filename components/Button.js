import React from "react";

const Button = ({ children, ...args }) => {
  return (
    <button
      className="text-sm md:text-base px-3 py-2 md:px-4 md:py-2 bg-cyan-700 rounded-xl cursor-pointer text-white min-h-fit"
      {...args}
    >
      {children}
    </button>
  );
};

export default Button;
