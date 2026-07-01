import Image from "next/image";
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
      className={cn(
        "group inline-flex items-center transition-transform duration-300 ease-out-expo hover:-translate-y-0.5",
        className,
      )}
    >
      <Image
        src="/egy-ken-logo.png"
        alt="EGY-KEN Builders"
        width={1344}
        height={576}
        priority
        sizes="220px"
        className={cn(
          "h-10 w-auto sm:h-11",
          // The logo lockup has dark text/mark; on dark surfaces (the footer and
          // the transparent navbar over the hero) render it as a white knockout.
          tone === "light" && "[filter:brightness(0)_invert(1)]",
        )}
      />
    </Link>
  );
}
