import Category from "@/pages/Category";
import Home from "@/pages/Home";
import Item from "@/pages/Item";
import Product from "@/pages/Product";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import CategoryGroup from "@/pages/CategoryGroup";

import AuthLayout from "@/components/layouts/AuthLayout";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
    layout: AuthLayout,
    title: "Đăng Nhập",
    public: true,
  },
  {
    path: "/register",
    component: Register,
    layout: AuthLayout,
    title: "Tạo Tài Khoản",
    public: true,
  },
  {
    path: "/product/category-group",
    component: CategoryGroup,
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
