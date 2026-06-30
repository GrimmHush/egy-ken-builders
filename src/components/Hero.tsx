"use client";

import { useState } from "react";
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
import { BrandImage } from "@/components/BrandImage";
import { useHydratedReducedMotion } from "@/lib/use-hydrated-reduced-motion";
import { site } from "@/lib/site";

const SCROLL_HEIGHT = 1200;

/** Scroll-linked fade + rise over a [start,end] slice of progress (0..1). */
function useReveal(progress: MotionValue<number>, start: number, end: number) {
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [34, 0]);
  return { opacity, y };
}

export function Hero() {
  const reduce = useHydratedReducedMotion();
  const { scrollY } = useScroll();
  const progress = useTransform(scrollY, [0, SCROLL_HEIGHT], [0, 1], {
    clamp: true,
  });

  // Each element reveals in its own scroll slot — line by line.
  const kicker = useReveal(progress, 0.02, 0.1);
  const line1 = useReveal(progress, 0.1, 0.2);
  const line2 = useReveal(progress, 0.18, 0.28);
  const line3 = useReveal(progress, 0.26, 0.36);
  const para = useReveal(progress, 0.38, 0.5);
  const ctas = useReveal(progress, 0.52, 0.64);
  const stats = useReveal(progress, 0.66, 0.8);

  const cueOpacity = useTransform(progress, [0, 0.06], [1, 0]);

  // Count the stats up once scrolling has started.
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => {
    if (v > 40) setScrolled(true);
  });
  const statsPlay = reduce || scrolled;

  // Reduced motion: show everything in place, with no animation.
  const s = (r: { opacity: MotionValue<number>; y: MotionValue<number> }) =>
    reduce ? { opacity: 1, y: 0 } : r;
  const revealTransition = reduce ? { duration: 0 } : undefined;

  return (
    <SmoothScrollHero
      videoSrc="/hero-video.mp4"
      scrollHeight={SCROLL_HEIGHT}
      scrub
      initialClipPercentage={22}
      finalClipPercentage={78}
      reducedMotionFallback={<BrandImage seed={42} kind="hero" />}
    >
      <Container className="relative z-20 flex min-h-[100svh] flex-col pb-12 pt-28 [text-shadow:0_2px_22px_rgba(2,18,28,0.6)] sm:pt-32">
        <div className="flex flex-1 flex-col justify-center">
          <motion.div
            style={s(kicker)}
            transition={revealTransition}
            className="flex items-center gap-3"
          >
            <span className="rule-amber" aria-hidden />
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-amber">
              Building &amp; Civil Engineering · Nairobi
            </span>
          </motion.div>

          <h1 className="mt-6 max-w-3xl font-display text-[2.6rem] font-semibold leading-[1.05] tracking-tight text-bone sm:text-6xl md:text-[4.25rem]">
            <motion.span style={s(line1)} transition={revealTransition} className="block">
              We Build{" "}
              <span className="font-light italic text-amber">Landmark</span>
            </motion.span>
            <motion.span style={s(line2)} transition={revealTransition} className="block">
              Structures, Engineered
            </motion.span>
            <motion.span style={s(line3)} transition={revealTransition} className="block">
              to Last.
            </motion.span>
          </h1>

          <motion.p
            style={s(para)}
            transition={revealTransition}
            className="mt-7 max-w-xl text-base leading-relaxed text-concrete sm:text-lg"
          >
            From high-rise residential towers to specialised sports
            infrastructure, EGY-KEN Builders delivers complex, high-end projects
            across East Africa — pairing elite local engineering with premium
            materials from Egypt and Turkey.
          </motion.p>

          <motion.div
            style={s(ctas)}
            transition={revealTransition}
            className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center"
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
          style={s(stats)}
          transition={revealTransition}
          className="mt-12 grid grid-cols-2 gap-y-8 rounded-xl border border-white/10 bg-navy-deep/40 p-7 backdrop-blur-sm sm:grid-cols-4 sm:divide-x sm:divide-white/10"
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
          className="pointer-events-none absolute inset-x-0 bottom-7 z-20 flex flex-col items-center gap-2 text-concrete"
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
