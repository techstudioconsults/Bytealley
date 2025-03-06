import { Wrapper } from "~/components/layout/wrapper";

export const SectionLayout = ({
  height = "h-fit",
  bgColor = "bg-yellow-100",
  bgImg,
  children,
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
      <Wrapper>{children}</Wrapper>
    </section>
  );
};
