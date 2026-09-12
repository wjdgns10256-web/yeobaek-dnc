import { siteConfig } from "@/lib/site-config";
import { services } from "@/lib/services-data";
import { projectCategories } from "@/lib/projects-data";
import { aboutPages } from "@/lib/about-data";

export default function sitemap() {
  const now = new Date();
  const { siteUrl } = siteConfig;

  const staticRoutes = ["", "/about", "/services", "/projects", "/faq"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
  }));

  const aboutRoutes = aboutPages.map((p) => ({
    url: `${siteUrl}/about/${p.slug}`,
    lastModified: now,
  }));

  const serviceRoutes = services.map((s) => ({
    url: `${siteUrl}/services/${s.id}`,
    lastModified: now,
  }));

  const projectRoutes = projectCategories
    .filter((c) => c.key !== "all")
    .map((c) => ({
      url: `${siteUrl}/projects/${c.key}`,
      lastModified: now,
    }));

  return [...staticRoutes, ...aboutRoutes, ...serviceRoutes, ...projectRoutes];
}
