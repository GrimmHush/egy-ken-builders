import Image from "next/image";
import {
  Building2,
  LandPlot,
  PanelsTopLeft,
  DoorOpen,
  Construction,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import type { Service } from "@/lib/services";

const iconMap: Record<string, LucideIcon> = {
  Building2,
  LandPlot,
  PanelsTopLeft,
  DoorOpen,
  Construction,
};

export function ServiceCard({
  service,
  index = 0,
}: {
  service: Service;
  index?: number;
}) {
  const Icon = iconMap[service.icon] ?? Building2;

  return (
    <Reveal
      delay={index * 0.06}
      className="group relative flex h-full min-h-[300px] flex-col overflow-hidden rounded-xl border border-white/10 bg-navy transition-[transform,border-color,box-shadow] duration-500 ease-out-expo hover:-translate-y-1.5 hover:border-amber/40 hover:shadow-glow"
    >
      {/* Service photograph */}
      {service.image && (
        <Image
          src={service.image}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="absolute inset-0 object-cover transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.06]"
          aria-hidden
        />
      )}
      {/* Legibility gradient — fully opaque where the text sits */}
      <span
        className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/75 to-navy-deep/25"
        aria-hidden
      />

      {/* Top accent line draws on hover */}
      <span
        className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-amber via-amber/60 to-transparent transition-transform duration-500 ease-out-expo group-hover:scale-x-100"
        aria-hidden
      />

      <div className="relative flex flex-1 flex-col justify-between p-7">
        <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy-deep/60 text-amber backdrop-blur-sm transition-colors duration-500 ease-out-expo group-hover:bg-amber group-hover:text-navy-deep">
          <Icon
            className="h-6 w-6 transition-transform duration-500 ease-out-expo group-hover:scale-110"
            strokeWidth={1.7}
          />
        </span>
        <div className="pt-16">
          <h3 className="font-display text-xl font-semibold text-bone">
            {service.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-bone/75">
            {service.summary}
          </p>
        </div>
      </div>
    </Reveal>
  );
}
