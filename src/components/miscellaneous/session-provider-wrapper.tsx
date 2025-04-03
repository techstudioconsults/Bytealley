// src/components/SessionProviderWrapper.tsx
import { getSession } from "~/actions/session";
import SessionProvider from "~/context/session-provider";

export default async function SessionProviderWrapper({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  return <SessionProvider initialSession={session}>{children}</SessionProvider>;
}
