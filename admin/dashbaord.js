import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

const dashboardHandler = async () => {
  const totalUsers = await count();
  const totalProducts = await _count();
  const totalOrders = await __count();

  return {
    totalUsers,
    totalProducts,
    totalOrders,
  };
};

export default dashboardHandler;
