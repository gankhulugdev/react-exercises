import React, { useState, useEffect, useMemo } from "react";
import { Badge, Space, Table, InputNumber } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

const ShoppingCart = ({ cart, updateCart }) => {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setDataSource(() => cart.map((item) => ({ ...item, key: item.sku })));
  }, [cart]);

  const totalPrice = useMemo(
    () => cart.reduce((accumulator, item) => item.totalPrice + accumulator, 0),
    [cart]
  );

  const totalQuantity = useMemo(
    () => cart.reduce((accumulator, item) => item.quantity + accumulator, 0),
    [cart]
  );

  const columns = [
    {
      dataIndex: "thumbnailImage",
      key: "thumbnailImage",
      render: (thumbnailImage, item) => {
        return (
          <div>
            <img src={thumbnailImage} alt={thumbnailImage} />
            <div>{item.sku}</div>
          </div>
        );
      },
    },
    {
      dataIndex: "name",
      key: "name",
      render: (name, item) => {
        return (
          <div>
            <div>{name}</div>
            <InputNumber
              min={0}
              max={item.available}
              defaultValue={item.quantity}
              value={item.quantity}
              onChange={(value) => {
                updateCart({
                  type: "changedByOne",
                  data: {
                    ...item,

                    quantity: value,
                    quantityLimit: item.available - value,
                    totalPrice: item.price * value,
                  },
                });
              }}
            />
          </div>
        );
      },
    },
    {
      render: (item) => {
        return (
          <div>
            <div>{`$${item.totalPrice}`}</div>
            <button
              onClick={() => {
                updateCart({
                  type: "removeItem",
                  data: item,
                });
              }}
            >
              remove
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="costumer-card">
      {totalQuantity ? (
        <div>
          <div className="costumer-card-top">
            <div>
              <span>Costumer Cart</span>
            </div>
            <Space size="large">
              <Badge color="#faad14" count={totalQuantity}>
                <ShoppingCartOutlined style={{ fontSize: "40px" }} />
              </Badge>
            </Space>
          </div>
          <div>
            <Table dataSource={dataSource} columns={columns} />;
          </div>

          <div> {`Cart total: $${totalPrice}`}</div>
        </div>
      ) : (
        "Your Cart Is Empty"
      )}
    </div>
  );
};

export default ShoppingCart;
