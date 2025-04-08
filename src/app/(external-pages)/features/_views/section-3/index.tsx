"use client";

import { SectionLayout } from "~/app/(external-pages)/_components/layout/section-layout";
import { Wrapper } from "~/components/layout/wrapper";

export const SectionThree = () => {
  return (
    <SectionLayout>
      <Wrapper className="max-w-[800px] py-16 text-center lg:py-32">
        <div className={`space-y-4`}>
          <h1 className="font-nr text-h1 text-high-warning sm:text-h1-sm md:text-h1-md">Share your products.</h1>
          <p className="text-lg font-light xl:text-2xl">
            Explore our massive suite of design features and rich libraries of free visual content. They’re all
            customizable to make your site look just right.
          </p>
        </div>
      </Wrapper>
    </SectionLayout>
  );
};
