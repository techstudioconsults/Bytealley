"use client";

import { Menu } from "lucide-react";
import { useRouter } from "next/navigation"; // Import useRouter
import { IoCartSharp } from "react-icons/io5";

import CustomButton from "~/components/common/common-button/common-button";
import { Logo } from "~/components/common/logo";
import { SearchInput } from "~/components/common/search-input";
import { Wrapper } from "~/components/layout/wrapper";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { WithDependency } from "~/HOC/withDependencies";
import { useProductCategories } from "~/hooks/use-product-categories";
import { useSession } from "~/hooks/use-session";
import { AppService } from "~/services/app.service";
import { dependencies } from "~/utils/dependencies";

const BaseExploreNavBar = ({ appService }: { appService: AppService }) => {
  const { user } = useSession();
  const categories = useProductCategories(appService);
  const router = useRouter(); // Initialize useRouter

  // Derive tags directly from categories
  const tags = ["All", ...categories.map((category: { name: string }) => category.name)];

  // Handle tag click
  const handleTagClick = (tag: string) => {
    const categoryParameter = tag.toLowerCase() === "all" ? "all" : tag.toLowerCase().replaceAll(/\s+/g, "-");
    router.push(`/explore?category=${categoryParameter}`);
  };

  return (
    <nav className="bg-mid-coral py-4">
      <Wrapper>
        {/* Top Section: Logo, Avatar, and Search */}
        <section className="flex flex-col items-center justify-between gap-4 lg:flex-row">
          <div className="flex w-full items-center justify-between lg:w-auto">
            <Logo width={100} height={50} className={`h-[50px] w-[100px] md:h-auto md:w-auto`} />
            {user ? (
              <div className="hidden lg:block">
                <Avatar>
                  <AvatarImage src={user?.logo || "https://github.com/shadcn.png"} />
                  <AvatarFallback>{user?.name[0]?.toUpperCase() || "U"}</AvatarFallback>
                </Avatar>
              </div>
            ) : (
              <CustomButton size={`xl`} className={`bg-mid-warning text-white lg:hidden`}>
                Create Account
              </CustomButton>
            )}
          </div>
          <div className="flex w-full items-center justify-between gap-6 lg:w-auto">
            {/* Mobile Menu Trigger */}
            <Sheet>
              <SheetTrigger className="lg:hidden">
                <Menu className="h-6 w-6" />
              </SheetTrigger>
              <SheetContent side="right">
                {/* Add NavigationLinks component or mobile menu content here */}
              </SheetContent>
            </Sheet>
            {/* Search Input */}
            <div className="flex-1 lg:flex-none">
              <SearchInput />
            </div>
            {/* Cart Icon */}
            <div className="text-2xl">
              <IoCartSharp />
            </div>
            {/* Create Account Button (Desktop) */}
            {!user && (
              <CustomButton size={`xl`} className={`hidden bg-mid-warning text-white lg:block`}>
                Create Account
              </CustomButton>
            )}
          </div>
        </section>

        {/* Bottom Section: Tags */}
        <section className="mt-4">
          <div className="flex flex-wrap justify-center gap-2">
            {tags.map((tag, index) => (
              <CustomButton
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleTagClick(tag)} // Add onClick handler
              >
                {tag.toUpperCase()}
              </CustomButton>
            ))}
          </div>
        </section>
      </Wrapper>
    </nav>
  );
};

export const ExploreNavbar = WithDependency(BaseExploreNavBar, {
  appService: dependencies.APP_SERVICE,
});
