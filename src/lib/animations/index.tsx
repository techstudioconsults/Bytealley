"use client";

import gsap from "gsap";
import { useEffect } from "react";

import { ThemeProvider } from "~/context/theme-provider";
import useGsap from "~/hooks/use-gsap";

export const FadeIn = ({ children }: { children: React.ReactNode }) => {
  const reference = useGsap((gsap, element) => {
    gsap.fromTo(
      element,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: element, // Start animation when this element enters the viewport
          start: "top 80%", // Animation starts when the top of the element is 80% into the viewport
          end: "top 20%", // Animation ends when it's 20% in the viewport
          toggleActions: "play none none none", // Plays only once
        },
      },
    );
  });

  return (
    <div ref={reference} className="gpu-optimized">
      {children}
    </div>
  );
};

export const PageTransition = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    gsap.fromTo("body", { opacity: 0 }, { opacity: 1, duration: 1, ease: "power2.out" });
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <main className={`gpu-optimized`}>{children}</main>
    </ThemeProvider>
  );
};
