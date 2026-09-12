"use client";

import { useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useEffect } from "react";

export function GearScrollDriver() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();

  useEffect(() => {
    document.documentElement.style.setProperty("--gear-turn", "0deg");
  }, [reduced]);

  useMotionValueEvent(scrollY, "change", (y) => {
    if (
      reduced ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      document.documentElement.style.setProperty("--gear-turn", "0deg");
      return;
    }
    document.documentElement.style.setProperty(
      "--gear-turn",
      `${Math.round(y * 0.14)}deg`,
    );
  });

  return null;
}
