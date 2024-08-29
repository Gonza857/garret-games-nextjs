import React from "react";

const ProductsWrapper = ({ children }) => {
  return (
    <div className="w-10/12 mx-auto grid grid-cols-5 auto-rows-auto gap-4 py-3 border-4">
      {children}
    </div>
  );
};

export default ProductsWrapper;
