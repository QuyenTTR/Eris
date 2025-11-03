import Category from "@/pages/Category";
import Home from "@/pages/Home";
import Item from "@/pages/Item";
import Product from "@/pages/Product";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

import AuthLayout from "@/layout/AuthLayout";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
    layout: AuthLayout,
  },
  {
    path: "/register",
    component: Register,
    layout: AuthLayout,
  },
  {
    path: "/product",
    component: Product,
  },
  {
    path: "/product/category",
    component: Category,
  },
  {
    path: "/product/item",
    component: Item,
  },
];

export default routes;
