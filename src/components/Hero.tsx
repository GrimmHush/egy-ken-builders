"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SmoothScrollHero } from "@/components/ui/smooth-scroll-hero";
import { Container } from "@/components/Container";
import { CTA } from "@/components/CTA";
import { StatCounter } from "@/components/StatCounter";
import { useHydratedReducedMotion } from "@/lib/use-hydrated-reduced-motion";
import { site } from "@/lib/site";

const SCROLL_HEIGHT = 1200;
/* On phones the scrub distance is shorter: the copy enters on load instead
   of per-slot, so the track only needs to carry the video expansion. */
const SCROLL_HEIGHT_COMPACT = 620;

/** Scroll-linked fade + rise over a [start,end] slice of progress (0..1). */
function useReveal(progress: MotionValue<number>, start: number, end: number) {
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [34, 0]);
  return { opacity, y };
}

/** Hydration-safe "phone-sized viewport" flag; false on the server. */
function useCompactViewport(): boolean {
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setCompact(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return compact;
}

export function Hero() {
  const reduce = useHydratedReducedMotion();
  const compact = useCompactViewport();
  const trackHeight = compact ? SCROLL_HEIGHT_COMPACT : SCROLL_HEIGHT;
  const { scrollY } = useScroll();
  const progress = useTransform(scrollY, [0, trackHeight], [0, 1], {
    clamp: true,
  });

  // The kicker and first headline line enter on load, so the fold always
  // answers "who is this" before any scrolling. On larger screens everything
  // after reveals in its own scroll slot — line by line. On phones the whole
  // pitch enters on load: a mobile fold that withholds the value proposition
  // and CTAs behind 1,200px of scrub loses distracted visitors.
  const line2 = useReveal(progress, 0.06, 0.16);
  const line3 = useReveal(progress, 0.14, 0.24);
  const para = useReveal(progress, 0.26, 0.38);
  const ctas = useReveal(progress, 0.4, 0.52);
  const stats = useReveal(progress, 0.54, 0.7);

  const cueOpacity = useTransform(progress, [0, 0.06], [1, 0]);

  // Count the stats up when they actually reveal on screen (their reveal slot
  // starts at progress 0.54). On phones and under reduced motion the slot
  // doesn't apply, so StatCounter's own in-view detection takes over.
  const [statsOnScreen, setStatsOnScreen] = useState(false);
  useMotionValueEvent(progress, "change", (p) => {
    if (p >= 0.54) setStatsOnScreen(true);
  });
  const statsPlay = reduce || compact ? false : statsOnScreen;

  const revealTransition = reduce ? { duration: 0 } : undefined;

  // Load-time entrance for the always-visible fold elements.
  const enter = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.8,
            delay,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          },
        };

  // A choreographed element: scroll slot on larger screens, staggered
  // load entrance on phones.
  const slot = (
    r: { opacity: MotionValue<number>; y: MotionValue<number> },
    compactDelay: number,
  ) => {
    if (reduce)
      return { style: { opacity: 1, y: 0 }, transition: { duration: 0 } };
    if (compact) return enter(compactDelay);
    return { style: r, transition: revealTransition };
  };

  return (
    <SmoothScrollHero
      videoSrc="/hero-video.mp4"
      videoSrcMobile="/hero-video-mobile.mp4"
      posterSrc="/hero-poster.jpg"
      scrollHeight={trackHeight}
      scrub
      initialClipPercentage={22}
      finalClipPercentage={78}
    >
      <Container className="relative z-20 flex min-h-[100svh] flex-col pb-24 pt-24 [text-shadow:0_2px_22px_rgba(2,18,28,0.6)] sm:pb-12 sm:pt-32">
        <div className="flex flex-1 flex-col justify-center">
          <motion.div {...enter(0.1)} className="flex items-center gap-3">
            <span className="rule-amber" aria-hidden />
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-amber">
              Building &amp; Civil Engineering · Nairobi
            </span>
          </motion.div>

          <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.1rem,9.5vw,2.6rem)] font-semibold leading-[1.05] tracking-tight text-bone sm:mt-6 sm:text-6xl md:text-[4.25rem]">
            <motion.span {...enter(0.25)} className="block">
              We Build{" "}
              <span className="font-light italic text-amber">Landmark</span>
            </motion.span>
            <motion.span {...slot(line2, 0.4)} className="block">
              Structures, Engineered
            </motion.span>
            <motion.span {...slot(line3, 0.52)} className="block">
              to Last.
            </motion.span>
          </h1>

          <motion.p
            {...slot(para, 0.66)}
            className="mt-4 max-w-xl text-sm leading-relaxed text-bone/80 sm:mt-7 sm:text-lg"
          >
            From high-rise residential towers to specialised sports
            infrastructure, EGY-KEN Builders delivers complex, high-end projects
            across East Africa, pairing elite local engineering with premium
            materials from Egypt and Turkey.
          </motion.p>

          <motion.div
            {...slot(ctas, 0.8)}
            className="mt-6 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:items-center sm:gap-4"
          >
            <CTA href="/projects" variant="primary">
              View Our Projects
            </CTA>
            <CTA href="/contact" variant="light">
              Request a Quote
            </CTA>
          </motion.div>
        </div>

        <motion.div
          {...slot(stats, 0.95)}
          className="mt-6 grid grid-cols-2 gap-y-5 rounded-xl border border-white/10 bg-navy-deep/40 p-5 backdrop-blur-sm sm:mt-12 sm:grid-cols-4 sm:gap-y-8 sm:divide-x sm:divide-white/10 sm:p-7"
        >
          {site.stats.map((st) => (
            <div key={st.label} className="sm:px-6 sm:first:pl-0">
              <StatCounter
                value={st.value}
                suffix={st.suffix}
                label={st.label}
                play={statsPlay}
              />
            </div>
          ))}
        </motion.div>
      </Container>

      {/* Scroll cue */}
      {!reduce && (
        <motion.div
          style={{ opacity: cueOpacity }}
          className="pointer-events-none absolute inset-x-0 bottom-7 z-20 flex flex-col items-center gap-2 text-bone/70"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">
            Scroll
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25">
            <ChevronDown className="h-4 w-4 animate-scroll-nudge" />
          </span>
        </motion.div>
      )}
    </SmoothScrollHero>
  );
}
