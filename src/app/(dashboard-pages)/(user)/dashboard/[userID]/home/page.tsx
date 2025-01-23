"use client";

import { Wrapper } from "~/components/layout/wrapper";
import { withDependency } from "~/HOC/withDependencies";
import { useSession } from "~/hooks/use-session";
import { AuthService } from "~/services/auth.service";
import { dependencies } from "~/utils/dependencies";
import { ActiveUser } from "./_views/active-user";
import { NewUser } from "./_views/new-user";
import { Onboarding } from "./_views/onboarding";

const UserHomePage = ({ authService, params }: { authService: AuthService; params: { userID: string } }) => {
  const { user } = useSession();

  // Create an array of completion steps for easier counting
  const completedSteps = [
    user?.email_verified,
    user?.profile_completed,
    user?.first_product_created,
    user?.payout_setup,
    user?.first_sale
  ].filter(Boolean).length;

  // Less than 4 steps completed -> Onboarding
  if (completedSteps < 3) {
    return (
      <Wrapper className="max-w-[751px]">
        <Onboarding params={params} authService={authService} />
      </Wrapper>
    );
  }

  // Exactly 4 steps completed -> NewUser
  if (completedSteps > 3 || completedSteps < 5) {
    return (
      <Wrapper className="max-w-[751px]">
        <NewUser />
      </Wrapper>
    );
  }

  // All 5 steps completed -> ActiveUser
  return (
    <Wrapper className="max-w-[751px]">
      {/* <ActiveUser authService={authService} params={params} /> */}
    </Wrapper>
  );
};

const HomePage = withDependency(UserHomePage, {
  authService: dependencies.AUTH_SERVICE,
});

export default HomePage;
