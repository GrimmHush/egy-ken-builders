import { cn } from "@/lib/utils";
import { Reveal } from "@/components/Reveal";

export function SectionHeading({
  title,
  intro,
  align = "left",
  tone = "dark-on-light",
  className,
}: {
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
      className={cn("max-w-2xl", centered && "mx-auto text-center", className)}
    >
      <h2
        className={cn(
          "text-balance font-display text-3xl font-semibold leading-[1.08] tracking-tight sm:text-4xl md:text-[2.85rem]",
          titleColor,
        )}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={cn(
            "mt-5 max-w-xl text-pretty text-base leading-relaxed sm:text-lg",
            introColor,
          )}
        >
          {intro}
        </p>
      )}
    </Reveal>
  );
}
