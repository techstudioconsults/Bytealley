"use client";

import { ReactLenis } from "lenis/react";

export const LenisProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1, // Adjust smoothing amount
        wheelMultiplier: 1, // Try adjusting this
        touchMultiplier: 2, // For touch devices
        smoothWheel: true, // Ensure this is true
      }}
    >
      {children}
    </ReactLenis>
  );
};
