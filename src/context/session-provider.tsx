/* eslint-disable no-console */
"use client";

import { createContext, ReactNode, useEffect, useState } from "react";

import { getSession } from "~/lib/session/session"; // Adjust the path to your getSession function

const SessionContext = createContext<ISessionContextType | undefined>(
  undefined,
);

const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<ISessionData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchSession = async () => {
    setLoading(true);
    try {
      const fetchedSession = await getSession();
      setSession(fetchedSession);
    } catch (error) {
      console.error("Failed to fetch session:", error);
      setSession(null); // Reset session on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSession();
  }, []);

  const refreshSession = async () => {
    await fetchSession();
  };

  return (
    <SessionContext.Provider value={{ session, loading, refreshSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
export { SessionContext };
