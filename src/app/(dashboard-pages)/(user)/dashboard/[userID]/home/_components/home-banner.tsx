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
        "flex flex-col items-center gap-4 rounded-[9px] bg-primary",
        "bg-cover bg-right bg-no-repeat p-3",
        "sm:p-8",
        "md:flex-row md:items-center md:justify-between",
        `bg-[url(/images/lines.svg)]`,
      )}
    >
      <div className="w-full text-white md:w-auto">
        <h6 className="font-bold leading-7 text-white sm:text-xl sm:leading-8 md:max-w-[35rem] md:text-4xl md:leading-10">
          {title}
        </h6>
        <p className="mt-2 text-xs sm:mt-3 sm:text-sm md:mt-4 md:max-w-[35rem]">{desc}</p>
      </div>
      <div className="relative w-[180px] shrink-0 sm:w-[220px] md:w-[263px]">
        <Image src={img} alt="Banner image" width={227} height={125} className="object-contain" />
      </div>
    </div>
  );
};
