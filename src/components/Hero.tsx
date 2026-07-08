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
import { useHydratedReducedMotion } from "@/lib/use-hydrated-reduced-motion";
import { useIsMobile } from "@/lib/use-is-mobile";
import { site } from "@/lib/site";

/* On desktop the film gets a long pinned reveal; on mobile the pitch and CTAs
   must live in the first paint, so the scrub is much shorter and the clip
   opens nearly full-bleed. */
const DESKTOP = { scrollHeight: 1200, clipStart: 22, clipEnd: 78 };
const MOBILE = { scrollHeight: 600, clipStart: 8, clipEnd: 92 };

/** Scroll-linked fade + rise over a [start,end] slice of progress (0..1). */
function useReveal(progress: MotionValue<number>, start: number, end: number) {
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [34, 0]);
  return { opacity, y };
}

export function Hero() {
  const mobile = useIsMobile();
  // Remount on the mobile/desktop flip so every scroll mapping, clip range
  // and entrance rebinds to the right values (the flip happens once, right
  // after hydration, before any meaningful interaction).
  return <HeroContent key={mobile ? "mobile" : "desktop"} mobile={mobile} />;
}

function HeroContent({ mobile }: { mobile: boolean }) {
  const reduce = useHydratedReducedMotion();
  const { scrollHeight, clipStart, clipEnd } = mobile ? MOBILE : DESKTOP;
  const { scrollY } = useScroll();
  const progress = useTransform(scrollY, [0, scrollHeight], [0, 1], {
    clamp: true,
  });

  // Desktop: the kicker and first headline line enter on load, everything
  // after reveals in its own scroll slot. Mobile: the full headline, copy and
  // CTAs enter on load (nothing to tap otherwise); only the stats stay
  // scroll-choreographed.
  const line2 = useReveal(progress, 0.06, 0.16);
  const line3 = useReveal(progress, 0.14, 0.24);
  const para = useReveal(progress, 0.26, 0.38);
  const ctas = useReveal(progress, 0.4, 0.52);
  const stats = useReveal(progress, 0.54, 0.7);

  const cueOpacity = useTransform(progress, [0, 0.06], [1, 0]);
  // The cue is a real button (it skips the choreography); once it has faded
  // it must stop catching taps.
  const cuePointerEvents = useTransform(progress, (p) =>
    p > 0.06 ? ("none" as const) : ("auto" as const),
  );

  // Count the stats up when they actually reveal on screen (their reveal slot
  // starts at progress 0.54). Under reduced motion the hero isn't pinned, so
  // StatCounter's own in-view detection handles it (statsPlay stays false).
  const [statsOnScreen, setStatsOnScreen] = useState(false);
  useMotionValueEvent(progress, "change", (p) => {
    if (p >= 0.54) setStatsOnScreen(true);
  });
  const statsPlay = reduce ? false : statsOnScreen;

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

  // A scroll-choreographed element; reduced motion shows it in place.
  const slot = (r: {
    opacity: MotionValue<number>;
    y: MotionValue<number>;
  }) => {
    if (reduce)
      return { style: { opacity: 1, y: 0 }, transition: { duration: 0 } };
    return { style: r, transition: revealTransition };
  };

  // Fold element: scroll slot on desktop, load entrance on mobile.
  const foldSlot = (
    r: { opacity: MotionValue<number>; y: MotionValue<number> },
    mobileDelay: number,
  ) => (mobile ? enter(mobileDelay) : slot(r));

  const skipIntro = () =>
    window.scrollTo({
      top: scrollHeight,
      behavior: reduce ? "auto" : "smooth",
    });

  return (
    <SmoothScrollHero
      videoSrc="/hero-video.mp4"
      videoSrcMobile="/hero-video-mobile.mp4"
      posterSrc="/hero-poster.jpg"
      scrollHeight={scrollHeight}
      scrub
      initialClipPercentage={clipStart}
      finalClipPercentage={clipEnd}
    >
      <Container className="relative z-20 flex min-h-[100svh] flex-col pb-24 pt-24 [text-shadow:0_2px_22px_rgba(2,18,28,0.6)] sm:pb-12 sm:pt-32">
        <div className="flex flex-1 flex-col justify-center">
          <motion.div
            {...enter(0)}
            className="mb-6 flex items-center justify-center gap-4 sm:mb-8"
          >
            <span className="h-px w-8 bg-bone/25 sm:w-12" aria-hidden />
            <span className="text-center text-sm font-semibold uppercase tracking-[0.3em] text-bone sm:text-base">
              EGY-KEN Builders
            </span>
            <span className="h-px w-8 bg-bone/25 sm:w-12" aria-hidden />
          </motion.div>

          {/* items-start + offset keeps the rule on the first line when the
              kicker wraps on narrow screens */}
          <motion.div {...enter(0.1)} className="flex items-start gap-3">
            <span className="rule-amber mt-[7px] shrink-0" aria-hidden />
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-amber">
              Building &amp; Civil Engineering · Nairobi
            </span>
          </motion.div>

          <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.1rem,9.5vw,2.6rem)] font-semibold leading-[1.05] tracking-tight text-bone sm:mt-6 sm:text-6xl md:text-[4.25rem]">
            <motion.span {...enter(0.25)} className="block">
              We Build{" "}
              <span className="font-light italic text-amber">Landmark</span>
            </motion.span>
            <motion.span {...foldSlot(line2, 0.4)} className="block">
              Structures, Engineered
            </motion.span>
            <motion.span {...foldSlot(line3, 0.5)} className="block">
              to Last.
            </motion.span>
          </h1>

          <motion.p
            {...foldSlot(para, 0.65)}
            className="mt-4 max-w-xl text-sm leading-relaxed text-bone/80 sm:mt-7 sm:text-lg"
          >
            From high-rise residential towers to specialised sports
            infrastructure, EGY-KEN Builders delivers complex, high-end projects
            across East Africa, pairing elite local engineering with premium
            materials from Egypt and Turkey.
          </motion.p>

          <motion.div
            {...foldSlot(ctas, 0.8)}
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
          {...slot(stats)}
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

      {/* Scroll cue — tapping it skips the pinned choreography */}
      {!reduce && (
        <motion.div
          style={{ opacity: cueOpacity, pointerEvents: cuePointerEvents }}
          className="absolute inset-x-0 bottom-7 z-20 flex justify-center"
        >
          <button
            type="button"
            onClick={skipIntro}
            aria-label="Skip the intro animation"
            className="flex flex-col items-center gap-2 text-bone/70 transition-colors hover:text-bone focus-visible:text-bone"
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">
              Scroll
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25">
              <ChevronDown className="h-4 w-4 animate-scroll-nudge" />
            </span>
          </button>
        </motion.div>
      )}
    </SmoothScrollHero>
  );
}
