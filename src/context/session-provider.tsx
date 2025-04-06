/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { createContext, useEffect, useState } from "react";

import { getUser } from "~/actions/auth";
import Loading from "~/app/Loading";
import { useLoading } from "~/hooks/use-loading";

export const SessionContext = createContext<ISessionContextType | undefined>(undefined);

const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const { isLoading, setLoading } = useLoading();

  useEffect(() => {
    const init = async () => {
      try {
        const initialUser = await getUser();
        setUser(initialUser);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return <SessionContext.Provider value={{ user, setUser }}>{children}</SessionContext.Provider>;
};

export default SessionProvider;
