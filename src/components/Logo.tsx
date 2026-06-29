import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  tone = "dark",
  className,
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label="EGY-KEN Builders — home"
      className={cn("group flex items-center gap-2.5", className)}
    >
      <svg
        viewBox="0 0 36 36"
        className="h-8 w-8 shrink-0"
        aria-hidden
        fill="none"
      >
        <path
          d="M5 17 L18 6 L31 17"
          stroke="#ee9c45"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line x1="11" y1="17.5" x2="11" y2="30" stroke="#2a86bb" strokeWidth="3" strokeLinecap="round" />
        <line x1="18" y1="13" x2="18" y2="30" stroke="#2a86bb" strokeWidth="3" strokeLinecap="round" />
        <line x1="25" y1="17.5" x2="25" y2="30" stroke="#2a86bb" strokeWidth="3" strokeLinecap="round" />
        <line x1="8" y1="30" x2="28" y2="30" stroke="#ee9c45" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <span className="leading-none">
        <span
          className={cn(
            "block font-display text-lg font-semibold tracking-tight",
            tone === "light" ? "text-bone" : "text-navy-deep",
          )}
        >
          EGY-KEN
        </span>
        <span
          className={cn(
            "mt-0.5 block text-[10px] font-semibold uppercase tracking-[0.32em]",
            tone === "light" ? "text-concrete" : "text-steel",
          )}
        >
          Builders
        </span>
      </span>
    </Link>
  );
}
