/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children, ...properties }: any) {
  return <NextThemesProvider {...properties}>{children}</NextThemesProvider>;
}
