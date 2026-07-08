import Image from "next/image";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { BrandImage } from "@/components/BrandImage";

export function PageHero({
  kicker,
  title,
  intro,
  seed = 9,
  image,
}: {
  kicker: string;
  title: string;
  intro?: string;
  seed?: number;
  /** Real photograph (served from /public). Falls back to BrandImage art when absent. */
  image?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-deep pt-[72px]">
      <div
        className={image ? "absolute inset-0" : "absolute inset-0 opacity-40"}
        aria-hidden
      >
        {image ? (
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <BrandImage seed={seed} kind="hero" />
        )}
      </div>
      {/* Legibility scrim anchored to the text side; the photo stays clear */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-navy-deep/90 via-navy-deep/55 to-navy-deep/10 sm:via-navy-deep/40 sm:to-transparent"
        aria-hidden
      />
      {/* Slim top band so the navbar stays readable over bright skies */}
      <div
        className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-navy-deep/70 to-transparent"
        aria-hidden
      />
      <Container className="relative py-20 [text-shadow:0_2px_18px_rgba(2,18,28,0.55)] sm:py-28">
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
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-bone/75 sm:text-lg">
              {intro}
            </p>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
