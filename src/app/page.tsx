import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/Hero";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { CTA } from "@/components/CTA";
import { ServiceCard } from "@/components/ServiceCard";
import { ProjectCard } from "@/components/ProjectCard";
import { ProcessSteps } from "@/components/ProcessSteps";
import { CredentialStrip } from "@/components/CredentialStrip";
import { CTASection } from "@/components/CTASection";
import { BrandImage } from "@/components/BrandImage";
import { services } from "@/lib/services";
import { featuredProjects } from "@/lib/projects";
import { site } from "@/lib/site";

const featuredWrap = ["md:col-span-2", "", "", "md:col-span-2"];
const featuredAspect = [
  "aspect-[16/10] sm:aspect-[2/1]",
  "aspect-[4/3]",
  "aspect-[4/3]",
  "aspect-[16/10] sm:aspect-[2/1]",
];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* About teaser */}
      <section className="bg-bone py-20 sm:py-28">
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading
                kicker="Who We Are"
                title="Bridging global procurement with elite local engineering."
                intro="Since 2018, EGY-KEN Builders Limited has delivered complex, high-end residential, commercial and specialised sports infrastructure across East Africa — built to international standards and finished to the highest spec."
              />
              <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
                {site.values.map((v, i) => (
                  <Reveal key={v.title} delay={i * 0.06} className="flex gap-3">
                    <span className="mt-1 font-display text-sm font-semibold text-amber-deep">
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-navy-deep">
                        {v.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-charcoal/70">
                        {v.body}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </ul>
              <div className="mt-9">
                <CTA href="/about" variant="ghost">
                  More about our story
                </CTA>
              </div>
            </div>

            <Reveal delay={0.1} className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-lift">
                <div className="aspect-[4/5]">
                  <BrandImage seed={17} kind="square" />
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 hidden rounded-xl border border-concrete/40 bg-white p-5 shadow-card sm:block">
                <div className="font-display text-3xl font-semibold text-navy-deep">
                  120<span className="text-amber">+</span>
                </div>
                <div className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-charcoal/70">
                  Specialists · 3 Divisions
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Services */}
      <section className="relative bg-charcoal py-20 sm:py-28">
        <div className="blueprint absolute inset-0" aria-hidden />
        <Container className="relative">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              kicker="What We Do"
              title="End-to-end construction expertise."
              intro="Five specialised capabilities, delivered under one accountable team."
              tone="light-on-dark"
            />
            <Reveal className="hidden md:block">
              <CTA href="/services" variant="light">
                All services
              </CTA>
            </Reveal>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <ServiceCard key={s.id} service={s} index={i} />
            ))}
            <Reveal delay={services.length * 0.06} className="hidden lg:flex">
              <a
                href="/services"
                className="group flex h-full w-full flex-col justify-between rounded-xl border border-amber/30 bg-amber/10 p-7 transition-colors hover:bg-amber/15"
              >
                <span className="font-display text-xl font-semibold text-bone">
                  Have a different requirement?
                </span>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-amber">
                  Talk to our team
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Featured projects */}
      <section className="bg-bone py-20 sm:py-28">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              kicker="Selected Work"
              title="Projects that define our standard."
            />
            <Reveal className="hidden md:block">
              <CTA href="/projects" variant="outline">
                View all projects
              </CTA>
            </Reveal>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
            {featuredProjects.map((p, i) => (
              <Reveal
                key={p.slug}
                delay={(i % 2) * 0.08}
                className={featuredWrap[i] ?? ""}
              >
                <ProjectCard
                  project={p}
                  className={featuredAspect[i] ?? "aspect-[4/3]"}
                />
              </Reveal>
            ))}
          </div>
          <div className="mt-10 md:hidden">
            <CTA href="/projects" variant="outline">
              View all projects
            </CTA>
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="border-t border-concrete/40 bg-white py-20 sm:py-28">
        <Container>
          <SectionHeading
            kicker="How We Work"
            title="A seamless journey from vision to reality."
            align="center"
          />
          <div className="mt-16">
            <ProcessSteps />
          </div>
        </Container>
      </section>

      <CredentialStrip />
      <CTASection />
    </>
  );
}
