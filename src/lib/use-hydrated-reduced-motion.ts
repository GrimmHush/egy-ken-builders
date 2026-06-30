"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Hydration-safe reduced-motion preference.
 *
 * framer-motion's `useReducedMotion` reads `matchMedia` on the client's first
 * render, but the server has no `window` — so for users with "Reduce motion"
 * enabled the server and client first renders disagree, causing React hydration
 * mismatches when components branch on the value.
 *
 * This returns `false` on the server and during the first client render (so both
 * match), then the real preference after mount.
 */
export function useHydratedReducedMotion(): boolean {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? Boolean(prefersReducedMotion) : false;
}
