"use client";

import * as React from "react";
import { Archive, Command, LifeBuoy, Send } from "lucide-react";
import { Link } from "react-router";

import { NavMain } from "@/components/nav-main";
// import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import useAuthStore from "@/stores/useAuth.store";

export function AppSidebar({ ...props }) {
  const { fullname, email, username, avatarUrl } = useAuthStore(
    (state) => state.user,
  );

  const data = {
    user: {
      name: fullname,
      email,
      avatar: avatarUrl,
      username,
    },
    navMain: [
      {
        title: "Sản phẩm",
        icon: Archive,

        items: [
          {
            title: "Mặt hàng",
            url: "/product/item",
          },
          {
            title: "Danh mục",
            url: "/product/category",
          },
        ],
      },
    ],
    navSecondary: [
      {
        title: "Hỗ trợ",
        url: "#",
        icon: LifeBuoy,
      },
      {
        title: "Góp ý phát triển",
        url: "#",
        icon: Send,
      },
    ],
  };
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left leading-tight">
                  <span className="truncate text-lg font-medium">Eris</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
