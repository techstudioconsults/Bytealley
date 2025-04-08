"use client";

import React from "react";

import { StepCard } from "~/app/(external-pages)/(home)/_views/section-3/_components/step-card";
import { Wrapper } from "~/components/layout/wrapper";
import { aboutSteps } from "~/utils/constants";

export const SectionFour: React.FC = () => {
  return (
    <section className="py-24">
      <Wrapper className={`max-w-[1240px]`}>
        <Wrapper className={`max-w-[800px] text-center`}>
          <h1 className="font-nr text-h1 sm:text-h1-sm md:text-h1-md mb-4 leading-tight">Why Choose ByteAlley</h1>
        </Wrapper>
        <Wrapper className="px-4 py-20 xl:px-0">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
            {aboutSteps.map((step, index) => (
              <StepCard key={index} title={step.title} description={step.description} />
            ))}
          </div>
        </Wrapper>
      </Wrapper>
    </section>
  );
};
