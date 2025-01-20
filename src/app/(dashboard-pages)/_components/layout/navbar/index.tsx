"use client";

import { useRouter } from "next/navigation";
import { LuBell, LuChevronDown } from "react-icons/lu";

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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Separator } from "~/components/ui/separator";
import { withDependency } from "~/HOC/withDependencies";
import { useSession } from "~/hooks/use-session";
import { AuthService } from "~/services/auth.service";
import { dependencies } from "~/utils/dependencies";
import { UnreadNotificationCard } from "./notification";

const BaseDashboardNavbar = ({ authService }: { authService: AuthService }) => {
  const router = useRouter();
  const { session, loading } = useSession();

  const handleLogOut = async () => {
    await authService.logout(router);
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loader while session is being fetched
  }

  if (!session) {
    return <div>No session found</div>; // Handle the unauthenticated state
  }

  return (
    <nav
      className="sticky top-0 z-[1] border-b-[0.5px] border-border"
      role="navbar"
    >
      <section className="flex w-full items-center justify-between gap-[20px] bg-white px-[16px] py-[20px] lg:px-[32px]">
        <SearchInput
          inputBackgroundColor="bg-high-grey-I"
          className="w-[100%] lg:w-[460px]"
        />
        <section className="flex items-center justify-between gap-1 md:gap-2 lg:gap-4">
          <div className="relative flex items-center justify-center">
            <Popover>
              <PopoverTrigger>
                <LuBell
                  data-testid="bell"
                  className="text-neutral-dark-2 hover:text-neutral-dark-1 h-6 w-6 transition-colors duration-300 hover:cursor-pointer"
                />
              </PopoverTrigger>
              <PopoverContent
                data-testid="notificationContent"
                align="end"
                className="w-fit border-none p-0 shadow-none"
              >
                <UnreadNotificationCard
                  notificationsPreview={[
                    { header: "Check mail", time: "1 hour ago" },
                  ]}
                  unreadCount={30}
                />
              </PopoverContent>
            </Popover>
            <span className="bg-error absolute right-1 top-0 h-[6px] w-[6px] rounded-full"></span>
          </div>
          <Separator orientation="vertical" className="h-[45px]" />
          <div className="flex items-center gap-[10px]">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-[5px] focus:outline-none active:outline-none">
                <Avatar>
                  <AvatarImage
                    src={session.user.avatar || "https://github.com/shadcn.png"}
                  />
                  <AvatarFallback>
                    {session.user.name[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <p className="hidden lg:block">
                  {session.user.name || "Skicom Admin"}
                </p>
                <LuChevronDown className="hidden lg:block" size="20px" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="relative z-[999999]">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogOut}
                  className="text-mid-danger"
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </section>
      </section>
    </nav>
  );
};

const DashboardNavbar = withDependency(BaseDashboardNavbar, {
  authService: dependencies.AUTH_SERVICE,
});

export default DashboardNavbar;
