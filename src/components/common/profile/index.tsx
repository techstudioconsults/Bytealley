/* eslint-disable unicorn/consistent-function-scoping */
import Link from "next/link";
import { LuChevronDown } from "react-icons/lu";

import { logoutAction } from "~/actions/auth";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useSession } from "~/hooks/use-session";

export const Profile = () => {
  const { user } = useSession();

  const handleLogOut = async () => {
    await logoutAction();
    window.location.href = "/auth/login";
  };
  return (
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
          <Link href={`/dashboard/${user?.id}/profile`}>
            <DropdownMenuItem>Profile</DropdownMenuItem>
          </Link>
          <DropdownMenuItem onClick={handleLogOut} className="text-mid-danger">
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
