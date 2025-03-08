import { SharedSection } from "../_components/shared-section";
import { ContactHero } from "./_views/hero";
import { ContactSection } from "./_views/section-1";

const page = () => {
  return (
    <section>
      <ContactHero />
      <ContactSection />
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

export default page;
