import React,{memo} from "react";
import ProductInfo from "./product";

const ProductList = memo(({ products }) => {
  return (
    <div>
      {products.map((product) => (
        <ProductInfo key={product.sku} product={product} />
      ))}
    </div>
  );
});

export default ProductList;
