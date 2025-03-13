"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation"; // Import useSearchParams
import { IoCartSharp } from "react-icons/io5";

import CustomButton from "~/components/common/common-button/common-button";
import { Logo } from "~/components/common/logo";
import { Profile } from "~/components/common/profile";
import { SearchInput } from "~/components/common/search-input";
import { Wrapper } from "~/components/layout/wrapper";
import { Badge } from "~/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { WithDependency } from "~/HOC/withDependencies";
import { useCart } from "~/hooks/use-cart";
import { useProductCategories } from "~/hooks/use-product-categories";
import { useSession } from "~/hooks/use-session";
import { AppService } from "~/services/app.service";
import { dependencies } from "~/utils/dependencies";
import { cn } from "~/utils/utils";

const BaseExploreNavBar = ({ appService }: { appService: AppService }) => {
  const pathname = usePathname();
  const searchParameters = useSearchParams(); // Get search params
  const { user } = useSession();
  const categories = useProductCategories(appService);
  const { cart } = useCart();
  const router = useRouter();

  const tags = ["All", ...categories.map((category: { name: string }) => category.name)];
  const productRoute = pathname.includes(`product`) || pathname.includes(`cart`);

  const currentCategory = searchParameters.get("category") || "all";

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
            <Link href="/explore/cart">
              <div className="relative text-2xl">
                <IoCartSharp />
                {cart.length > 0 && (
                  <Badge
                    className={cn(
                      `absolute left-2 top-2 flex h-8 w-8 items-center justify-center rounded-full border-4`,
                      productRoute ? `border-low-grey-III` : `border-mid-coral`,
                    )}
                  >
                    {cart.length}
                  </Badge>
                )}
              </div>
            </Link>
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
              {tags.map((tag, index) => {
                const tagParameter = tag.toLowerCase() === "all" ? "all" : tag.toLowerCase().replaceAll(/\s+/g, "-");
                const isActive = currentCategory === tagParameter;

                return (
                  <CustomButton
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleTagClick(tag)}
                    className={cn(isActive && "bg-mid-warning")}
                  >
                    {tag.toUpperCase()}
                  </CustomButton>
                );
              })}
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
