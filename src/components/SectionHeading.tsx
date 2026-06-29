import { cn } from "@/lib/utils";
import { Reveal } from "@/components/Reveal";

export function SectionHeading({
  kicker,
  title,
  intro,
  align = "left",
  tone = "dark-on-light",
  className,
}: {
  kicker?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  tone?: "dark-on-light" | "light-on-dark";
  className?: string;
}) {
  const centered = align === "center";
  const titleColor = tone === "light-on-dark" ? "text-bone" : "text-navy-deep";
  const introColor =
    tone === "light-on-dark" ? "text-concrete" : "text-charcoal/75";

  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        centered && "mx-auto text-center",
        className,
      )}
    >
      {kicker && (
        <div
          className={cn(
            "mb-4 flex items-center gap-3",
            centered && "justify-center",
          )}
        >
          <span className="rule-amber" aria-hidden />
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-deep">
            {kicker}
          </span>
        </div>
      )}
      <h2
        className={cn(
          "font-display text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl md:text-[2.75rem]",
          titleColor,
        )}
      >
        {title}
      </h2>
      {intro && (
        <p className={cn("mt-5 text-base leading-relaxed sm:text-lg", introColor)}>
          {intro}
        </p>
      )}
    </Reveal>
  );
}
