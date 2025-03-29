import dashboardImg from "@/images/external/dashboard_img.svg";

import { DualLayout } from "~/app/(external-pages)/_components/layout/dual-layout";
import { DualSectionLayoutList } from "~/app/(external-pages)/_components/layout/dual-section-layout";
import { BlurImage } from "~/components/miscellaneous/blur-image";

export const SectionFour = () => {
  return (
    <DualLayout
      leftChild={
        <DualSectionLayoutList
          title="Helpful Information at your fingertips"
          headerClassName={`text-high-warning nr-font text-5xl xl:text-7xl`}
          subHeaderClassName={`text-high-warning xl:text-2xl`}
          subTitle="You can find out your best customers and what products sell better from your dashboard with ease. This can help you plan better."
          className={`px-4 lg:w-[530px] xl:px-0`}
        />
      }
      rightChild={
        <BlurImage width={500} height={500} src={dashboardImg} alt="img" className={"h-auto w-auto object-contain"} />
      }
      leftChildBgColor={"bg-mid-warning"}
      rightChildBgColor={"bg-low-purple"}
      leftChildClassName={`flex items-center`}
      rightChildClassName={`items-center`}
    />
  );
};
