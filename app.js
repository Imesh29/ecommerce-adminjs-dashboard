import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import sequelize from "./config/db.js";

/*
MODELS
*/

import User from "./models/User.js";
import Product from "./models/Product.js";
import Category from "./models/Category.js";
import Order from "./models/Order.js";
import OrderItem from "./models/OrderItem.js";

Category.hasMany(Product, {
  foreignKey: "CategoryId",
});

Product.belongsTo(Category, {
  foreignKey: "CategoryId",
});

User.hasMany(Order, {
  foreignKey: "UserId",
});

Order.belongsTo(User, {
  foreignKey: "UserId",
});

Order.hasMany(OrderItem, {
  foreignKey: "OrderId",
});

OrderItem.belongsTo(Order, {
  foreignKey: "OrderId",
});

Product.hasMany(OrderItem, {
  foreignKey: "ProductId",
});

OrderItem.belongsTo(Product, {
  foreignKey: "ProductId",
});

import adminData from "./admin/admin.js";

/*
ROUTES
*/

import authRoutes from "./routes/authRoutes.js";

const app = express();

/*
MIDDLEWARES
*/

app.use(cors());
app.use(express.json());

/*
API ROUTES
*/

app.use("/api", authRoutes);

/*
ADMIN ROUTES
*/

app.use(adminData.adminJs.options.rootPath, adminData.adminRouter);

/*
HOME ROUTE
*/

app.get("/", (req, res) => {
  res.send("eCommerce Admin Dashboard Running...");
});

/*
DATABASE CONNECTION
*/

sequelize
  .authenticate()
  .then(() => {
    console.log("PostgreSQL Connected Successfully");
  })
  .catch((err) => {
    console.log("Database Authentication Failed");
    console.log(err);
  });

/*
SYNC DATABASE
*/

sequelize
  .sync({ alter: true })

  .then(async () => {
    console.log("Database Synced Successfully");

    /*
    CREATE DEFAULT ADMIN
    */

    const adminExists = await User.findOne({
      where: {
        email: "admin@gmail.com",
      },
    });

    if (!adminExists) {
      await User.create({
        name: "Admin",

        email: "admin@gmail.com",

        password: "123456",

        role: "admin",
      });

      console.log("Default Admin Created");
    }

    /*
    START SERVER
    */

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })

  .catch((err) => {
    console.log("Database connection failed");

    console.log(err);
  });
