"use client";

import { LucideProps } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, ForwardRefExoticComponent, RefAttributes } from "react";

import { Logo } from "~/components/common/logo";
import { sideItems } from "~/utils/constants";

interface Iproperties {
  sideNavitems?: {
    route: string;
    link: string;
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
    id: string;
  }[];
}

const Sidebar: FC<Iproperties> = ({ sideNavitems = sideItems }) => {
  const pathname = usePathname();

  return (
    <>
      {/* Sidebar for large screens */}
      <div className="sticky top-0 hidden h-screen items-center justify-start space-y-[142px] overflow-y-auto border-r bg-white py-[14px] md:block md:w-[100px] md:px-4 lg:w-[252px]">
        <div className="m-auto hidden h-[60px] w-[90px] lg:block">
          <Logo />
        </div>
        <section className="flex flex-col items-center gap-[35px] md:items-stretch">
          {sideNavitems.map((item) => (
            <Link
              key={item.id}
              href={item.link}
              data-testid={item.id}
              role="sidebar-link"
              className={`${
                pathname.includes(item.id)
                  ? "border-0 border-l-4 border-primary bg-accent text-primary"
                  : "text-neutral-dark-2 bg-transparent hover:bg-gray-200"
              } flex items-center justify-center gap-2.5 rounded-full px-2.5 py-3 text-sm transition-all duration-300 ease-in md:h-auto md:w-auto md:justify-start md:rounded-sm`}
            >
              <item.icon className="h-5 w-5" role="sidebar-icon" />
              <span className="hidden lg:block">{item.route}</span>
            </Link>
          ))}
        </section>
      </div>

      {/* Bottom navigation for small-to-medium screens */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t bg-white p-2 md:hidden">
        {sideNavitems.map((item) => (
          <Link
            key={item.id}
            href={item.link}
            data-testid={item.id}
            role="bottom-nav-link"
            className={`${
              pathname.includes(item.id) ? "text-primary" : "text-neutral-dark-2 hover:text-primary"
            } flex flex-col items-center justify-center transition-all duration-300 ease-in`}
          >
            <item.icon size="16px" role="bottom-nav-icon" />
            <span className="hidden text-xs sm:block">{item.route}</span>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
