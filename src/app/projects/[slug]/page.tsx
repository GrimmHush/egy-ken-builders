import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, MapPin, Calendar, Building } from "lucide-react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { BrandImage } from "@/components/BrandImage";
import { CTASection } from "@/components/CTASection";
import { projects, getProject } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return { title: "Project not found" };
  return {
    title: p.name,
    description: `${p.name} — ${p.location}, ${p.city}. ${p.scope}`,
  };
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden bg-navy-deep pt-[72px]">
        <div className="absolute inset-0 opacity-30" aria-hidden>
          <BrandImage seed={project.seed} kind="hero" />
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-b from-navy-deep/85 to-navy-deep"
          aria-hidden
        />
        <Container className="relative py-16 sm:py-20">
          <Reveal>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm font-medium text-concrete transition-colors hover:text-amber"
            >
              <ArrowLeft className="h-4 w-4" /> All projects
            </Link>
            <span className="mt-6 flex w-fit items-center rounded-full border border-amber/40 bg-amber/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-amber">
              {project.category}
            </span>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.06] tracking-tight text-bone sm:text-5xl">
              {project.name}
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-concrete">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-amber" /> {project.location},{" "}
                {project.city}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-amber" /> {project.year}
              </span>
              <span className="flex items-center gap-1.5">
                <Building className="h-4 w-4 text-amber" /> {project.client}
              </span>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Cover */}
      <section className="bg-bone">
        <Container className="py-10 sm:py-14">
          <Reveal>
            <div className="overflow-hidden rounded-2xl shadow-lift">
              <div className="aspect-[16/9]">
                <BrandImage seed={project.seed * 3} kind="hero" />
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Body */}
      <section className="bg-bone pb-20 sm:pb-28">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
            <div className="lg:col-span-2">
              <Reveal>
                <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-charcoal/60">
                  Project Scope
                </h2>
                <p className="text-lg leading-relaxed text-charcoal/85">
                  {project.scope}
                </p>
                <div className="mt-10 grid grid-cols-3 gap-4 border-t border-concrete/50 pt-8">
                  {project.highlights.map((h) => (
                    <div key={h.label}>
                      <div className="font-display text-2xl font-semibold text-navy-deep sm:text-3xl">
                        {h.value}
                      </div>
                      <div className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-charcoal/70">
                        {h.label}
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <div className="rounded-xl border border-concrete/50 bg-white p-6 shadow-card">
                <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-charcoal/70">
                  Project details
                </h2>
                <dl className="mt-4 space-y-4 text-sm">
                  {[
                    ["Category", project.category],
                    ["Location", `${project.location}, ${project.city}`],
                    ["Year", project.year],
                    ["Client", project.client],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="flex justify-between gap-4 border-b border-concrete/40 pb-3 last:border-0 last:pb-0"
                    >
                      <dt className="text-charcoal/70">{k}</dt>
                      <dd className="text-right font-medium text-navy-deep">
                        {v}
                      </dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-steel/10 px-2.5 py-1 text-xs font-medium text-steel"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Gallery */}
          <div className="mt-16">
            <h2 className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-charcoal/60">
              Gallery
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {Array.from({ length: project.gallery }).map((_, i) => (
                <Reveal key={i} delay={(i % 2) * 0.08}>
                  <div
                    className={`overflow-hidden rounded-xl shadow-card ${
                      i === 0 ? "sm:col-span-2 aspect-[16/9]" : "aspect-[4/3]"
                    }`}
                  >
                    <BrandImage seed={project.seed * 10 + i + 1} kind="card" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Next project */}
          <Link
            href={`/projects/${next.slug}`}
            className="group mt-16 flex items-center justify-between gap-6 rounded-xl border border-concrete/50 bg-white p-6 shadow-card transition-[transform,border-color,box-shadow] duration-500 ease-out-expo hover:-translate-y-1 hover:border-amber/50 hover:shadow-lift sm:p-8"
          >
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-charcoal/70">
                Next project
              </span>
              <div className="mt-1.5 font-display text-xl font-semibold text-navy-deep sm:text-2xl">
                {next.name}
              </div>
            </div>
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber text-navy-deep shadow-sm transition-[transform,box-shadow] duration-500 ease-out-expo group-hover:translate-x-1.5 group-hover:shadow-[0_10px_26px_-12px_rgba(238,156,69,0.8)]">
              <ArrowRight className="h-5 w-5" />
            </span>
          </Link>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
