import { SectionLayout } from "~/app/(external-pages)/_components/layout/section-layout";
import StatsGrid from "../_components/ratings-grid";

export const SectionTwo = () => {
  return (
    <SectionLayout className={`py-14`}>
      <StatsGrid />
    </SectionLayout>
  );
};
