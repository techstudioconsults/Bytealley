"use client";

import { Wrapper } from "~/components/layout/wrapper";
import { withDependency } from "~/HOC/withDependencies";
import { AuthService } from "~/services/auth.service";
import { dependencies } from "~/utils/dependencies";
import { Onboarding } from "./_views/onboarding";

const UserHomePage = ({ authService, params }: { authService: AuthService; params: { userID: string } }) => {
  return (
    <Wrapper className="max-w-[751px]">
      <Onboarding params={params} authService={authService} />
    </Wrapper>
  );
};

const HomePage = withDependency(UserHomePage, {
  authService: dependencies.AUTH_SERVICE,
});

export default HomePage;
