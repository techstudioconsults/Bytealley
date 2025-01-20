"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

import Loading from "~/app/Loading";
import { withDependency } from "~/HOC/withDependencies";
import { AuthService } from "~/services/auth.service";
import { dependencies } from "~/utils/dependencies";

interface PreLoaderProperties {
  authService: AuthService;
}

function PreLoader({ authService }: PreLoaderProperties) {
  const router = useRouter();

  const googleRedirect = useCallback(
    async (code: string) => {
      const data = {
        provider: "google",
        code: code,
      };

      await authService.handleGoogleCallback(data, router);
    },
    [authService, router],
  );

  useEffect(() => {
    const url = window.location.href;
    const searchParameters = new URLSearchParams(new URL(url).search);
    const code = searchParameters.get("code");

    if (code) {
      googleRedirect(code);
    }
  }, [googleRedirect]);

  return <Loading />;
}

// Assuming you have AUTH_SERVICE_TOKEN defined in your dependencies container
const preloader = withDependency(PreLoader, {
  authService: dependencies.AUTH_SERVICE,
});

export default preloader;
