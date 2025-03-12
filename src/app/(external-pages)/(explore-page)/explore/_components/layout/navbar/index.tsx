"use client";

import { Menu } from "lucide-react";
import { usePathname, useRouter } from "next/navigation"; // Import useRouter
import { IoCartSharp } from "react-icons/io5";



import CustomButton from "~/components/common/common-button/common-button";
import { Logo } from "~/components/common/logo";
import { Profile } from "~/components/common/profile";
import { SearchInput } from "~/components/common/search-input";
import { Wrapper } from "~/components/layout/wrapper";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { WithDependency } from "~/HOC/withDependencies";
import { useProductCategories } from "~/hooks/use-product-categories";
import { useSession } from "~/hooks/use-session";
import { AppService } from "~/services/app.service";
import { dependencies } from "~/utils/dependencies";
import { cn } from "~/utils/utils";


const BaseExploreNavBar = ({ appService }: { appService: AppService }) => {
  const pathname = usePathname();
  const { user } = useSession();
  const categories = useProductCategories(appService);
  const router = useRouter();

  const tags = ["All", ...categories.map((category: { name: string }) => category.name)];
  const productRoute = pathname.includes(`product`);

  const handleTagClick = (tag: string) => {
    const categoryParameter = tag.toLowerCase() === "all" ? "all" : tag.toLowerCase().replaceAll(/\s+/g, "-");
    router.push(`/explore?category=${categoryParameter}`);
  };

  return (
    <nav className={cn("bg-mid-coral py-4", productRoute && `bg-low-grey-III`)}>
      <Wrapper>
        <section className="flex flex-col items-center justify-between gap-4 lg:flex-row">
          <div className="flex w-full items-center justify-between lg:w-auto">
            <Logo width={100} height={50} className={`h-[50px] w-[100px] md:h-auto md:w-auto`} />
            <div className={`lg:hidden`}>
              {user ? (
                <Profile />
              ) : (
                <CustomButton size={`xl`} className={`bg-mid-warning text-white`}>
                  Create Account
                </CustomButton>
              )}
            </div>
          </div>
          <div className="flex w-full items-center justify-between gap-6 lg:w-auto">
            <Sheet>
              <SheetTrigger className="lg:hidden">
                <Menu className="h-6 w-6" />
              </SheetTrigger>
              <SheetContent side="right">
                {/* Add NavigationLinks component or mobile menu content here */}
              </SheetContent>
            </Sheet>
            <div className="flex-1 lg:flex-none">
              <SearchInput />
            </div>
            <div className="text-2xl">
              <IoCartSharp />
            </div>
            <div className={`hidden lg:block`}>
              {user ? (
                <Profile />
              ) : (
                <CustomButton size={`xl`} className={`bg-mid-warning text-white`}>
                  Create Account
                </CustomButton>
              )}
            </div>
          </div>
        </section>
        {!productRoute && (
          <section className="mt-4">
            <div className="flex flex-wrap justify-center gap-2">
              {tags.map((tag, index) => (
                <CustomButton key={index} variant="outline" size="sm" onClick={() => handleTagClick(tag)}>
                  {tag.toUpperCase()}
                </CustomButton>
              ))}
            </div>
          </section>
        )}
      </Wrapper>
    </nav>
  );
};

export const ExploreNavbar = WithDependency(BaseExploreNavBar, {
  appService: dependencies.APP_SERVICE,
});