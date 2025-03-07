import dashboardImg from "@/images/external/dashboard_img.svg";

import {
  DualSectionLayout,
  DualSectionLayoutList,
} from "~/app/(external-pages)/_components/layout/dual-section-layout";

export const SectionFour = () => {
  return (
    <DualSectionLayout
      img={dashboardImg}
      height="xl:h-[641px]"
      leftSectionClassName="bg-mid-warning items-center justify-end lg:pr-24 py-10 text-center lg:text-left"
      rightSectionClassName="bg-low-purple"
    >
      <DualSectionLayoutList
        title="Helpful Information at your fingertips"
        headerClassName={`text-high-warning nr-font text-5xl xl:text-7xl`}
        subHeaderClassName={`text-high-warning xl:text-2xl`}
        subTitle="You can find out your best customers and what products sell better from your dashboard with ease. This can help you plan better."
        className={`px-4 lg:w-[530px] xl:px-0`}
      />
    </DualSectionLayout>
  );
};
