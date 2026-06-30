import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Variant = "primary" | "outline" | "light" | "ghost";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-md px-6 py-3.5 text-sm font-semibold tracking-wide transition-[transform,background-color,border-color,color,box-shadow] duration-300 ease-out-expo active:translate-y-0 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2";

const variants: Record<Variant, string> = {
  primary:
    "bg-amber text-navy-deep shadow-sm hover:-translate-y-0.5 hover:bg-amber-soft hover:shadow-[0_12px_30px_-12px_rgba(238,156,69,0.7)]",
  outline:
    "border border-navy/25 text-navy hover:-translate-y-0.5 hover:border-amber hover:text-amber-deep",
  light:
    "border border-white/30 text-white hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/10",
  ghost: "px-0 text-steel hover:text-amber-deep",
};

export function CTA({
  href,
  children,
  variant = "primary",
  arrow = true,
  external = false,
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  arrow?: boolean;
  external?: boolean;
  className?: string;
}) {
  const content = (
    <>
      <span className={cn(variant === "ghost" && "link-underline")}>
        {children}
      </span>
      {arrow && (
        <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1.5" />
      )}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(base, variants[variant], className)}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={cn(base, variants[variant], className)}>
      {content}
    </Link>
  );
}
