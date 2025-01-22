"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

import Loading from "~/app/Loading";
import { useSession } from "~/hooks/use-session";

function PreLoader() {
  const router = useRouter();
  const { handleGoogleCallback } = useSession();

  const googleRedirect = useCallback(
    async (code: string) => {
      const data = {
        provider: "google",
        code: code,
      };

      await handleGoogleCallback(data, router);
    },
    [handleGoogleCallback, router],
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

export default PreLoader;
