import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { BrandImage } from "@/components/BrandImage";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

export function ProjectCard({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group relative block overflow-hidden rounded-xl bg-navy",
        className,
      )}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="h-full w-full transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]">
          <BrandImage seed={project.seed} kind="card" />
        </div>
      </div>

      {/* Legibility gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-navy-deep/95 via-navy-deep/30 to-transparent"
        aria-hidden
      />

      {/* Hover arrow */}
      <span className="absolute right-4 top-4 flex h-10 w-10 translate-y-1 items-center justify-center rounded-full border border-white/30 bg-navy-deep/40 text-bone opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-hover:border-amber group-hover:text-amber">
        <ArrowUpRight className="h-5 w-5" />
      </span>

      {/* Content */}
      <div className="relative flex h-full flex-col justify-end p-6">
        <span className="mb-3 inline-flex w-fit items-center rounded-full border border-amber/40 bg-amber/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-amber">
          {project.category}
        </span>
        <h3 className="font-display text-2xl font-semibold leading-tight text-bone">
          {project.name}
        </h3>
        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-concrete">
          <MapPin className="h-3.5 w-3.5 text-amber" />
          {project.location} · {project.year}
        </p>
      </div>
    </Link>
  );
}
