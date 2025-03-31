import type { Metadata, Viewport } from "next";
import { Montserrat, Newsreader } from "next/font/google";

import "./globals.scss";

import { SpeedInsights } from "@vercel/speed-insights/next";

import { LenisProvider } from "~/components/lenis-provider";
import { GotoTop } from "~/components/miscellaneous/goto-top";
import { TooltipProvider } from "~/components/ui/tooltip";
import { LoadingProvider } from "~/context/loading-provider";
import { ProgressProviders } from "~/context/progress-provider";
import SessionProvider from "~/context/session-provider";
import ToastProvider from "~/context/toast-provider";
import NotificationProvider from "~/features/push-notification/context/notification-provider";
import { PageTransition } from "~/lib/animations";
import { getSession } from "~/lib/session/session";
import { ReduxProvider } from "~/store/provider";

// Configure fonts
const montserrat = Montserrat({ subsets: ["latin"] });
const newsreader = Newsreader({ subsets: ["latin"], variable: "--font-newsreader" });

export const metadata: Metadata = {
  title: "bytealley",
  description: "bytealley",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 0.8,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  return (
    <html lang="en">
      <body className={`${montserrat.className} ${newsreader.variable}`}>
        <ReduxProvider>
          <LoadingProvider>
            <TooltipProvider>
              <SessionProvider session={session}>
                <NotificationProvider session={session}>
                  <ToastProvider>
                    <GotoTop />
                    <LenisProvider>
                      <PageTransition>
                        <ProgressProviders>{children}</ProgressProviders>
                        <SpeedInsights />
                      </PageTransition>
                    </LenisProvider>
                  </ToastProvider>
                </NotificationProvider>
              </SessionProvider>
            </TooltipProvider>
          </LoadingProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
