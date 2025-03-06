import dashboardImg from "@/images/external/dashboard_img.svg";

import {
  DualSectionLayout,
  DualSectionLayoutList,
} from "~/app/(external-pages)/_components/layout/dual-section-layout";

export const SectionTwo = () => {
  return (
    <DualSectionLayout
      img={dashboardImg}
      imgClassName={``}
      height="xl:h-[641px]"
      leftSectionClassName="bg-low-purple items-center justify-end lg:pr-24 py-10 text-center lg:text-left"
      rightSectionClassName="bg-high-grey-II"
    >
      <DualSectionLayoutList
        title="Create products with ease"
        headerClassName={`text-high-purple nr-font text-5xl xl:text-7xl`}
        subHeaderClassName={`text-high-purple xl:text-2xl`}
        subTitle="Products can be easily created on our platform without stress no matter what it is and how tech savvy or not you are."
        listItems={["Receive money from anywhere."]}
        iconColor="text-blue-500"
        shouldShowButton
        buttonText={`Get Started`}
        buttonClassName={`bg-mid-warning w-full`}
        className={`px-4 lg:w-[530px] xl:px-0`}
      />
    </DualSectionLayout>
  );
};
