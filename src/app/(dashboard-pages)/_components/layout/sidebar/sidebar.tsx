"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

import { Logo } from "~/components/common/logo";
import { sideItems } from "~/utils/constants";
import { cn } from "~/utils/utils";

export const Sidebar: FC<ISidebarProperties> = ({ sideNavitems = sideItems, logoComponent, className = "" }) => {
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

  const renderSidebarItem = (item: SidebarItem) => {
    if (item.divider) {
      return <hr className="invisible my-4" />;
    }

    const isActive = pathname.includes(item.id);
    const dynamicLink = item.link.replace(":userID", userID);

    return (
      <Link
        key={item.id}
        href={dynamicLink}
        data-testid={item.id}
        role="sidebar-link"
        className={cn(
          "relative z-50 flex items-center gap-3 rounded-lg px-3 py-2.5 font-medium transition-all duration-200",
          isActive ? "border-2 border-primary text-primary shadow-active" : "text-mid-grey-II hover:bg-low-grey-I",
        )}
      >
        {renderIcon(item)}
        <span className="hidden lg:block">{item.route}</span>
        {item.badge && (
          <span
            className={cn(
              "absolute right-2 flex h-5 w-5 items-center justify-center rounded-full text-xs",
              item.badge.variant === "danger" ? "bg-mid-danger text-white" : "bg-gray-200",
            )}
          >
            {item.badge.count}
          </span>
        )}
      </Link>
    );
  };

  return (
    <div className={cn("sticky top-0 hidden h-screen w-[283px] flex-col border-r bg-white md:flex", className)}>
      <div className="flex items-center justify-center py-8">{logoComponent || <Logo width={140} height={47} />}</div>

      <nav className="flex-1 space-y-2 overflow-y-auto p-4">
        {sideNavitems.map((item) => (
          <div key={item.id}>{renderSidebarItem(item)}</div>
        ))}
      </nav>
    </div>
  );
};
