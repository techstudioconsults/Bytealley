import coins from "@/images/external/feature_coin_img.svg";

import { DualLayout } from "~/app/(external-pages)/_components/layout/dual-layout";
import { DualSectionLayoutList } from "~/app/(external-pages)/_components/layout/dual-section-layout";
import { BlurImage } from "~/components/miscellaneous/blur-image";

export const SectionFive = () => {
  return (
    <DualLayout
      leftChild={
        <DualSectionLayoutList
          title="Making Money"
          headerClassName={`lg:text-white font-nr text-h1 sm:text-h1-sm md:text-h1-md`}
          subHeaderClassName={`lg:text-white xl:text-2xl`}
          subTitle="Make money with those genius ideas of yours by letting your products reach multitude of buyers without the hassle of marketing. Just list it on ByteAlley and get paid when they shop."
          className={`px-4 lg:w-[530px] xl:px-0`}
        />
      }
      rightChild={
        <BlurImage width={500} height={500} src={coins} alt="img" className={"h-auto w-auto object-contain"} />
      }
      leftChildBgColor={"bg-low-purple"}
      rightChildBgColor={"bg-high-purple"}
      leftChildClassName={`flex items-center`}
      rightChildClassName={`items-center`}
      className={`flex-row-reverse`}
    />
  );
};
