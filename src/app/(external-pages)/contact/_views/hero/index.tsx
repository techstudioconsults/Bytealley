import contactImg from "@/images/external/contact_hero_img.svg";

import { Hero } from "~/app/(external-pages)/_components/hero-layout";
import { Wrapper } from "~/components/layout/wrapper";

export const ContactHero = () => {
  return (
    <Hero height="h-fit lg:h-[340px]" bgImg={contactImg.src} bgColor="bg-low-coral">
      <Wrapper className={`max-w-3xl space-y-8 py-8 text-center`}>
        <h1 className="font-nr text-h1 text-high-warning sm:text-h1-sm md:text-h1-md">Contact Us</h1>
        <p className={`text-lg lg:text-2xl`}>
          If you have any questions or need further assistance, please reach out to our support team.
        </p>
      </Wrapper>
    </Hero>
  );
};
