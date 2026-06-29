import { Container } from "@/components/Container";
import { CTA } from "@/components/CTA";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70svh] items-center overflow-hidden bg-navy-deep pt-[72px]">
      <div className="blueprint absolute inset-0" aria-hidden />
      <Container className="relative text-center">
        <p className="font-display text-7xl font-semibold text-amber sm:text-8xl">
          404
        </p>
        <h1 className="mt-4 font-display text-2xl font-semibold text-bone sm:text-3xl">
          This page couldn&apos;t be found.
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-concrete">
          The page you&apos;re looking for may have moved. Let&apos;s get you
          back on solid ground.
        </p>
        <div className="mt-8 flex justify-center">
          <CTA href="/" variant="primary">
            Back to home
          </CTA>
        </div>
      </Container>
    </section>
  );
}
