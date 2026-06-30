import type { Metadata } from "next";
import {
  ShieldCheck,
  Receipt,
  FileBadge,
  Flame,
  HardHat,
  Landmark,
} from "lucide-react";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { StatCounter } from "@/components/StatCounter";
import { BrandImage } from "@/components/BrandImage";
import { CTASection } from "@/components/CTASection";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "EGY-KEN Builders Limited — an NCA 1 registered building and civil engineering firm in Nairobi, delivering premium projects across East Africa since 2018.",
};

const compliance = [
  {
    Icon: ShieldCheck,
    label: "NCA 1 Registration",
    value: `Reg. ${site.credentials.nca.number} — top-tier category for Building Works`,
  },
  {
    Icon: Receipt,
    label: "KRA Tax Compliance",
    value: `PIN ${site.credentials.kraPin} — active obligations`,
  },
  {
    Icon: FileBadge,
    label: "Single Business Permit",
    value: "Nairobi City County — Contractor Activity Code 825",
  },
  {
    Icon: Flame,
    label: "Fire Prevention Clearance",
    value: "Nairobi City County certified — Plot No. 30/716",
  },
  {
    Icon: HardHat,
    label: "Occupational Safety & Health",
    value: "OSH-compliant standards across all site operations",
  },
  {
    Icon: Landmark,
    label: "Companies Act, 2015",
    value: "Registered private limited company in Kenya",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="About Us"
        title="Engineering excellence, delivered across East Africa."
        intro={site.shortIntro}
        seed={11}
      />

      {/* Story */}
      <section className="bg-bone py-20 sm:py-28">
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal className="order-2 lg:order-1">
              <div className="overflow-hidden rounded-2xl shadow-lift">
                <div className="aspect-[4/3]">
                  <BrandImage seed={23} kind="card" />
                </div>
              </div>
            </Reveal>
            <div className="order-1 lg:order-2">
              <SectionHeading
                title="A premier builder, built on precision."
              />
              <div className="mt-6 space-y-4 text-base leading-relaxed text-charcoal/80">
                <p>
                  EGY-KEN Builders Limited is a premier building, civil
                  engineering and top-tier construction firm headquartered in
                  Nairobi, Kenya. Since our establishment in 2018, we have
                  carved out a distinguished reputation for delivering complex,
                  high-end residential, commercial and specialised sports
                  infrastructure projects across the East African region.
                </p>
                <p>
                  Our competitive edge lies in bridging highly specialised
                  global procurement networks — specifically importing premium
                  materials from Egypt and Turkey — with elite local engineering
                  expertise. We specialise in turn-key structural executions,
                  premium interior fit-outs, and professional sports facility
                  developments such as Super Panorama padel courts.
                </p>
                <p>
                  Driven by strict compliance with international building
                  regulations and FIDIC contract standards, we work seamlessly
                  with institutional investors, joint-venture partnerships and
                  private developers — transforming complex architectural
                  blueprints into iconic, resilient structures, on time and
                  within budget.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="relative bg-navy py-16 sm:py-20">
        <div className="blueprint absolute inset-0" aria-hidden />
        <Container className="relative">
          <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-4 sm:divide-x sm:divide-white/10">
            {site.stats.map((s) => (
              <div key={s.label} className="sm:px-6 sm:first:pl-0">
                <StatCounter value={s.value} suffix={s.suffix} label={s.label} />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Mission & values */}
      <section className="bg-bone py-20 sm:py-28">
        <Container>
          <SectionHeading
            title="The principles behind every project."
            align="center"
          />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {site.values.map((v, i) => (
              <Reveal
                key={v.title}
                delay={i * 0.06}
                className="rounded-xl border border-concrete/50 bg-white p-7 shadow-card"
              >
                <span className="font-display text-2xl font-semibold text-amber-deep">
                  0{i + 1}
                </span>
                <h3 className="mt-3 font-display text-xl font-semibold text-navy-deep">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/75">
                  {v.body}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Compliance */}
      <section className="border-t border-concrete/40 bg-white py-20 sm:py-28">
        <Container>
          <SectionHeading
            title="Fully registered, fully compliant."
            intro="Verifiable credentials that give institutional investors and developers complete confidence."
          />
          <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {compliance.map((c, i) => (
              <Reveal key={c.label} delay={i * 0.05} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-steel/10 text-steel">
                  <c.Icon className="h-5 w-5" strokeWidth={1.7} />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-navy-deep">
                    {c.label}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-charcoal/70">
                    {c.value}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        title="Partner with a builder you can trust."
        body="Whether you're an institutional investor, a joint-venture partner or a private developer, our team is ready to deliver your next landmark."
      />
    </>
  );
}
