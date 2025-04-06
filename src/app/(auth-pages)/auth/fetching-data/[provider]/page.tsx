"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

import { handleGoogleCallbackAction } from "~/actions/auth";
import Loading from "~/app/Loading";
import { useSession } from "~/hooks/use-session";

const PreLoader = () => {
  const router = useRouter();
  const { setUser } = useSession();

  const googleRedirect = useCallback(
    async (code: string) => {
      const user = await handleGoogleCallbackAction({
        provider: "google",
        code: code,
      });
      if (user) {
        setUser(user);
        router.push(`/dashboard/${user.id}/home`);
      }
    },
    [router, setUser],
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
