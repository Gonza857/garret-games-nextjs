import React from "react";

const ProductsWrapper = ({ children }) => {
  return (
    <div className="w-full md:w-11/12 lg:w-10/12 min-h-fit md:mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 auto-rows-auto justify-items-center gap-4 py-3">
      {children}
    </div>
  );
};

export default ProductsWrapper;
