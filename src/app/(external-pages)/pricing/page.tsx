import { SharedSection } from "../_components/shared-section";
import { PricingHero } from "./_views/hero";
import { SectionOne } from "./_views/section-1";

const Page = () => {
  return (
    <section>
      <PricingHero />
      <SectionOne />
      <SharedSection
        title={"Ready To Explore Our Marketplace?"}
        desc={
          "With ByteAlley, turn your creativity into a lucrative business venture by showcasing and selling your work online."
        }
        btnText={"Start Selling"}
      />
    </section>
  );
};

export default Page;
