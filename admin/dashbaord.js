import { count } from "../models/User";
import { count as _count } from "../models/Product";
import { count as __count } from "../models/Order";

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
