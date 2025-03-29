import shop from "@/images/external/about_shop.svg";

import { DualLayout } from "~/app/(external-pages)/_components/layout/dual-layout";
import { DualSectionLayoutList } from "~/app/(external-pages)/_components/layout/dual-section-layout";
import { BlurImage } from "~/components/miscellaneous/blur-image";

export const SectionThree = () => {
  return (
    <DualLayout
      leftChild={
        <DualSectionLayoutList
          title="Our Mission"
          headerClassName={`text-white nr-font text-5xl xl:text-7xl`}
          subHeaderClassName={`text-white xl:text-2xl`}
          subTitle="At ByteAlley, our mission is to empower creators and entrepreneurs to transform their ideas into successful digital products."
          iconColor="text-blue-500"
          listItems={[
            "Continuously enhancing our platform with cutting-edge features.",
            "Offering intuitive tools and resources that make it easy for anyone to create, market, and sell digital product",
            "Empowering our users with the knowledge and tools to grow their businesses and expand their reach.",
          ]}
          className={`px-4 text-white lg:w-[530px] xl:px-0`}
        />
      }
      rightChild={
        <BlurImage width={500} height={500} src={shop} alt="img" className={"h-auto w-auto object-contain"} />
      }
      leftChildBgColor={"bg-mid-coral"}
      rightChildBgColor={"bg-high-grey-II"}
      leftChildClassName={`flex items-center`}
      rightChildClassName={`items-end`}
      className={`flex-row-reverse`}
    />
  );
};
