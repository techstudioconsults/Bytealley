// utils/lazyLoad.ts
import { lazy } from "react";

export const lazyLoad = (path: string) => {
  return lazy(() => import(`~/app/(external-pages)${path}`));
};
