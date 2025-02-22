"use client";

import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useState } from "react";

import { Logo } from "~/components/common/logo";
import { DialogTitle } from "~/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { sideItems } from "~/utils/constants";
import { cn } from "~/utils/utils";

export const Drawer: FC<ISidebarProperties> = ({ sideNavitems = sideItems, logoComponent }) => {
  const pathname = usePathname();
  const userID = pathname.split("/")[2];
  const [isOpen, setIsOpen] = useState(false);

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
        onClick={() => setIsOpen(false)}
      >
        {renderIcon(item)}
        <span>{item.route}</span>
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
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className={`xl:hidden`}>
        <MenuIcon />
      </SheetTrigger>
      <SheetContent side={`left`}>
        <DialogTitle hidden>Navigation Menu</DialogTitle>
        <div className="flex items-center justify-center py-8">{logoComponent || <Logo width={140} height={47} />}</div>
        <nav className="flex-1 space-y-2 overflow-y-auto p-4">
          {sideNavitems.map((item) => (
            <div key={item.id}>{renderSidebarItem(item)}</div>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};
