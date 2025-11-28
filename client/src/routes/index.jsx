import Category from "@/pages/Category";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import CategoryGroup from "@/pages/CategoryGroup";

import AuthLayout from "@/components/layouts/AuthLayout";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import NotFound from "@/pages/NotFound";

const routes = [
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login title="Đăng Nhập" />,
      },
      {
        path: "register",
        element: <Register title="Đăng Ký" />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <DefaultLayout />,
        children: [
          {
            index: true,
            element: <Home title="Trang Chủ" />,
          },
          {
            path: "products",
            children: [
              {
                path: "category-groups",
                element: <CategoryGroup title="Nhóm Danh Mục" />,
              },
              {
                path: "categories",
                element: <Category title="Danh Mục" />,
              },
            ],
          },
          {
            path: "*",
            element: <NotFound />,
          },
        ],
      },
    ],
  },
];

export { routes };
