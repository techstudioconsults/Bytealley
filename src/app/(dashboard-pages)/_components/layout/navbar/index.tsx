"use client";

import bell from "@/icons/Property_2_Notifications_1_w4v7g4.svg";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LuChevronDown } from "react-icons/lu";

import { SearchInput } from "~/components/common/search-input";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { useSession } from "~/hooks/use-session";
import { Drawer } from "../drawer/drawer";
import { UnreadNotificationCard } from "./notification";

export const DashboardNavbar = () => {
  const pathname = usePathname();
  const title = pathname.split("/")[3].charAt(0).toUpperCase() + pathname.split("/")[3].slice(1);
  const { user, logout } = useSession();

  const handleLogOut = async () => {
    await logout();
  };

  return (
    <nav className="sticky top-0 z-[5] border-b-[0.5px] border-border" role="navbar">
      <section className="flex w-full items-center justify-between gap-[20px] bg-white px-[16px] py-[20px] lg:px-[32px]">
        <div className={`flex items-center gap-4`}>
          <Drawer />
          <h6 className="font-semibold">{title}</h6>
        </div>
        <section className="flex items-center justify-between gap-1 md:gap-2 lg:gap-6">
          <SearchInput inputBackgroundColor="bg-low-grey-III" className="hidden w-[100%] lg:flex lg:w-[270px]" />
          <div className="relative flex items-center justify-center">
            <Popover>
              <PopoverTrigger>
                <Image src={bell} alt="bell" className={"h-[32px] w-[32px]"} />
              </PopoverTrigger>
              <PopoverContent
                data-testid="notificationContent"
                align="end"
                className="w-fit border-none p-0 shadow-none"
              >
                <UnreadNotificationCard
                  notificationsPreview={[{ header: "Check mail", time: "1 hour ago" }]}
                  unreadCount={30}
                />
              </PopoverContent>
            </Popover>
            <span className="bg-error absolute right-1 top-0 h-[6px] w-[6px] rounded-full"></span>
          </div>
          <div className="flex items-center gap-[10px]">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-[5px] focus:outline-none active:outline-none">
                <Avatar>
                  <AvatarImage src={user?.logo || "https://github.com/shadcn.png"} />
                  <AvatarFallback>{user?.name[0]?.toUpperCase() || "U"}</AvatarFallback>
                </Avatar>
                <p className="hidden lg:block">{user?.username || user?.name || "Byte alley User"}</p>
                <LuChevronDown className="hidden lg:block" size="20px" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="relative z-[999999]">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogOut} className="text-mid-danger">
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </section>
      </section>
      <section className="relative z-[5] flex items-center justify-center bg-white p-4 lg:hidden">
        <SearchInput inputBackgroundColor="bg-low-grey-III" className="w-[100%]" />
      </section>
    </nav>
  );
};
