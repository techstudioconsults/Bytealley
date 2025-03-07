import coins from "@/images/external/feature_coin_img.svg";

import {
  DualSectionLayout,
  DualSectionLayoutList,
} from "~/app/(external-pages)/_components/layout/dual-section-layout";

export const SectionFive = () => {
  return (
    <DualSectionLayout
      img={coins}
      height="xl:h-[641px]"
      leftSectionClassName="bg-high-purple items-center justify-end lg:pr-24 py-10 text-center lg:text-left"
      rightSectionClassName="bg-low-purple"
      className={`flex-row-reverse`}
    >
      <DualSectionLayoutList
        title="Making Money"
        headerClassName={`text-white nr-font text-5xl xl:text-7xl`}
        subHeaderClassName={`text-white xl:text-2xl`}
        subTitle="Make money with those genius ideas of yours by letting your products reach multitude of buyers without the hassle of marketing. Just list it on ByteAlley and get paid when they shop."
        className={`px-4 lg:w-[530px] xl:px-0`}
      />
    </DualSectionLayout>
  );
};
