import { useLocation } from "react-router";
import { NavLink } from "react-router";
import { Fragment } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

function AppBreadcrumb() {
  const { pathname } = useLocation();
  const paths = pathname.split("/").filter(Boolean);

  const mapping = {
    products: "Sản phẩm",
    categories: "Danh mục",
    "category-groups": "Nhóm danh mục",
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink asChild>
            <NavLink to="/">Trang chủ</NavLink>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {paths.map((path, index) => {
          const isLast = index === paths.length - 1;

          return (
            <Fragment key={index}>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{mapping[path] || path}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <NavLink to={`/${paths.slice(0, index + 1).join("/")}`}>
                      {mapping[path] || path}
                    </NavLink>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default AppBreadcrumb;
