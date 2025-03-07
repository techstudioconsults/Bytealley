import { Wrapper } from "~/components/layout/wrapper";
import { cn } from "~/utils/utils";

export const SectionLayout = ({
  height = "h-fit",
  bgColor = "",
  bgImg,
  children,
  className,
  ...properties
}: SectionLayoutProperties) => {
  return (
    <section
      className={`w-full ${height} ${bgColor}`}
      style={{
        backgroundImage: bgImg ? `url(${bgImg})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Wrapper className={cn(className)} {...properties}>
        {children}
      </Wrapper>
    </section>
  );
};
