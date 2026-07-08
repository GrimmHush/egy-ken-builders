"use client";

import { useEffect, useState } from "react";

/** Hydration-safe viewport check: the server render assumes desktop, then the
 *  real value lands after mount (same pattern as useHydratedReducedMotion). */
export function useIsMobile(query = "(max-width: 767px)") {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);

  return mobile;
}
