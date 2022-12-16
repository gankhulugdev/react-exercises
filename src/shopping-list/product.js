import React, { useMemo, useState,useContext } from "react";
import { IoCart } from "react-icons/io5";
import { Rate, InputNumber } from "antd";
import { ShoppingCartContext } from ".";


const ProductInfo = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const {updateCart, cart} = useContext(ShoppingCartContext)

  const [productInCart] = useMemo(
    () => cart.items?.filter((item) => item.sku === product.sku),
    [cart]
  );

  const limit = useMemo(() => {
    return productInCart ? productInCart.quantityLimit : product.quantityLimit;
  }, [cart]);

  return (
    <div className="product-card">
      <div className="image-link">
        <img src={product.largeImage} alt={product.largeImage} />
      </div>
      <div className="item-information">
        <div style={{ fontSize: "13px" }}>{product.name}</div>
        <div style={{ fontSize: "11px", display: "flex" }}>
          <div style={{ paddingRight: "2rem" }}>
            <span style={{ fontWeight: "bold" }}>SKU:</span>
            <span>{product.sku}</span>
          </div>
          <div>
            <span style={{ fontWeight: "bold" }}>Release Date:</span>
            <span>{product.releaseDate}</span>
          </div>
        </div>
        <div className="rating-reviews">
          <span style={{ paddingRight: "2rem" }}>
            <Rate
              disabled
              allowHalf
              defaultValue={product.customerReviewAverage}
            />
          </span>

          <span>{`(${product.customerReviewCount})`}</span>
        </div>

        <div>
          <div className="product-plot">{product.plot}</div>
        </div>
      </div>

      <div className="price-block">
        <div style={{ fontSize: "25px", fontWeight: "500" }}>
          {product.onSale
            ? `$${product.salePrice}`
            : `$${product.regularPrice}`}
        </div>
        <div>
          {product.onSale && (
            <div style={{ display: "flex" }}>
              <div
                style={{
                  color: "white",
                  backgroundColor: "#bb0628",
                  padding: "3px 7px",
                }}
              >{`save $${product.regularPrice - product.salePrice} `}</div>
              <div>{`reg: $${product.regularPrice}`}</div>
            </div>
          )}
        </div>

        <div>
          <InputNumber
            min={0}
            max={limit}
            defaultValue={1}
            onChange={(value) => {
              setQuantity(value);
            }}
          />
        </div>

        <button
          onClick={() => {
            limit - quantity >= 0 &&
              quantity > 0 &&
              updateCart({
                type: "addItemToCart",
                data: {
                  name: product.name,
                  sku: product.sku,
                  thumbnailImage: product.thumbnailImage,
                  quantity,
                  available: product.quantityLimit,
                  quantityLimit: productInCart
                    ? productInCart.quantityLimit - quantity
                    : product.quantityLimit - quantity,
                  price: product.onSale
                    ? product.salePrice
                    : product.regularPrice,
                  totalPrice: product.onSale
                    ? product.salePrice * quantity
                    : product.regularPrice * quantity,
                },
              });
          }}
          className="addToCart-button"
        >
          <IoCart style={{ fontSize: "15px", paddingRight: "0.7rem" }} />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;
