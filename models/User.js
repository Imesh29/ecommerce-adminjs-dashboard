import { DataTypes } from "sequelize";
import { define } from "../config/db";

const User = define("User", {
  name: {
    type: DataTypes.STRING,
  },

  email: {
    type: DataTypes.STRING,
    unique: true,
  },

  password: {
    type: DataTypes.STRING,
  },

  role: {
    type: DataTypes.ENUM("admin", "user"),
    defaultValue: "user",
  },
});

export default User;
