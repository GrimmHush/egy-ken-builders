"use client";

import * as React from "react";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface SmoothScrollHeroProps {
  /**
   * How many pixels of scrolling the reveal animation spans.
   * @default 700
   */
  scrollHeight?: number;
  /** Background video source (served from /public). */
  videoSrc: string;
  /** Optional poster image (also used as the loading frame). */
  posterSrc?: string;
  /**
   * Node shown instead of the video when the user prefers reduced motion
   * (e.g. an on-brand illustration). Falls back to the poster if omitted.
   */
  reducedMotionFallback?: React.ReactNode;
  /**
   * Clip-path inset at the start of the scroll (smaller = larger initial window).
   * @default 25
   */
  initialClipPercentage?: number;
  /**
   * Clip-path inset at the start of the scroll for the far corner.
   * @default 75
   */
  finalClipPercentage?: number;
  /** Overlay content (gradients, headline, CTAs…). Rendered above the video, never clipped. */
  children?: React.ReactNode;
  className?: string;
}

/**
 * Cinematic hero whose video background reveals from a centered window to
 * fullscreen as the page scrolls (clip-path + subtle scale). Overlay content
 * passed as `children` sits above the media and is never clipped.
 */
export function SmoothScrollHero({
  scrollHeight = 700,
  videoSrc,
  posterSrc,
  reducedMotionFallback,
  initialClipPercentage = 25,
  finalClipPercentage = 75,
  children,
  className,
}: SmoothScrollHeroProps) {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  const clipStart = useTransform(
    scrollY,
    [0, scrollHeight],
    [initialClipPercentage, 0],
  );
  const clipEnd = useTransform(
    scrollY,
    [0, scrollHeight],
    [finalClipPercentage, 100],
  );
  const clipPath = useMotionTemplate`polygon(${clipStart}% ${clipStart}%, ${clipEnd}% ${clipStart}%, ${clipEnd}% ${clipEnd}%, ${clipStart}% ${clipEnd}%)`;
  const scale = useTransform(scrollY, [0, scrollHeight + 500], [1.15, 1]);

  return (
    <div
      style={reduceMotion ? undefined : { height: `calc(${scrollHeight}px + 100svh)` }}
      className={cn("relative w-full", className)}
    >
      <div className="sticky top-0 min-h-[100svh] w-full overflow-hidden bg-navy-deep">
        {/* Media layer — clipped + scaled on scroll */}
        <motion.div
          className="absolute inset-0 z-0"
          style={reduceMotion ? undefined : { clipPath, willChange: "clip-path" }}
        >
          {reduceMotion ? (
            (reducedMotionFallback ??
              (posterSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={posterSrc}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : null))
          ) : (
            <motion.video
              style={{ scale, willChange: "transform" }}
              className="absolute inset-0 h-full w-full object-cover"
              src={videoSrc}
              poster={posterSrc}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden
            />
          )}
        </motion.div>

        {/* Overlay content (gradients, copy) — never clipped */}
        {children}
      </div>
    </div>
  );
}

export default SmoothScrollHero;
