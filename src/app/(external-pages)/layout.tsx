"use client";

import { usePathname } from "next/navigation";

import { ThemeProvider } from "~/context/theme-provider";
import { Footer } from "./_components/footer";
import { Navbar } from "./_components/navbar";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  if (pathname.startsWith("/explore")) {
    return <>{children}</>;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </ThemeProvider>
  );
}
