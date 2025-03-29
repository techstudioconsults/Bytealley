import { Hero } from "~/app/(external-pages)/_components/hero-layout";
import { Wrapper } from "~/components/layout/wrapper";

export const TermsAndConditionsHero = () => {
  return (
    <Hero height="h-fit" bgColor="bg-mid-warning">
      <Wrapper className={`max-w-4xl space-y-8 py-8 text-center`}>
        <h1 className="nr-font text-5xl font-black lg:text-7xl">Terms And Conditions</h1>
        <p className={`text-lg lg:text-2xl`}>
          These Terms and Conditions govern your access and use of our website and digital products. By accessing or
          using Bytealley, you agree to comply with these terms.
        </p>
      </Wrapper>
    </Hero>
  );
};
