import { DataTypes } from "sequelize";
import { define } from "../config/db";

const OrderItem = define("OrderItem", {
  quantity: DataTypes.INTEGER,
  price: DataTypes.FLOAT,
});

export default OrderItem;
