import {
  DualSectionLayout,
  DualSectionLayoutList,
} from "~/app/(external-pages)/_components/layout/dual-section-layout";

export const SectionTwo = () => {
  return (
    <DualSectionLayout
      img="https://res.cloudinary.com/kingsleysolomon/image/upload/v1699951011/productize/Layer_1_3_hn7gd9_kdxcwg.png"
      imgClassName={`relative right-[5rem] top-[2rem]`}
      height="h-[641px]"
      leftSectionClassName="bg-high-purple items-center justify-center"
      rightSectionClassName="bg-mid-purple"
    >
      <DualSectionLayoutList
        title="Everyone can Buy & Sell on ByteAlley"
        headerClassName={`text-white nr-font text-5xl lg:text-7xl`}
        subHeaderClassName={`text-white text-2xl`}
        subTitle="Not really tech-savvy or just looking for a way to share that knowledge you think will be valuable to others, ByteAlley is here to cater to whatever your needs may be."
        iconColor="text-blue-500"
        className={`px-4 lg:w-[530px] lg:px-0`}
      />
    </DualSectionLayout>
  );
};
