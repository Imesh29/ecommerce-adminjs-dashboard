import { DataTypes } from "sequelize";

import sequelize from "../config/db.js";

const Product = sequelize.define("Product", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  description: {
    type: DataTypes.TEXT,
  },

  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },

  /*
  FOREIGN KEY
  */

  CategoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Product;
