import React from "react";

const ProductsWrapper = ({ children }) => {
  return (
    <div className="w-fit min-h-fit mx-auto grid grid-cols-5 auto-rows-auto gap-4 py-3">
      {children}
    </div>
  );
};

export default ProductsWrapper;
