/* eslint-disable react-hooks/exhaustive-deps */
"use client";

// import { usePathname } from "next/navigation";
import { createContext, useEffect, useState } from "react";

import Loading from "~/app/Loading";
import { useLoading } from "~/hooks/use-loading";

export const SessionContext = createContext<ISessionContextType | undefined>(undefined);

const SessionProvider = ({ children, initialUser }: { children: React.ReactNode; initialUser: IUser | null }) => {
  const [user, setUser] = useState<IUser | null>(initialUser);
  const { isLoading, setLoading } = useLoading();

  useEffect(() => {
    try {
      setUser(initialUser);
    } finally {
      setLoading(false);
    }
  }, [initialUser]);

  if (isLoading) {
    return <Loading />;
  }

  return <SessionContext.Provider value={{ user, setUser }}>{children}</SessionContext.Provider>;
};

export default SessionProvider;
