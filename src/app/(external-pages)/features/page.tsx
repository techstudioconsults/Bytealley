import { SharedSection } from "../_components/shared-section";
import { FeatureHero } from "./_views/hero";
import { SectionOne } from "./_views/section-1";
import { SectionTwo } from "./_views/section-2";
import { SectionThree } from "./_views/section-3";
import { SectionFour } from "./_views/section-4";
import { SectionFive } from "./_views/section-5";

const Page = () => {
  return (
    <section>
      <FeatureHero />
      <SectionOne />
      <SectionTwo />
      <SectionThree />
      <SectionFour />
      <SectionFive />
      <SharedSection
        title={"Get Monetized on ByteAlley"}
        desc={
          "With ByteAlley, turn your creativity into a lucrative business venture by showcasing and selling your work online."
        }
        btnText={"Create an Account"}
      />
    </section>
  );
};

export default Page;
