import React from "react";
import ContentLoader from "react-content-loader";

const ProductSkeleton = (props) => {
  return (
    <ContentLoader
      speed={2}
      width={208}
      height={384}
      viewBox="0 0 208 384"
      backgroundColor="#6e6e6e50"
      foregroundColor="#008a8180"
      {...props}
    >
      <rect x="9" y="0" rx="0" ry="0" width="190" height="190" />
      <rect x="4" y="205" rx="2" ry="0" width="200" height="15" />
      <rect x="4" y="235" rx="2" ry="0" width="120" height="15" />
      <rect x="4" y="265" rx="2" ry="0" width="90" height="15" />
      <rect x="4" y="300" rx="10" ry="10" width="200" height="40" />
    </ContentLoader>
  );
};

export default ProductSkeleton;
