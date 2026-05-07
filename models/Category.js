import { DataTypes } from "sequelize";
import { define } from "../config/db";

const Category = define("Category", {
  name: DataTypes.STRING,
});

export default Category;
