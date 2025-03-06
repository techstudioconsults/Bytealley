import { cn } from "~/utils/utils";

export const Hero = ({ children, height = "h-[400px]", bgImg, bgColor = "bg-gray-100" }: HeroProperties) => {
  return (
    <section
      className={cn(
        "flex w-full flex-col items-center p-4",
        height,
        bgColor,
        bgImg && "bg-contain bg-bottom bg-no-repeat",
      )}
      style={{
        backgroundImage: bgImg ? `url(${bgImg})` : undefined,
      }}
    >
      {children}
    </section>
  );
};

export default Hero;
