import { useContext } from "react";

import { SessionContext } from "~/context/session-provider";

export const useSession = (): ISessionContextType => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
