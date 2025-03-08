import { SharedSection } from "../_components/shared-section";
import { AboutHero } from "./_views/hero";
import { SectionOne } from "./_views/section-1";
import { SectionTwo } from "./_views/section-2";
import { SectionThree } from "./_views/section-3";
import { SectionFour } from "./_views/section-4";

const Page = () => {
  return (
    <section>
      <AboutHero />
      <SectionOne />
      <SectionTwo />
      <SectionThree />
      <SectionFour />
      <SharedSection
        title={"Join Our Thriving Creator Community"}
        desc={
          "Are you ready to embark on a creative journey like no other? ByteAlley is here to make it happen. Join our community of creators and buyers today."
        }
        btnText={"Join Now"}
      />
    </section>
  );
};

export default Page;
