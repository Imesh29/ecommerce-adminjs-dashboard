import { DataTypes } from "sequelize";
import bcrypt from "bcryptjs";

import sequelize from "../config/db.js";

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  role: {
    type: DataTypes.ENUM("admin", "user"),
    defaultValue: "user",
  },
});

/*
HASH PASSWORD
*/

User.beforeSave(async (user) => {
  /*
  ONLY HASH IF PASSWORD CHANGED
  */

  if (user.changed("password")) {
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(user.password, salt);
  }
});

export default User;
