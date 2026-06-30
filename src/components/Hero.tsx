import { SmoothScrollHero } from "@/components/ui/smooth-scroll-hero";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { CTA } from "@/components/CTA";
import { StatCounter } from "@/components/StatCounter";
import { BrandImage } from "@/components/BrandImage";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <SmoothScrollHero
      videoSrc="/hero-video.mp4"
      scrollHeight={700}
      initialClipPercentage={22}
      finalClipPercentage={78}
      reducedMotionFallback={<BrandImage seed={42} kind="hero" />}
    >
      {/* Legibility gradients */}
      <div
        className="absolute inset-0 z-10 bg-gradient-to-r from-navy-deep via-navy-deep/85 to-navy-deep/25"
        aria-hidden
      />
      <div
        className="absolute inset-0 z-10 bg-gradient-to-t from-navy-deep via-transparent to-navy-deep/60"
        aria-hidden
      />

      {/* Content */}
      <Container className="relative z-20 flex min-h-[100svh] flex-col pb-12 pt-28 sm:pt-32">
        <div className="flex flex-1 flex-col justify-center">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="rule-amber" aria-hidden />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-amber">
                Building &amp; Civil Engineering · Nairobi
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-6 max-w-3xl font-display text-[2.6rem] font-semibold leading-[1.05] tracking-tight text-bone sm:text-6xl md:text-[4.25rem]">
              We Build{" "}
              <span className="font-light italic text-amber">Landmark</span>{" "}
              Structures, Engineered to Last.
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-concrete sm:text-lg">
              From high-rise residential towers to specialised sports
              infrastructure, EGY-KEN Builders delivers complex, high-end
              projects across East Africa — pairing elite local engineering with
              premium materials from Egypt and Turkey.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <CTA href="/projects" variant="primary">
                View Our Projects
              </CTA>
              <CTA href="/contact" variant="light">
                Request a Quote
              </CTA>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.3}>
          <div className="mt-12 grid grid-cols-2 gap-y-8 rounded-xl border border-white/10 bg-navy-deep/40 p-7 backdrop-blur-sm sm:grid-cols-4 sm:divide-x sm:divide-white/10">
            {site.stats.map((s) => (
              <div key={s.label} className="sm:px-6 sm:first:pl-0">
                <StatCounter value={s.value} suffix={s.suffix} label={s.label} />
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </SmoothScrollHero>
  );
}
