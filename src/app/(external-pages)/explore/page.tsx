"use client";

import { WithDependency } from "~/HOC/withDependencies";
import { AppService } from "~/services/app.service";
import { dependencies } from "~/utils/dependencies";
import { ExploreBanner } from "./_components/banner";
import { FeaturedProducts } from "./_views/featured";

const page = ({ appService }: { appService: AppService }) => {
  return (
    <section>
      <ExploreBanner />
      <FeaturedProducts appService={appService} />
    </section>
  );
};

const Explore = WithDependency(page, {
  appService: dependencies.APP_SERVICE,
});

export default Explore;
