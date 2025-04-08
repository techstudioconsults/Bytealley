"use client";

import Image from "next/image";

import { cn } from "~/utils/utils";

interface DashboardBannerProperties {
  img: string;
  title: string;
  desc: string;
}

export const DashboardBanner = ({ img, title, desc }: DashboardBannerProperties) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-4 rounded-[9px] bg-primary md:items-center md:justify-between 2xl:flex-row",
        "bg-cover bg-right bg-no-repeat p-3",
        "sm:p-8",
        `bg-[url(/images/lines.svg)]`,
      )}
    >
      <div className="w-full text-center text-white md:w-auto 2xl:text-left">
        <h3 className="text-h3 leading-10 sm:text-h3-sm md:text-h3-md">{title}</h3>
        <p className="mt-2 sm:mt-3 md:mt-4 md:max-w-[35rem]">{desc}</p>
      </div>
      <div className="relative w-[180px] shrink-0 sm:w-[220px] md:w-[263px]">
        <Image src={img} alt="Banner image" width={227} height={125} className="object-contain" />
      </div>
    </div>
  );
};
