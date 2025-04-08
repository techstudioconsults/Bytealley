"use client";

import Link from "next/link";

import { SectionLayout } from "~/app/(external-pages)/_components/layout/section-layout";
import { FaqAccordion } from "~/components/common/faq-accordion";
import { Wrapper } from "~/components/layout/wrapper";
import { WithDependency } from "~/HOC/withDependencies";
import { HelpService } from "~/services/help.service";
import { dependencies } from "~/utils/dependencies";

const BaseSectionOne = ({ helpService }: { helpService: HelpService }) => {
  return (
    <SectionLayout>
      <Wrapper className="grid gap-4 space-y-4 py-16 lg:grid-cols-2 lg:space-y-0 lg:py-32">
        <section className={`space-y-4`}>
          <h2 className="font-nr text-h2 sm:text-h2-sm md:text-h2-md text-center text-high-warning lg:text-left">
            Frequently asked questions
          </h2>
          <div className={`hidden lg:block`}>
            <p className="text-lg font-light xl:text-2xl">
              Haven’t found what you’re looking for? <br /> Try the
            </p>
            <Link className={`font-bold text-mid-purple underline`} href={`/contact`}>
              ByteAlley Help Center or Contact us
            </Link>
          </div>
        </section>
        <section>
          <FaqAccordion service={helpService} />
        </section>
        <section className={`text-center lg:hidden`}>
          <p className="text-lg font-light xl:text-2xl">
            Haven’t found what you’re looking for? <br /> Try the
          </p>
          <Link className={`font-bold text-mid-purple underline`} href={`/contact`}>
            ByteAlley Help Center or Contact us
          </Link>
        </section>
      </Wrapper>
    </SectionLayout>
  );
};

export const SectionOne = WithDependency(BaseSectionOne, {
  helpService: dependencies.HELP_SERVICE,
});
