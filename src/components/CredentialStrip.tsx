import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";

/* A compliance register, not icon cards: each row is a real document on file
   with its issuing authority, so the trust claim is checkable. */
const register = [
  {
    name: "NCA 1 · Building Works",
    authority: "National Construction Authority — top-tier category",
    ref: `Reg. ${site.credentials.nca.number}`,
  },
  {
    name: "KRA Tax Compliance",
    authority: "Kenya Revenue Authority",
    ref: `PIN ${site.credentials.kraPin}`,
  },
  {
    name: "Single Business Permit",
    authority: "Nairobi City County",
    ref: "Activity Code 825",
  },
  {
    name: "Fire Prevention Clearance",
    authority: "Nairobi City County",
    ref: "Plot No. 30/716",
  },
  {
    name: "Private Limited Company",
    authority: "Registered under the Companies Act, 2015",
    ref: `Est. ${site.founded}`,
  },
];

export function CredentialStrip() {
  return (
    <section className="relative bg-navy text-bone">
      <div className="blueprint absolute inset-0" aria-hidden />
      <Container className="relative py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <h2 className="text-balance font-display text-3xl font-semibold leading-[1.1] tracking-tight text-bone sm:text-4xl">
              Licensed. Registered.{" "}
              <span className="font-light italic text-amber">Verifiable.</span>
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-bone/75 sm:text-base">
              Every entry in this register is on file with its issuing
              authority — check the numbers yourself.
            </p>
          </Reveal>

          <div className="lg:col-span-8">
            <div className="border-t border-white/15">
              {register.map((c, i) => (
                <Reveal key={c.name} delay={i * 0.05}>
                  <div className="-mx-3 grid grid-cols-1 gap-1 border-b border-white/15 px-3 py-4 transition-colors duration-300 hover:bg-white/[0.04] sm:grid-cols-12 sm:items-baseline sm:gap-4 sm:py-5">
                    <h3 className="font-display text-lg font-semibold text-bone sm:col-span-4">
                      {c.name}
                    </h3>
                    <p className="text-sm leading-relaxed text-bone/70 sm:col-span-5">
                      {c.authority}
                    </p>
                    <p className="text-sm font-semibold tabular-nums tracking-[0.08em] text-amber sm:col-span-3 sm:text-right">
                      {c.ref}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={register.length * 0.05}>
              <p className="mt-6 text-xs leading-relaxed text-bone/65">
                Contracts administered to FIDIC frameworks · OSH-compliant site
                operations · Statutory clearances current.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
