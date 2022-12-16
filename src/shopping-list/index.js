import React, { useEffect, useState, useReducer, createContext } from "react";
import ShoppingCart from "./shoppping-cart";
import "./shopping-list.css";
import axios from "axios";
import ProductList from "./productList";

export const ShoppingCartContext = createContext();

const isFound = (items, data) => items.some((item) => item.sku === data.sku);

const removeItem = (currentState, data) =>
  currentState.filter((item) => item.sku !== data.sku);

const reduceProducts = (currentState, { type, data }) => {
  switch (type) {
    case "addItemToCart":
      return isFound(currentState.items, data)
        ? {
            items: currentState.items.map((item) => {
              return item.sku === data.sku
                ? {
                    ...data,
                    quantity: item.quantity + data.quantity,
                    totalPrice: item.totalPrice + data.totalPrice,
                  }
                : item;
            }),
            totalQty: currentState.totalQty + data.quantity,
            totalPrice: currentState.totalPrice + data.totalPrice,
          }
        : {
            items: [...currentState.items, data],
            totalQty: currentState.totalQty + data.quantity,
            totalPrice: currentState.totalPrice + data.totalPrice,
          };

    case "removeItem":
      return {
        items: removeItem(currentState.items, data),
        totalQty: currentState.totalQty - data.quantity,
        totalPrice: currentState.totalPrice - data.totalPrice,
      };
    case "changedByOne":
      return data.quantity === 0
        ? {
            items: removeItem(currentState.items, data),
            totalQty: currentState.totalQty - data.quantity,
            totalPrice: currentState.totalPrice - data.totalPrice,
          }
        : {
            items: currentState.items.map((item) =>
              item.sku === data.sku
                ? {
                    ...data,
                    quantity: data.quantity,
                    totalPrice: data.totalPrice,
                  }
                : item
            ),
            totalQty: currentState.totalQty + data.differenceQty,
            totalPrice: currentState.totalPrice + data.differencePrice,
          };
  }
};

const Shop = () => {
  const [cart, updateCart] = useReducer(reduceProducts, {
    items: [],
    totalQty: 0,
    totalPrice: 0,
  });
  
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.bestbuy.com/v1/products?pageSize=100&format=json&show=sku,productId,name,type,regularPrice,salePrice,onSale,url,categoryPath,customerReviewAverage,customerReviewCount,department,largeImage,thumbnailImage,plot,genre,albumTitle,releaseDate,quantityLimit&apiKey=j7RQXCsGGeSc5GaXv0slAOAm"
      )
      .then((res) => {
        if(res.status === 200)
        setProducts(res.data.products);
      })
      .catch((err) => {})
      .finally(() => {});
  }, []);

  return (
    <ShoppingCartContext.Provider value={{ cart, updateCart }}>
      <div className="shop-container">
        <ProductList products={products} />

        <ShoppingCart updateCart={updateCart} cart={cart} />
      </div>
    </ShoppingCartContext.Provider>
  );
};

export default Shop;
