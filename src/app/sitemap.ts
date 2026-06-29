import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { projects } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const now = new Date();
  const routes = ["", "/about", "/services", "/projects", "/contact"].map(
    (r) => ({ url: `${base}${r}`, lastModified: now }),
  );
  const projectRoutes = projects.map((p) => ({
    url: `${base}/projects/${p.slug}`,
    lastModified: now,
  }));
  return [...routes, ...projectRoutes];
}
