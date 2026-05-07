import { DataTypes } from "sequelize";
import { define } from "../config/db";
import User, { hasMany } from "./User";

const Order = define("Order", {
  total: DataTypes.FLOAT,
});

hasMany(Order);
Order.belongsTo(User);

export default Order;
