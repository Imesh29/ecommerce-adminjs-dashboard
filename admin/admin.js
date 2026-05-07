import AdminJS, { registerAdapter } from "adminjs";
import { buildAuthenticatedRouter } from "@adminjs/express";
import AdminJSSequelize from "@adminjs/sequelize";

import { User, Product, Category, Order, OrderItem } from "../models";

import Setting from "../models/Setting.js";

import dashboardHandler from "./dashboard";
import { json } from "express";

registerAdapter(AdminJSSequelize);

const adminJs = new AdminJS({
  rootPath: "/admin",

  dashboard: {
    handler: dashboardHandler,
  },

  resources: [
    /*
    USERS
    */

    {
      resource: User,

      options: {
        properties: {
          password: {
            isVisible: false,
          },
        },

        actions: {
          new: {
            isAccessible: ({ currentAdmin }) => currentAdmin.role === "admin",
          },

          edit: {
            isAccessible: ({ currentAdmin }) => currentAdmin.role === "admin",
          },

          delete: {
            isAccessible: ({ currentAdmin }) => currentAdmin.role === "admin",
          },

          list: {
            isAccessible: ({ currentAdmin }) => currentAdmin.role === "admin",
          },
        },
      },
    },

    /*
    PRODUCTS
    */

    {
      resource: Product,
    },

    /*
    CATEGORY
    */

    {
      resource: Category,
    },

    /*
    ORDERS
    */

    {
      resource: Order,
    },

    /*
    ORDER ITEMS
    */

    {
      resource: OrderItem,
    },

    /*
    SETTINGS
    */

    {
      resource: Setting,

      options: {
        actions: {
          list: {
            isAccessible: ({ currentAdmin }) => currentAdmin.role === "admin",
          },

          new: {
            isAccessible: ({ currentAdmin }) => currentAdmin.role === "admin",
          },

          edit: {
            isAccessible: ({ currentAdmin }) => currentAdmin.role === "admin",
          },

          delete: {
            isAccessible: ({ currentAdmin }) => currentAdmin.role === "admin",
          },
        },
      },
    },
  ],
});

/*
ADMIN AUTH
*/

const adminRouter = buildAuthenticatedRouter(
  adminJs,
  {
    authenticate: async (email, password) => {
      const user = await User.findOne({
        where: { email },
      });

      if (!user) return null;

      const bcrypt = require("bcryptjs");

      const matched = await bcrypt.compare(password, user.password);

      if (!matched) return null;

      return user;
    },

    cookieName: "adminjs",
    cookiePassword: process.env.COOKIE_SECRET,
  },
  null,
  {
    resave: false,
    saveUninitialized: true,
    secret: process.env.COOKIE_SECRET,
  },
);

export default {
  adminJs,
  adminRouter,
};
