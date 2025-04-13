import lines from "@/images/external/lines_and_stars.svg";

import { Hero } from "~/app/(external-pages)/_components/hero-layout";
import { SubscriptionCard } from "~/components/common/subscription-modal";
import { Wrapper } from "~/components/layout/wrapper";

export const PricingHero = () => {
  return (
    <Hero height="h-fit md:h-[956px]" bgImg={lines.src} bgColor="bg-low-warning">
      <Wrapper className={`max-w-3xl space-y-8 py-8 text-center`}>
        <h1 className="font-nr text-h1 text-high-warning sm:text-h1-sm md:text-h1-md">
          Access All Features With Our <br /> <span className={`text-mid-purple`}>30 Days Free Trial.</span>
        </h1>
        <p className={`text-lg lg:text-2xl`}>
          With ByteAlley, selling your products online is hassle-free. You can showcase your work and let us handle the
          backend tasks, allowing you to concentrate on what you do best.
        </p>
      </Wrapper>
      <Wrapper className={`w-full md:w-[600px]`}>
        <SubscriptionCard />
      </Wrapper>
    </Hero>
  );
};
