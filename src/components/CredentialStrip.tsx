import { ShieldCheck, Globe2, FileCheck2, HardHat } from "lucide-react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";

const items = [
  {
    Icon: ShieldCheck,
    title: `${site.credentials.nca.category} Registered`,
    body: `Top-tier National Construction Authority registration. Reg. ${site.credentials.nca.number}.`,
  },
  {
    Icon: Globe2,
    title: "Global Procurement",
    body: "Premium materials sourced through specialist networks in Egypt and Turkey.",
  },
  {
    Icon: FileCheck2,
    title: "FIDIC Standards",
    body: "International contract frameworks with transparent, fair risk allocation.",
  },
  {
    Icon: HardHat,
    title: "Safety & Compliance",
    body: "OSH-compliant site operations and full statutory clearances.",
  },
];

export function CredentialStrip() {
  return (
    <section className="relative bg-navy text-bone">
      <div className="blueprint absolute inset-0" aria-hidden />
      <Container className="relative py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.07}>
              <it.Icon className="h-8 w-8 text-amber" strokeWidth={1.6} />
              <h3 className="mt-4 font-display text-lg font-semibold text-bone">
                {it.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-concrete">
                {it.body}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
