import type { Metadata } from "next";
import Image from "next/image";
import {
  Building2,
  LandPlot,
  PanelsTopLeft,
  DoorOpen,
  Construction,
  Check,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { CTA } from "@/components/CTA";
import { ProcessSteps } from "@/components/ProcessSteps";
import { CTASection } from "@/components/CTASection";
import { BrandImage } from "@/components/BrandImage";
import { services } from "@/lib/services";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Civil & structural engineering, premium padel courts, architectural facades, waterproof joinery, and steel & tensile structures — delivered end-to-end by EGY-KEN Builders.",
};

const iconMap: Record<string, LucideIcon> = {
  Building2,
  LandPlot,
  PanelsTopLeft,
  DoorOpen,
  Construction,
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        kicker="Services"
        title="Specialised construction, delivered end-to-end."
        intro="Five capabilities under one accountable team — from deep foundations to the finishing touches that set our work apart."
        seed={5}
      />

      <section className="bg-bone py-20 sm:py-28">
        <Container className="space-y-20 sm:space-y-28">
          {services.map((s, i) => {
            const Icon = iconMap[s.icon] ?? Building2;
            const flip = i % 2 === 1;
            return (
              <div
                key={s.id}
                className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                <Reveal
                  className={cn(flip && "lg:order-2")}
                  delay={0.05}
                >
                  <div className="overflow-hidden rounded-2xl shadow-lift">
                    <div className="relative aspect-[4/3]">
                      {s.image ? (
                        <Image
                          src={s.image}
                          alt={s.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover"
                        />
                      ) : (
                        <BrandImage seed={30 + s.title.length + i} kind="card" />
                      )}
                    </div>
                  </div>
                </Reveal>

                <div className={cn(flip && "lg:order-1")}>
                  <Reveal>
                    <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-steel/10 text-steel">
                      <Icon className="h-6 w-6" strokeWidth={1.7} />
                    </span>
                    <h2 className="font-display text-2xl font-semibold leading-tight tracking-tight text-navy-deep sm:text-3xl">
                      {s.title}
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-charcoal/80">
                      {s.body}
                    </p>
                    <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                      {s.points.map((p) => (
                        <li
                          key={p}
                          className="flex items-start gap-2.5 text-sm text-charcoal/80"
                        >
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber-deep" />
                          {p}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-7">
                      <CTA href="/contact" variant="ghost">
                        Discuss this service
                      </CTA>
                    </div>
                  </Reveal>
                </div>
              </div>
            );
          })}
        </Container>
      </section>

      <section className="border-t border-concrete/40 bg-white py-20 sm:py-28">
        <Container>
          <SectionHeading
            title="A seamless journey from vision to reality."
            align="center"
          />
          <div className="mt-16">
            <ProcessSteps />
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
