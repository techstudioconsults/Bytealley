import moneyTree from "@/images/external/money_tree.svg";

import { DualLayout } from "~/app/(external-pages)/_components/layout/dual-layout";
import { DualSectionLayoutList } from "~/app/(external-pages)/_components/layout/dual-section-layout";
import { BlurImage } from "~/components/miscellaneous/blur-image";

export const SectionTwo = () => {
  return (
    <DualLayout
      leftChild={
        <DualSectionLayoutList
          title="Everyone can Buy & Sell on ByteAlley"
          headerClassName={`text-white nr-font text-5xl xl:text-7xl`}
          subHeaderClassName={`text-white xl:text-2xl`}
          subTitle="Not really tech-savvy or just looking for a way to share that knowledge you think will be valuable to others, ByteAlley is here to cater to whatever your needs may be."
        />
      }
      rightChild={
        <BlurImage width={500} height={500} src={moneyTree} alt="img" className={"h-auto w-auto object-contain"} />
      }
      leftChildBgColor={"bg-high-purple"}
      rightChildBgColor={"bg-mid-purple"}
      leftChildClassName={`flex items-center`}
      rightChildClassName={`items-end`}
    />
  );
};
