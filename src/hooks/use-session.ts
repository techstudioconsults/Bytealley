import { useContext } from "react";

import { SessionContext } from "~/context/session-provider";
import { SessionContextType } from "~/types";

export const useSession = (): SessionContextType => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
