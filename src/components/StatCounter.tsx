"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

export function StatCounter({
  value,
  suffix = "",
  label,
  play = false,
}: {
  value: number;
  suffix?: string;
  label: string;
  /** Force the count to run (e.g. when a parent drives it from scroll). */
  play?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);
  const active = play || inView;

  useEffect(() => {
    if (!active) return;
    if (reduce) {
      setN(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const duration = 1500;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, reduce, value]);

  return (
    <div ref={ref} className="text-center sm:text-left">
      <div className="font-display text-4xl font-semibold tracking-tight text-bone sm:text-5xl">
        <span className="tabular-nums">{n}</span>
        <span className="text-amber">{suffix}</span>
      </div>
      <div className="mt-1.5 text-xs font-medium uppercase tracking-[0.16em] text-concrete">
        {label}
      </div>
    </div>
  );
}
