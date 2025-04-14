"use client";

import { useTheme } from "next-themes";
import { ReactNode, useEffect } from "react";

import { ThemeProvider } from "~/context/theme-provider";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <AuthWapper>{children}</AuthWapper>
    </ThemeProvider>
  );
};

export default AuthLayout;

const AuthWapper = ({ children }: { children: ReactNode }) => {
  const { setTheme } = useTheme();
  useEffect(() => {
    setTheme("light");
  }, [setTheme]);
  return <section className={`bg-[url('/images/bg-dark.svg')] bg-cover bg-center`}>{children}</section>;
};
