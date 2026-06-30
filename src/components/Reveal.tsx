"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useHydratedReducedMotion } from "@/lib/use-hydrated-reduced-motion";

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

  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
