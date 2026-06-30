import type { Metadata } from "next";
import { Phone, MessageCircle, Mail, MapPin, Clock } from "lucide-react";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import {
  site,
  telHref,
  mailHref,
  whatsappHref,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with EGY-KEN Builders in Nairobi. Request a quote, call, or message us on WhatsApp to discuss your construction project.",
};

const quickActions = [
  {
    Icon: Phone,
    label: "Call us",
    value: site.phoneDisplay,
    href: telHref,
    external: false,
  },
  {
    Icon: MessageCircle,
    label: "WhatsApp",
    value: site.phoneDisplay,
    href: whatsappHref,
    external: true,
  },
  {
    Icon: Mail,
    label: "Email",
    value: site.email,
    href: mailHref,
    external: false,
  },
];

const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
  `${site.address.line}, ${site.address.area}, ${site.address.city}`,
)}&z=15&output=embed`;

export default function ContactPage() {
  return (
    <>
      <PageHero
        kicker="Contact"
        title="Let's discuss your project."
        intro="Tell us about your build and our team will respond within one business day. For anything urgent, call or message us on WhatsApp."
        seed={13}
      />

      <section className="bg-bone py-20 sm:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
            {/* Info */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {quickActions.map((a) => (
                  <a
                    key={a.label}
                    href={a.href}
                    target={a.external ? "_blank" : undefined}
                    rel={a.external ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-4 rounded-xl border border-concrete/50 bg-white p-4 shadow-card transition-[transform,border-color,box-shadow] duration-500 ease-out-expo hover:-translate-y-1 hover:border-amber/50 hover:shadow-lift"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-steel/10 text-steel transition-colors group-hover:bg-amber group-hover:text-navy-deep">
                      <a.Icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-medium uppercase tracking-[0.14em] text-charcoal/70">
                        {a.label}
                      </span>
                      <span className="block truncate text-sm font-semibold text-navy-deep">
                        {a.value}
                      </span>
                    </span>
                  </a>
                ))}
              </div>

              <div className="mt-6 rounded-xl border border-concrete/50 bg-white p-6 shadow-card">
                <div className="flex gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-amber-deep" />
                  <div>
                    <h3 className="text-sm font-semibold text-navy-deep">
                      Office
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-charcoal/70">
                      {site.address.line}
                      <br />
                      {site.address.area}, {site.address.city}
                      <br />
                      {site.address.country}
                    </p>
                  </div>
                </div>
                <div className="mt-5 flex gap-3 border-t border-concrete/40 pt-5">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-amber-deep" />
                  <div>
                    <h3 className="text-sm font-semibold text-navy-deep">
                      Business hours
                    </h3>
                    <ul className="mt-1 space-y-0.5 text-sm text-charcoal/70">
                      {site.hours.map((h) => (
                        <li key={h.day}>
                          {h.day}:{" "}
                          <span className="text-navy-deep">{h.time}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <Reveal delay={0.05} className="lg:col-span-3">
              <ContactForm />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Map */}
      <section className="bg-white">
        <div className="h-[380px] w-full overflow-hidden border-t border-concrete/40 grayscale-[0.2]">
          <iframe
            title={`Map to ${site.legalName}`}
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full border-0"
          />
        </div>
      </section>
    </>
  );
}
