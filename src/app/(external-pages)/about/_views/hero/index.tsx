import lines from "@/images/external/about_hero_img.svg";

import { Hero } from "~/app/(external-pages)/_components/hero-layout";
import { Wrapper } from "~/components/layout/wrapper";

export const AboutHero = () => {
  return (
    <Hero height="h-fit lg:h-[340px]" bgImg={lines.src} bgColor="bg-low-warning">
      <Wrapper className={`max-w-3xl space-y-8 py-8 text-center`}>
        <h1 className="nr-font text-5xl font-black text-high-warning lg:text-7xl">About Us</h1>
        <p className={`text-lg lg:text-2xl`}>
          ByteAlley looks out for a better life with a money making system, no monthly charges. Just for you
        </p>
      </Wrapper>
    </Hero>
  );
};
