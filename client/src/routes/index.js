import Category from "@/pages/Category";
import Home from "@/pages/Home";
import Item from "@/pages/Item";
import Product from "@/pages/Product";

const routes = [
  {
    path: "/",
    component: Home,
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
