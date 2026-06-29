import { Reveal } from "@/components/Reveal";

const steps = [
  {
    n: "01",
    title: "Discover",
    body: "Understanding your vision, site conditions, budget and compliance requirements.",
  },
  {
    n: "02",
    title: "Design",
    body: "Translating architectural blueprints into precise, build-ready engineering.",
  },
  {
    n: "03",
    title: "Build",
    body: "Structural execution with rigorous quality control and uncompromising site safety.",
  },
  {
    n: "04",
    title: "Deliver",
    body: "On-time, on-budget handover of resilient, beautifully finished structures.",
  },
  {
    n: "05",
    title: "Beyond",
    body: "Ongoing support, maintenance and partnership for the long term.",
  },
];

export function ProcessSteps() {
  return (
    <div className="relative grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
      {/* connecting line on large screens */}
      <div
        className="absolute left-0 right-0 top-6 hidden h-px bg-concrete/50 lg:block"
        aria-hidden
      />
      {steps.map((s, i) => (
        <Reveal key={s.n} delay={i * 0.08} className="relative">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-amber/50 bg-bone font-display text-base font-semibold text-amber-deep">
            {s.n}
          </div>
          <h3 className="mt-5 font-display text-lg font-semibold text-navy-deep">
            {s.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-charcoal/75">
            {s.body}
          </p>
        </Reveal>
      ))}
    </div>
  );
}
