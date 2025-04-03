/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

import Loading from "~/app/Loading";
import { useSession } from "~/hooks/use-session";

const PreLoader = () => {
  const router = useRouter();
  const { handleGoogleCallback, user } = useSession();

  const googleRedirect = useCallback(
    async (code: string) => {
      if (user) {
        router.push(`/dashboard/${user.id}/home`);
        return;
      }

      await handleGoogleCallback({
        provider: "google",
        code: code,
      });
    },
    [router, user],
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
