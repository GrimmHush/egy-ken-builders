import { Phone } from "lucide-react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { CTA } from "@/components/CTA";
import { site, telHref } from "@/lib/site";

export function CTASection({
  title = "Let's build something exceptional.",
  body = "From flagship towers to specialised sports infrastructure, our team delivers complex projects on time and to international standards. Tell us about yours.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-deep">
      <div className="blueprint absolute inset-0" aria-hidden />
      <div
        className="absolute -right-24 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-amber/10 blur-3xl"
        aria-hidden
      />
      <Container className="relative py-20 sm:py-24">
        <Reveal className="max-w-2xl">
          <span className="rule-amber mb-5" aria-hidden />
          <h2 className="font-display text-3xl font-semibold leading-[1.1] tracking-tight text-bone sm:text-4xl md:text-5xl">
            {title}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-concrete sm:text-lg">
            {body}
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <CTA href="/contact" variant="primary">
              Request a Quote
            </CTA>
            <a
              href={telHref}
              className="group inline-flex items-center justify-center gap-2 rounded-md border border-white/30 px-6 py-3.5 text-sm font-semibold tracking-wide text-bone transition-all duration-200 hover:bg-white/10"
            >
              <Phone className="h-4 w-4 text-amber" />
              {site.phoneDisplay}
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
