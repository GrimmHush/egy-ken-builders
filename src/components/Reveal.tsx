"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useHydratedReducedMotion } from "@/lib/use-hydrated-reduced-motion";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "span";
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
}: RevealProps) {
  const reduce = useHydratedReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  // Content ships visible in the server HTML (no-JS, crawlers, print, slow
  // connections). Only elements still below the fold after hydration are
  // hidden and given the entrance animation.
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (el.getBoundingClientRect().top > window.innerHeight * 0.92) {
      setArmed(true);
    }
  }, []);

  const shown = !armed || inView || reduce;

  return (
    <motion.div
      ref={ref}
      className={cn("reveal", className)}
      initial={false}
      animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={
        shown
          ? { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }
          : { duration: 0 }
      }
    >
      {children}
    </motion.div>
  );
}
