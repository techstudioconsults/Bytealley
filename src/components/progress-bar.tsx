"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export const Progress_Bar = () => {
  return <ProgressBar style="style" options={{ showSpinner: false }} shallowRouting />;
};
