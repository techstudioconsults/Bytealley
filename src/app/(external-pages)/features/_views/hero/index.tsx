import featureImg from "@/images/external/feature_hero_img.svg";

import { Hero } from "~/app/(external-pages)/_components/hero-layout";
import { Wrapper } from "~/components/layout/wrapper";
import { BlurImage } from "~/components/miscellaneous/blur-image";
import { FadeIn } from "~/lib/animations";

export const FeatureHero = () => {
  return (
    <Hero height="h-fit md:h-[544px]" bgColor="bg-low-coral">
      <Wrapper className={`max-w-3xl space-y-8 py-8 text-center`}>
        <h1 className="font-nr text-h1 text-high-warning sm:text-h1-sm md:text-h1-md">
          You customize your <br /> <span className={`text-mid-purple`}>product.</span>
        </h1>
        <FadeIn>
          <p className={`text-lg lg:text-2xl`}>
            With ByteAlley, selling your products online is hassle-free. You can showcase your work and let us handle
            the backend tasks, allowing you to concentrate on what you do best.
          </p>
        </FadeIn>
      </Wrapper>
      <Wrapper>
        <BlurImage priority alt={`dashboard`} width={1053} height={53} className={`h-auto w-auto`} src={featureImg} />
      </Wrapper>
    </Hero>
  );
};
