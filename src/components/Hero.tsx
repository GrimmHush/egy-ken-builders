"use client";

import { useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { SmoothScrollHero } from "@/components/ui/smooth-scroll-hero";
import { Container } from "@/components/Container";
import { CTA } from "@/components/CTA";
import { StatCounter } from "@/components/StatCounter";
import { BrandImage } from "@/components/BrandImage";
import { useHydratedReducedMotion } from "@/lib/use-hydrated-reduced-motion";
import { site } from "@/lib/site";

const SCROLL_HEIGHT = 700;
const APPEAR_END = 320; // content is fully in by this scroll position, then stays

export function Hero() {
  const reduce = useHydratedReducedMotion();
  const { scrollY } = useScroll();

  // Drive the stat count from scroll so the numbers tick up as the hero appears
  // (reduced-motion users see the hero immediately, so play right away).
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => {
    if (v > 40) setScrolled(true);
  });
  const statsPlay = reduce || scrolled;

  // The hero APPEARS with the scroll: content fades + rises into view and the
  // legibility gradient fades in alongside it, then both stay.
  const contentOpacity = useTransform(scrollY, [0, APPEAR_END], [0, 1]);
  const contentY = useTransform(scrollY, [0, APPEAR_END], [60, 0]);
  const overlayOpacity = useTransform(scrollY, [0, APPEAR_END], [0, 1]);

  // Reduced motion: skip the scroll choreography — show the hero fully.
  const contentStyle = reduce ? undefined : { opacity: contentOpacity, y: contentY };
  const overlayStyle = reduce ? undefined : { opacity: overlayOpacity };

  return (
    <SmoothScrollHero
      videoSrc="/hero-video.mp4"
      scrollHeight={SCROLL_HEIGHT}
      initialClipPercentage={22}
      finalClipPercentage={78}
      reducedMotionFallback={<BrandImage seed={42} kind="hero" />}
    >
      {/* Legibility gradient — left-anchored (subject stays clean), appears with content */}
      <motion.div className="absolute inset-0 z-10" style={overlayStyle} aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/55 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy-deep/70 to-transparent" />
      </motion.div>

      {/* Content — fades + rises into view with the scroll */}
      <motion.div className="relative z-20" style={contentStyle}>
        <Container className="flex min-h-[100svh] flex-col pb-12 pt-28 sm:pt-32">
          <div className="flex flex-1 flex-col justify-center">
            <div className="flex items-center gap-3">
              <span className="rule-amber" aria-hidden />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-amber">
                Building &amp; Civil Engineering · Nairobi
              </span>
            </div>

            <h1 className="mt-6 max-w-3xl font-display text-[2.6rem] font-semibold leading-[1.05] tracking-tight text-bone sm:text-6xl md:text-[4.25rem]">
              We Build{" "}
              <span className="font-light italic text-amber">Landmark</span>{" "}
              Structures, Engineered to Last.
            </h1>

            <p className="mt-7 max-w-xl text-base leading-relaxed text-concrete sm:text-lg">
              From high-rise residential towers to specialised sports
              infrastructure, EGY-KEN Builders delivers complex, high-end
              projects across East Africa — pairing elite local engineering with
              premium materials from Egypt and Turkey.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <CTA href="/projects" variant="primary">
                View Our Projects
              </CTA>
              <CTA href="/contact" variant="light">
                Request a Quote
              </CTA>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-y-8 rounded-xl border border-white/10 bg-navy-deep/40 p-7 backdrop-blur-sm sm:grid-cols-4 sm:divide-x sm:divide-white/10">
            {site.stats.map((s) => (
              <div key={s.label} className="sm:px-6 sm:first:pl-0">
                <StatCounter
                  value={s.value}
                  suffix={s.suffix}
                  label={s.label}
                  play={statsPlay}
                />
              </div>
            ))}
          </div>
        </Container>
      </motion.div>
    </SmoothScrollHero>
  );
}
