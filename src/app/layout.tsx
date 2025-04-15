import type { Metadata, Viewport } from "next";
import { Montserrat, Newsreader } from "next/font/google";

import "./globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";

import { GotoTop } from "~/components/miscellaneous/goto-top";
import { NetworkStatusModal } from "~/components/miscellaneous/network-error";
import { TooltipProvider } from "~/components/ui/tooltip";
import { LoadingProvider } from "~/context/loading-provider";
import { ProgressProviders } from "~/context/progress-provider";
import SessionProvider from "~/context/session-provider";
import ToastProvider from "~/context/toast-provider";
import NotificationProvider from "~/features/push-notification/context/notification-provider";
import { PageTransition } from "~/lib/animations";

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
  return (
    <html lang="en">
      <body className={`${montserrat.className} ${newsreader.variable}`}>
        <LoadingProvider>
          <TooltipProvider>
            <SessionProvider>
              <NotificationProvider>
                <ToastProvider>
                  <GotoTop />
                  <PageTransition>
                    <ProgressProviders>
                      <NetworkStatusModal />
                      {children}
                    </ProgressProviders>
                    <SpeedInsights />
                  </PageTransition>
                </ToastProvider>
              </NotificationProvider>
            </SessionProvider>
          </TooltipProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
