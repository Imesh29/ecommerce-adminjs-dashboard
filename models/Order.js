import { DataTypes } from "sequelize";

import sequelize from "../config/db.js";

const Order = sequelize.define("Order", {
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },

  status: {
    type: DataTypes.STRING,
    defaultValue: "Pending",
  },

  /*
  FOREIGN KEY
  */

  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Order;
