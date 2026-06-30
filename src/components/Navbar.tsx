"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/site";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // When the mobile menu is open: lock background scroll and close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const light = !scrolled;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-concrete/40 bg-bone/90 backdrop-blur-md"
            : "bg-transparent",
        )}
      >
        <nav className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5 sm:px-8">
          <Logo tone={light ? "light" : "dark"} />

          <div className="hidden items-center gap-8 md:flex">
            <ul className="flex items-center gap-7">
              {navLinks.map((l) => {
                const active = isActive(l.href);
                return (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className={cn(
                        "group relative text-sm font-medium tracking-wide transition-colors",
                        active
                          ? light
                            ? "text-amber"
                            : "text-amber-deep"
                          : light
                            ? "text-bone/75 hover:text-bone"
                            : "text-navy/70 hover:text-navy",
                      )}
                    >
                      {l.label}
                      <span
                        className={cn(
                          "absolute -bottom-1.5 left-0 h-0.5 w-full origin-left bg-amber transition-transform duration-300 ease-out-expo",
                          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                        )}
                        aria-hidden
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Link
              href="/contact"
              className="rounded-md bg-amber px-4 py-2 text-sm font-semibold text-navy-deep shadow-sm transition-[transform,background-color,box-shadow] duration-300 ease-out-expo hover:-translate-y-0.5 hover:bg-amber-soft hover:shadow-[0_10px_26px_-12px_rgba(238,156,69,0.7)] active:translate-y-0 active:scale-[0.98]"
            >
              Request a Quote
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className={cn(
              "relative z-50 -mr-1 inline-flex h-10 w-10 items-center justify-center rounded-md md:hidden",
              open || !light ? "text-navy" : "text-bone",
            )}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </header>

      {/* Mobile overlay */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        inert={!open ? true : undefined}
        className={cn(
          "fixed inset-0 z-40 flex flex-col bg-navy-deep px-6 pt-28 pb-10 transition-all duration-300 md:hidden",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
      >
        <ul className="flex flex-col gap-1">
          {navLinks.map((l) => {
            const active = isActive(l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={cn(
                    "block border-b border-white/10 py-4 font-display text-2xl tracking-tight transition-colors",
                    active ? "text-amber" : "text-bone hover:text-amber-soft",
                  )}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <Link
          href="/contact"
          className="mt-8 inline-flex items-center justify-center rounded-md bg-amber px-6 py-4 text-sm font-semibold text-navy-deep"
        >
          Request a Quote
        </Link>
      </div>
    </>
  );
}
