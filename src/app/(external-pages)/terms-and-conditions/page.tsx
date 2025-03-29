import { SharedSection } from "../_components/shared-section";
import { TermsAndConditionsHero } from "./_views/hero";
import { TermsAndConditions } from "./_views/section-1";

const page = () => {
  return (
    <section>
      <TermsAndConditionsHero />
      <TermsAndConditions />
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

export default page;
