import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.scss";

import { LenisProvider } from "~/components/lenis-provider";
import { GotoTop } from "~/components/miscellaneous/goto-top";
import { Progress_Bar } from "~/components/progress-bar";
import ToastProvider from "~/context/toast-provider";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Skicom",
  description: "Skicom",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider>
          <GotoTop />
          <LenisProvider>
            <main>
              <Progress_Bar />
              {children}
            </main>
          </LenisProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
