"use client";

import bell from "@/icons/Property_2_Notifications_1_w4v7g4.svg";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { Profile } from "~/components/common/profile";
import { SearchInput } from "~/components/common/search-input";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { SidebarTrigger } from "~/components/ui/sidebar";
import { UnreadNotificationCard, useNotifications } from "~/features/push-notification";
import { cn } from "~/utils/utils";

export const DashboardNavbar = () => {
  const pathname = usePathname();
  const title = pathname.split("/")[3]?.charAt(0).toUpperCase() + pathname.split("/")[3]?.slice(1);
  const { unreadCount, fetchNotifications } = useNotifications();

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return (
    <nav
      className={cn(
        `border-bottom z-[5] w-full backdrop-blur-sm transition-transform duration-300`,
        // isNavbarVisible ? "translate-y-0" : "-translate-y-full",
      )}
      role="navbar"
    >
      <section className="flex w-full items-center justify-between gap-[20px] px-[16px] py-[20px] lg:px-[32px]">
        <div className={`flex items-center gap-4`}>
          <SidebarTrigger className={cn(`h-10 w-10`)} />
          <h4 className="text-h4 sm:text-h4-sm md:text-h4-md">{title}</h4>
        </div>
        <section className="flex items-center justify-between gap-6">
          <SearchInput inputBackgroundColor="bg-low-grey-III" className="hidden w-[100%] lg:flex lg:w-[270px]" />
          <div className="relative flex items-center justify-center">
            <Popover>
              <PopoverTrigger>
                <Image src={bell} alt="bell" className={"h-[32px] w-[32px] dark:invert dark:filter"} />
              </PopoverTrigger>
              <PopoverContent
                data-testid="notificationContent"
                align="end"
                className="w-fit border-none p-0 shadow-none"
              >
                <UnreadNotificationCard />
              </PopoverContent>
            </Popover>
            <span
              className={cn(
                "absolute right-1 top-0 h-[6px] w-[6px] rounded-full bg-mid-success",
                unreadCount > 0 ? "block" : "hidden",
              )}
            ></span>
          </div>
          <Profile />
        </section>
      </section>
      {/* <section className="relative z-[5] flex items-center justify-center p-4 lg:hidden">
        <SearchInput inputBackgroundColor="bg-low-grey-III" className="w-[100%]" />
      </section> */}
    </nav>
  );
};
