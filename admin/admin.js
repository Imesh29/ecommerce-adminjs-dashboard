import AdminJS from "adminjs";
import { buildAuthenticatedRouter } from "@adminjs/express";
import AdminJSSequelize from "@adminjs/sequelize";

import User from "../models/User.js";
import Product from "../models/Product.js";
import Category from "../models/Category.js";
import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";

import Setting from "../models/Setting.js";

import dashboardHandler from "./dashbaord.js";
import bcrypt from "bcryptjs";

AdminJS.registerAdapter({
  Resource: AdminJSSequelize.Resource,
  Database: AdminJSSequelize.Database,
});

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
        navigation: "Admin Panel",
        properties: {
          password: {
            type: "password",

            isVisible: {
              list: false,
              filter: false,
              show: false,
              edit: true,
            },
          },
        },

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

    /*
    PRODUCTS
    */

    {
      resource: Product,

      options: {
        navigation: "Shop",

        properties: {
          CategoryId: {
            isVisible: true,
          },
        },
      },
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

      options: {
        navigation: "Orders",

        properties: {
          UserId: {
            isVisible: true,
          },
        },
      },
    },

    /*
    ORDER ITEMS
    */

    {
      resource: OrderItem,

      options: {
        navigation: "Orders",

        properties: {
          OrderId: {
            isVisible: true,
          },

          ProductId: {
            isVisible: true,
          },
        },
      },
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
