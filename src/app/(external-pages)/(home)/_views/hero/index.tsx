import dashboardImg from "@/images/external/home_dashboard_img.svg";
import heroImg from "@/images/external/home_hero_img.svg";

import { Hero } from "~/app/(external-pages)/_components/hero-layout";
import { Wrapper } from "~/components/layout/wrapper";
import { BlurImage } from "~/components/miscellaneous/blur-image";
import { FadeIn } from "~/lib/animations";

export const HomeHero = () => {
  return (
    <Hero height="h-[530px] md:h-[674px]" bgImg={heroImg.src} bgColor="bg-mid-purple">
      <Wrapper className={`max-w-3xl space-y-8 py-8 text-center text-white`}>
        <h1 className="nr-font text-5xl font-black text-white lg:text-7xl">Monetize your skills with ease</h1>
        <FadeIn>
          <p className={`text-lg lg:text-2xl`}>
            With ByteAlley, selling your products online is hassle-free. You can showcase your work and let us handle
            the backend tasks, allowing you to concentrate on what you do best.
          </p>
        </FadeIn>
      </Wrapper>
      <Wrapper>
        <BlurImage priority alt={`dashboard`} width={1053} height={53} className={`h-auto w-auto`} src={dashboardImg} />
      </Wrapper>
    </Hero>
  );
};
