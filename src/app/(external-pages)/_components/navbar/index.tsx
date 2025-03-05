"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LuChevronDown } from "react-icons/lu";

import CustomButton from "~/components/common/common-button/common-button";
import { BlurImage } from "~/components/miscellaneous/blur-image";
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
import { externalNavlinks } from "~/utils/constants";
import { cn } from "~/utils/utils";

export function Navbar() {
  const { user } = useSession();
  const pathname = usePathname();
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll event
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsNavbarVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsNavbarVisible(true);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getRouteTheme = (): string => {
    const colorMap: { [key: string]: string } = {
      "/": "text-mid-grey-I bg-mid-purple",
      "/features": "text-mid-grey-III",
      "/pricing": "text-mid-grey-III",
    };
    return colorMap[pathname as string] || "text-mid-grey-III";
  };

  return (
    <nav
      className={cn(
        getRouteTheme(),
        `sticky top-0 z-50 w-full backdrop-blur-sm transition-transform duration-300`,
        isNavbarVisible ? "translate-y-0" : "-translate-y-full",
      )}
    >
      <div className="mx-auto flex h-20 max-w-[1120px] items-center justify-between px-4 xl:px-0">
        <Link href="/seller">
          <BlurImage
            alt={`bytealley`}
            width={100}
            height={50}
            className={`h-[50px] w-[100px]`}
            src={`/images/logo.svg`}
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-8 lg:flex">
          {externalNavlinks.map((link) =>
            link.type === "dropdown" ? (
              <DropdownMenu key={link.id}>
                <DropdownMenuTrigger asChild>
                  <p className={cn(getRouteTheme(), "flex items-center gap-1 text-sm font-bold")}>
                    <span>{link.name}</span>
                    <ChevronDown className="h-4 w-4" />
                  </p>
                </DropdownMenuTrigger>
                <DropdownMenuContent className={cn("w-48 rounded-md bg-white p-2 shadow-lg")}>
                  {link.subLinks?.map((subLink) => (
                    <DropdownMenuItem key={subLink.id} asChild>
                      <Link href={subLink.path} className="block px-4 py-2 text-sm hover:bg-gray-100">
                        {subLink.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={link.id}
                href={link.path}
                className={cn(getRouteTheme(), "text-sm font-bold transition-colors")}
              >
                {link.name}
              </Link>
            ),
          )}
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-[5px] focus:outline-none active:outline-none">
                <Avatar>
                  <AvatarImage src={user?.logo || "https://github.com/shadcn.png"} />
                  <AvatarFallback>{user?.name[0]?.toUpperCase() || "U"}</AvatarFallback>
                </Avatar>
                <p className="hidden lg:block">{user?.username || user?.name || "Byte alley User"}</p>
                <LuChevronDown className="hidden lg:block" size="20px" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className={cn("relative z-[999999]")}>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href={`/dashboard/${user?.id}/home`}>
                  <DropdownMenuItem>Dashboard</DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link className="hidden lg:flex" href="/auth/login">
                <CustomButton size={`xl`} variant={`ghost`}>
                  Login
                </CustomButton>
              </Link>
              <Link href="/auth/login">
                <CustomButton size={`xl`} className={`bg-mid-warning`} variant={`primary`}>
                  Get Started
                </CustomButton>
              </Link>
            </>
          )}
          <CustomButton
            size={`icon`}
            variant={`ghost`}
            isIconOnly
            icon={isMobileMenuOpen ? <X /> : <Menu />}
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          getRouteTheme(),
          "fixed left-0 top-20 z-40 w-full overflow-hidden shadow-md transition-all duration-700 lg:hidden",
          isMobileMenuOpen ? "h-auto opacity-100" : "h-0 opacity-0",
        )}
      >
        <div className="flex flex-col gap-4 p-4">
          {externalNavlinks.map((link) =>
            link.type === "dropdown" ? (
              <DropdownMenu key={link.id}>
                <DropdownMenuTrigger asChild>
                  <p className={cn(getRouteTheme(), "flex w-full items-center justify-start gap-1 text-sm font-bold")}>
                    <span>{link.name}</span>
                    <ChevronDown className="h-4 w-4" />
                  </p>
                </DropdownMenuTrigger>
                <DropdownMenuContent className={cn("w-48 rounded-md bg-white p-2 shadow-lg")}>
                  {link.subLinks?.map((subLink) => (
                    <DropdownMenuItem key={subLink.id} asChild>
                      <Link href={subLink.path} className="block px-4 py-2 text-sm hover:bg-gray-100">
                        {subLink.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={link.id}
                href={link.path}
                className={cn(getRouteTheme(), "text-sm font-bold transition-colors")}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ),
          )}
        </div>
      </div>
    </nav>
  );
}
