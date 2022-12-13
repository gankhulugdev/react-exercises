import React, { useEffect, useState, useReducer } from "react";
import ShoppingCart from "./shoppping-cart";
import ProductInfo from "./product";
import "./shopping-list.css";
import axios from "axios";

const isFound = (currentState, data) => {
  return currentState.some((item) => item.sku === data.sku);
};

const removeItem = (currentState, data) => {
  return currentState.filter((item) => item.sku !== data.sku);
};

const reduceProducts = (currentState, { type, data }) => {
  switch (type) {
    case "addItemToCart":
      return isFound(currentState, data)
        ? currentState.map((item) => {
            return item.sku === data.sku
              ? {
                  ...data,
                  quantity: item.quantity + data.quantity,
                  totalPrice: item.totalPrice + data.totalPrice,
                }
              : item;
          })
        : [...currentState, data];

    case "removeItem":
      return removeItem(currentState, data);
    case "changedByOne":
      return isFound(currentState, data)
        ? data.quantity === 0
          ? removeItem(currentState, data)
          : currentState.map((item) => (item.sku === data.sku ? data : item))
        : currentState;
  }
};

const Shop = () => {
  const [cart, updateCart] = useReducer(reduceProducts, []);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.bestbuy.com/v1/products?format=json&show=sku,productId,name,type,regularPrice,salePrice,onSale,url,categoryPath,customerReviewAverage,customerReviewCount,department,largeImage,thumbnailImage,plot,genre,albumTitle,releaseDate,quantityLimit&apiKey=j7RQXCsGGeSc5GaXv0slAOAm"
      )
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => {})
      .finally(() => {});
  }, []);

  return (
    <div className="shop-container">
      <div>
        {products?.map((product) => {
          return (
            <ProductInfo
              key={product.sku}
              cart={cart}
              updateCart={updateCart}
              product={product}
            />
          );
        })}
      </div>

      <div>
        <ShoppingCart key="shoppigcart" updateCart={updateCart} cart={cart} />
      </div>
    </div>
  );
};

export default Shop;
