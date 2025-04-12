/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "~/components/ui/sidebar";
import { cn } from "~/utils/utils";
import { Logo } from "../logo";

export function DashboardSidebar({ navItems }: { navItems: any }) {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const userID = pathname.split("/")[2];
  const { setOpenMobile } = useSidebar();

  const renderIcon = (item: SidebarItem) => {
    if (item.icon) {
      const Icon = item.icon;
      return <Icon className="h-5 w-5" />;
    }

    if (item.iconUrl) {
      return (
        <div className="relative h-6 w-6">
          <Image src={item.iconUrl} alt={item.route} fill className="object-contain" sizes="24px" />
        </div>
      );
    }
    return null;
  };

  const handleCloseOnMobile = () => {
    setOpenMobile(false);
  };

  return (
    <Sidebar>
      <SidebarHeader className={`h-20 items-center justify-center`}>
        <Logo width={140} height={47} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className={`space-y-2 p-4`}>
          {navItems?.map((item: any) => {
            if (item.divider) {
              return <div key={item.id} />;
            }
            const link = item.link.replace(":userID", userID || "");
            const isActive = pathname.includes(item.id);

            return (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  asChild
                  className={cn(
                    "flex h-[48px] items-center gap-3 rounded-lg text-[16px] font-medium transition-all duration-200",
                    isActive
                      ? "border-2 border-primary text-primary shadow-active"
                      : "text-mid-grey-II hover:bg-low-grey-I",
                  )}
                >
                  <Link onClick={handleCloseOnMobile} href={link} data-testid={item.id} role="sidebar-link">
                    {renderIcon(item)}
                    <span>{item.route}</span>
                    {item.badge && (
                      <SidebarMenuBadge
                        className={cn(
                          "absolute right-2 flex h-5 w-5 items-center justify-center rounded-full text-xs",
                          item.badge.variant === "danger" ? "bg-mid-danger text-white" : "bg-gray-200",
                          item.badge.count === 0 && "hidden",
                        )}
                      >
                        {item.badge.count}
                      </SidebarMenuBadge>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className={`h-fit items-center justify-center bg-black`}>
        <span className={`text-xs font-semibold text-white`}>ByteAlley &copy; {currentYear}.</span>
      </SidebarFooter>
    </Sidebar>
  );
}
