import React from "react";

const ProductsWrapper = ({ children }) => {
  return (
    <div className="w-full md:w-fit min-h-fit md:mx-auto grid grid-cols-2 md:grid-cols-5 auto-rows-auto gap-4 py-3 ">
      {children}
    </div>
  );
};

export default ProductsWrapper;
