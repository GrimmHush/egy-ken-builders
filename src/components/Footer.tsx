import Link from "next/link";
import { MapPin, Phone, Mail, Clock, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Container } from "@/components/Container";
import { services } from "@/lib/services";
import { navLinks, site, telHref, mailHref } from "@/lib/site";

const socials = [
  {
    label: "Instagram",
    href: site.socials.instagram,
    path: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    label: "LinkedIn",
    href: site.socials.linkedin,
    filled: true,
    path: (
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.3-.02-2.96-1.8-2.96-1.8 0-2.08 1.4-2.08 2.86V21H9z" />
    ),
  },
  {
    label: "Facebook",
    href: site.socials.facebook,
    filled: true,
    path: (
      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.6c-.3-.04-1.3-.13-2.46-.13-2.43 0-4.1 1.48-4.1 4.2v2.34H7.3V13h2.84v8z" />
    ),
  },
];

const credentials = [
  `${site.credentials.nca.category} · Reg. ${site.credentials.nca.number}`,
  "KRA Tax Compliant",
  "OSH Compliant",
  "Registered under Companies Act, 2015",
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative bg-navy-deep text-concrete">
      <div className="blueprint absolute inset-0" aria-hidden />
      <Container className="relative py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo tone="light" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-concrete/90">
              {site.shortIntro}
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-concrete transition-colors hover:border-amber hover:text-amber"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill={s.filled ? "currentColor" : "none"}
                    stroke={s.filled ? "none" : "currentColor"}
                    strokeWidth={s.filled ? 0 : 1.8}
                    aria-hidden
                  >
                    {s.path}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-bone">
              Explore
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="transition-colors hover:text-amber"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-bone">
              Services
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {services.map((s) => (
                <li key={s.id}>
                  <Link
                    href="/services"
                    className="transition-colors hover:text-amber"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-bone">
              Get in touch
            </h3>
            <ul className="mt-4 space-y-3.5 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
                <span>
                  {site.address.line}, {site.address.area}
                  <br />
                  {site.address.city}, {site.address.country}
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
                <a href={telHref} className="transition-colors hover:text-amber">
                  {site.phoneDisplay}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
                <a
                  href={mailHref}
                  className="break-all transition-colors hover:text-amber"
                >
                  {site.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
                <span>
                  {site.hours.map((h) => (
                    <span key={h.day} className="block">
                      {h.day}: {h.time}
                    </span>
                  ))}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 pt-8">
          {credentials.map((c) => (
            <span
              key={c}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-concrete/90"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-amber" />
              {c}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-2 text-xs text-concrete/80 sm:flex-row sm:items-center">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p>Designed &amp; built in Nairobi, Kenya.</p>
        </div>
      </Container>
    </footer>
  );
}
