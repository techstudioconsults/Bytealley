import onboardingImage from "@/images/home_banner_illustration.svg";

import { DashboardBanner } from "../../_components/home-banner";

export const NewUser = () => {
  return (
    <section>
      <div>
        <DashboardBanner
          img={onboardingImage.src}
          title="Welcome to Byte Alley"
          desc="Complete your profile to start getting your products published."
        />
      </div>
    </section>
  );
};
