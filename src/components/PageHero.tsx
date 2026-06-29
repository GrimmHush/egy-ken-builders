import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { BrandImage } from "@/components/BrandImage";

export function PageHero({
  kicker,
  title,
  intro,
  seed = 9,
}: {
  kicker: string;
  title: string;
  intro?: string;
  seed?: number;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-deep pt-[72px]">
      <div className="absolute inset-0 opacity-40" aria-hidden>
        <BrandImage seed={seed} kind="hero" />
      </div>
      <div
        className="absolute inset-0 bg-gradient-to-b from-navy-deep/85 via-navy-deep/85 to-navy-deep"
        aria-hidden
      />
      <Container className="relative py-20 sm:py-28">
        <Reveal className="max-w-3xl">
          <div className="mb-5 flex items-center gap-3">
            <span className="rule-amber" aria-hidden />
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-amber">
              {kicker}
            </span>
          </div>
          <h1 className="font-display text-4xl font-semibold leading-[1.06] tracking-tight text-bone sm:text-5xl md:text-6xl">
            {title}
          </h1>
          {intro && (
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-concrete sm:text-lg">
              {intro}
            </p>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
