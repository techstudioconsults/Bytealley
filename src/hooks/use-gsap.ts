/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const useGsap = (animation: (gsap: any, element: HTMLElement) => void) => {
  const reference = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!reference.current) return;

    const context = gsap.context(() => {
      animation(gsap, reference.current!);
    }, reference);

    return () => context.revert(); // Cleanup on unmount
  }, [animation]);

  return reference;
};

export default useGsap;
