import { DataTypes } from "sequelize";
import { define } from "../config/db";
import Category, { hasMany } from "./Category";

const Product = define("Product", {
  name: DataTypes.STRING,
  price: DataTypes.FLOAT,
  stock: DataTypes.INTEGER,
});

hasMany(Product);
Product.belongsTo(Category);

export default Product;
