"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

import Loading from "~/app/Loading";
import { useSession } from "~/hooks/use-session";
import { getSession } from "~/lib/session/session";

const PreLoader = () => {
  const router = useRouter();
  const { handleGoogleCallback } = useSession();

  const googleRedirect = useCallback(
    async (code: string) => {
      // Check if we already have a valid session
      const session = await getSession();
      if (session?.user) {
        router.push(`/dashboard/${session.user.id}/home`);
        return;
      }

      const data = {
        provider: "google",
        code: code,
      };

      await handleGoogleCallback(data);
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

  return <Loading text={`Getting credentials from Google...`} />;
};

export default PreLoader;
