"use client";

import * as React from "react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { useHydratedReducedMotion } from "@/lib/use-hydrated-reduced-motion";

interface SmoothScrollHeroProps {
  /** How many pixels of scrolling the reveal/scrub spans. @default 1400 */
  scrollHeight?: number;
  /** Background video source (served from /public). */
  videoSrc: string;
  /** Optional poster image (also used as the loading frame). */
  posterSrc?: string;
  /** Node shown instead of the video when the user prefers reduced motion. */
  reducedMotionFallback?: React.ReactNode;
  /** When true, the video does not autoplay — its frame is scrubbed by scroll. */
  scrub?: boolean;
  /** Clip-path inset at the start of the scroll. @default 25 */
  initialClipPercentage?: number;
  /** Clip-path inset for the far corner at the start of the scroll. @default 75 */
  finalClipPercentage?: number;
  /** Overlay content — rendered above the video, never clipped. */
  children?: React.ReactNode;
  className?: string;
}

export function SmoothScrollHero({
  scrollHeight = 1400,
  videoSrc,
  posterSrc,
  reducedMotionFallback,
  scrub = false,
  initialClipPercentage = 25,
  finalClipPercentage = 75,
  children,
  className,
}: SmoothScrollHeroProps) {
  const reduceMotion = useHydratedReducedMotion();
  const videoRef = React.useRef<HTMLVideoElement>(null);
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
  const scale = useTransform(scrollY, [0, scrollHeight + 400], [1.05, 1]);

  // Scroll progress 0..1 used to scrub the video's currentTime.
  const progress = useTransform(scrollY, [0, scrollHeight], [0, 1], {
    clamp: true,
  });

  // Drive video frames from scroll: ease currentTime toward the scroll target.
  React.useEffect(() => {
    if (reduceMotion || !scrub) return;
    let raf = 0;
    const loop = () => {
      const v = videoRef.current;
      if (v && v.duration && !Number.isNaN(v.duration)) {
        const target = progress.get() * v.duration;
        const current = v.currentTime;
        const next = current + (target - current) * 0.12;
        if (Math.abs(target - current) > 0.015) {
          try {
            v.currentTime = next;
          } catch {
            /* seeking not ready yet */
          }
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduceMotion, scrub, progress]);

  const useScrub = scrub && !reduceMotion;

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
              ref={videoRef}
              style={{ scale, willChange: "transform" }}
              className="absolute inset-0 h-full w-full object-cover"
              src={videoSrc}
              poster={posterSrc}
              autoPlay={!useScrub}
              loop={!useScrub}
              muted
              playsInline
              preload="auto"
              aria-hidden
              onLoadedMetadata={(e) => {
                if (!useScrub) return;
                const v = e.currentTarget;
                // Prime the decoder so scrubbed frames render, then hold on frame 0.
                v.play()
                  .then(() => {
                    v.pause();
                    v.currentTime = 0;
                  })
                  .catch(() => {});
              }}
            />
          )}
        </motion.div>

        {/* Overlay content — never clipped */}
        {children}
      </div>
    </div>
  );
}

export default SmoothScrollHero;
