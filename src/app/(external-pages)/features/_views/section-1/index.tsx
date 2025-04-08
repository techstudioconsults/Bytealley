"use client";

import { SectionLayout } from "~/app/(external-pages)/_components/layout/section-layout";
import { Wrapper } from "~/components/layout/wrapper";

export const SectionOne = () => {
  return (
    <SectionLayout>
      <Wrapper className="max-w-[800px] py-16 text-center lg:py-32">
        <div className={`space-y-4`}>
          <h1 className="font-nr text-h1 sm:text-h1-sm md:text-h1-md text-high-warning">
            Grab visitors attention with detailed products.
          </h1>
          <p className="text-lg font-light xl:text-2xl">
            Create a detailed product description that allows visitors learn more about what you’re offering and get to
            know the process behind that product.
          </p>
        </div>
      </Wrapper>
    </SectionLayout>
  );
};
