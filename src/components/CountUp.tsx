"use client";

import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  to: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

function formatRu(value: number) {
  return value.toLocaleString("ru-RU").replace(/\u00a0/g, " ");
}

export function CountUp({
  to,
  prefix = "",
  suffix = "",
  className,
}: CountUpProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [shown, setShown] = useState(reduced ? to : 0);

  useEffect(() => {
    if (reduced) {
      setShown(to);
      return;
    }
    if (!inView) {
      return;
    }

    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / 1300);
      const eased = 1 - (1 - progress) ** 3;
      setShown(Math.round(to * eased));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduced, to]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatRu(shown)}
      {suffix}
    </span>
  );
}
