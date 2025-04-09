import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar";
import { cn } from "~/utils/utils";
import { Logo } from "../logo";

export function DashboardSidebar({ navItems }: { navItems: any }) {
  const currentYear = new Date().getFullYear();
  const router = useRouter();
  const pathname = usePathname();
  const userID = pathname.split("/")[2];

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
                  className={cn(
                    "flex h-[48px] items-center gap-3 rounded-lg text-[16px] font-medium transition-all duration-200",
                    isActive
                      ? "border-2 border-primary text-primary shadow-active"
                      : "text-mid-grey-II hover:bg-low-grey-I",
                  )}
                  onClick={() => {
                    router.push(link);
                  }}
                >
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
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className={`h-20 items-center justify-center bg-low-purple`}>
        <span className={`text-xs font-semibold text-primary`}>
          ByteAlley &copy; {currentYear}. All rights reserved.
        </span>
        {/* <span> {currentYear} Powered By Strategic Dot.</span> */}
      </SidebarFooter>
    </Sidebar>
  );
}
