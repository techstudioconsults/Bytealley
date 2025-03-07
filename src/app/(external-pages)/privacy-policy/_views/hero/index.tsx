import { Hero } from "~/app/(external-pages)/_components/hero-layout";
import { Wrapper } from "~/components/layout/wrapper";

export const TermsAndConditionsHero = () => {
  return (
    <Hero height="h-fit" bgColor="bg-mid-purple">
      <Wrapper className={`max-w-4xl space-y-8 py-16 text-center`}>
        <h1 className="nr-font text-5xl font-black text-white lg:text-7xl">Privacy Policy</h1>
      </Wrapper>
    </Hero>
  );
};
