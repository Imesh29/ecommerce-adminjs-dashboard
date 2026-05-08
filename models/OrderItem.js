import { DataTypes } from "sequelize";

import sequelize from "../config/db.js";

const OrderItem = sequelize.define("OrderItem", {
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },

  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  /*
  FOREIGN KEYS
  */

  OrderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  ProductId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default OrderItem;
