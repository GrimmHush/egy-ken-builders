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
          // The wide 21:9 source is cropped hard on phones, so the needed
          // resolution follows the rendered HEIGHT: request an oversized
          // rendition below 640px or the crop upscales and pixelates.
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="(max-width: 640px) 300vw, 100vw"
            className="object-cover"
          />
        ) : (
          <BrandImage seed={seed} kind="hero" />
        )}
      </div>
      <Container className="relative py-20 [text-shadow:0_2px_10px_rgba(2,18,28,0.85),0_2px_28px_rgba(2,18,28,0.6)] sm:py-28">
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
