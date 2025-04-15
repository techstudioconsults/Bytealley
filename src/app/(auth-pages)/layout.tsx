"use client";

import { useTheme } from "next-themes";
import { ReactNode, useEffect } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <AuthWapper>{children}</AuthWapper>
    </>
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
