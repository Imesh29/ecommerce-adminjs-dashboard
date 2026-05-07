import { DataTypes } from "sequelize";
import { define } from "../config/db";

const Setting = define("Setting", {
  key: DataTypes.STRING,
  value: DataTypes.STRING,
});

export default Setting;
