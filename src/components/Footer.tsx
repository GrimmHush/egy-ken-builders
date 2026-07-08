import Link from "next/link";
import { MapPin, Phone, Mail, Clock, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Container } from "@/components/Container";
import { services } from "@/lib/services";
import { navLinks, site, telHref, mailHref } from "@/lib/site";

const credentials = [
  `${site.credentials.nca.category} · Reg. ${site.credentials.nca.number}`,
  "KRA Tax Compliant",
  "OSH Compliant",
  "Registered under Companies Act, 2015",
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative bg-navy-deep text-bone/75">
      <div className="blueprint absolute inset-0" aria-hidden />
      <Container className="relative py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo tone="light" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-bone/70">
              {site.shortIntro}
            </p>
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
                    className="link-underline transition-colors hover:text-amber"
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
                    href={`/services#${s.id}`}
                    className="link-underline transition-colors hover:text-amber"
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
                <a href={telHref} className="link-underline transition-colors hover:text-amber">
                  {site.phoneDisplay}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
                <a
                  href={mailHref}
                  className="break-words link-underline transition-colors hover:text-amber"
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
              className="inline-flex items-center gap-1.5 text-xs font-medium text-bone/70"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-amber" />
              {c}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-2 text-xs text-bone/65 sm:flex-row sm:items-center">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p>Designed &amp; built in Nairobi, Kenya.</p>
        </div>
      </Container>
    </footer>
  );
}
