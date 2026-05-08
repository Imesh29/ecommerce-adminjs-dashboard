import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Category = sequelize.define("Category", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  description: {
    type: DataTypes.TEXT,
  },
});

export default Category;
