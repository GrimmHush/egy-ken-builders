import {
  Building2,
  LandPlot,
  PanelsTopLeft,
  DoorOpen,
  Construction,
  Check,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import type { Service } from "@/lib/services";
import { cn } from "@/lib/utils";

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
  showPoints = false,
}: {
  service: Service;
  index?: number;
  showPoints?: boolean;
}) {
  const Icon = iconMap[service.icon] ?? Building2;

  return (
    <Reveal
      delay={index * 0.06}
      className={cn(
        "group flex h-full flex-col rounded-xl border border-white/10 bg-white/[0.035] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-amber/40 hover:bg-white/[0.06]",
      )}
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber/15 text-amber transition-colors duration-300 group-hover:bg-amber group-hover:text-navy-deep">
        <Icon className="h-6 w-6" strokeWidth={1.7} />
      </span>
      <h3 className="mt-5 font-display text-xl font-semibold text-bone">
        {service.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-concrete">
        {showPoints ? service.body : service.summary}
      </p>
      {showPoints && (
        <ul className="mt-5 space-y-2.5 border-t border-white/10 pt-5">
          {service.points.map((p) => (
            <li key={p} className="flex items-start gap-2.5 text-sm text-concrete/90">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
              {p}
            </li>
          ))}
        </ul>
      )}
    </Reveal>
  );
}
