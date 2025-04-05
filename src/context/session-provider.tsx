/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { usePathname } from "next/navigation";
import { createContext, useEffect, useState } from "react";

import Loading from "~/app/Loading";
import { useLoading } from "~/hooks/use-loading";
import { getSession } from "~/lib/session/session";

export const SessionContext = createContext<ISessionContextType | undefined>(undefined);

const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | undefined>();
  const { isLoading, setLoading } = useLoading();
  const pathname = usePathname();

  useEffect(() => {
    const getSessionData = async () => {
      try {
        const session = await getSession();
        setUser(session?.user);
      } catch {
        setUser(undefined);
      } finally {
        setLoading(false);
      }
    };

    getSessionData();
  }, [pathname]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SessionContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
