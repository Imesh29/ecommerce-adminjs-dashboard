require("dotenv").config();

import express, { json } from "express";
import cors from "cors";

import { sync } from "./config/db.js";

/*
MODELS
*/

import User, { hasMany, findOne, create } from "./models/User.js";
import Product, { belongsTo, hasMany as _hasMany } from "./models/Product.js";
import Category, { hasMany as __hasMany } from "./models/Category.js";
import Order, {
  belongsTo as _belongsTo,
  hasMany as ___hasMany,
} from "./models/Order.js";
import OrderItem, { belongsTo as __belongsTo } from "./models/OrderItem.js";

/*
RELATIONSHIPS
*/

__hasMany(Product);
belongsTo(Category);

hasMany(Order);
_belongsTo(User);

___hasMany(OrderItem);
__belongsTo(Order);

_hasMany(OrderItem);
__belongsTo(Product);

/*
ADMIN PANEL
*/

import { adminJs, adminRouter } from "./admin/admin";

/*
ROUTES
*/

import authRoutes from "./routes/authRoutes";

const app = express();

app.use(cors());

app.use(json());

app.use("/api", authRoutes);

app.use(adminJs.options.rootPath, adminRouter);

/*
DATABASE
*/

sync({ alter: true })
  .then(async () => {
    console.log("Database connected");

    /*
CREATE DEFAULT ADMIN
*/

    const adminExists = await findOne({
      where: {
        email: "admin@gmail.com",
      },
    });

    if (!adminExists) {
      await create({
        name: "Admin",
        email: "admin@gmail.com",
        password: "123456",
        role: "admin",
      });

      console.log("Default admin created");
    }

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
