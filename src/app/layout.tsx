import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import "./globals.scss";

import { SpeedInsights } from "@vercel/speed-insights/next";

import { LenisProvider } from "~/components/lenis-provider";
import { GotoTop } from "~/components/miscellaneous/goto-top";
import { Progress_Bar } from "~/components/progress-bar";
import { TooltipProvider } from "~/components/ui/tooltip";
import { LoadingProvider } from "~/context/loading-provider";
import SessionProvider from "~/context/session-provider";
import ToastProvider from "~/context/toast-provider";
import { getSession } from "~/lib/session/session";

// import { ReduxProvider } from "~/store/provider";

const montserrat = Montserrat({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "bytealley",
  description: "bytealley",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  return (
    <html lang="en">
      <body className={montserrat.className}>
        {/* <ReduxProvider> */}
        <LoadingProvider>
          <TooltipProvider>
            <SessionProvider session={session}>
              <ToastProvider>
                <GotoTop />
                <LenisProvider>
                  <main>
                    <Progress_Bar />
                    {children}
                    <SpeedInsights />
                  </main>
                </LenisProvider>
              </ToastProvider>
            </SessionProvider>
            {/* </ReduxProvider> */}
          </TooltipProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
