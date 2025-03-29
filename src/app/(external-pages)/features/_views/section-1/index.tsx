"use client";

import { SectionLayout } from "~/app/(external-pages)/_components/layout/section-layout";
import { Wrapper } from "~/components/layout/wrapper";
import { FadeIn } from "~/lib/animations";

export const SectionOne = () => {
  return (
    <SectionLayout>
      <Wrapper className="max-w-[800px] py-16 text-center lg:py-32">
        <div className={`space-y-4`}>
          <h1 className="nr-font text-5xl font-black text-high-warning xl:text-7xl">
            Grab visitors attention with detailed products.
          </h1>
          <FadeIn>
            <p className="text-lg font-light xl:text-2xl">
              Create a detailed product description that allows visitors learn more about what you’re offering and get
              to know the process behind that product.
            </p>
          </FadeIn>
        </div>
      </Wrapper>
    </SectionLayout>
  );
};
