import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { ProjectsExplorer } from "@/components/ProjectsExplorer";
import { CTASection } from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Flagship residential towers, mixed-use developments, padel & sports facilities and civil infrastructure delivered by EGY-KEN Builders across Kenya.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        kicker="Portfolio"
        title="Projects that define our standard."
        intro="From twin high-rise towers in Kilimani to specialised sports infrastructure and large-span medical roofing — a selection of our work across East Africa."
        seed={7}
      />
      <section className="bg-bone py-20 sm:py-28">
        <Container>
          <ProjectsExplorer />
        </Container>
      </section>
      <CTASection />
    </>
  );
}
