"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useHydratedReducedMotion } from "@/lib/use-hydrated-reduced-motion";
import { ProjectCard } from "@/components/ProjectCard";
import { projects, categories, type Category } from "@/lib/projects";
import { cn } from "@/lib/utils";

const label = (c: "All" | Category) =>
  c === "Civil" ? "Civil & Infrastructure" : c;

export function ProjectsExplorer() {
  const [active, setActive] = useState<"All" | Category>("All");
  const reduce = useHydratedReducedMotion();
  const list =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2.5">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setActive(c)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              active === c
                ? "border-amber bg-amber text-navy-deep"
                : "border-concrete/60 text-charcoal/70 hover:border-steel hover:text-steel",
            )}
          >
            {label(c)}
          </button>
        ))}
      </div>

      <motion.div
        layout
        className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <motion.div
              key={p.slug}
              layout
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectCard project={p} className="aspect-[4/3]" />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
