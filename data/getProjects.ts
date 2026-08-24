import type { Language } from "@/contexts/LanguageContext";
import { projects as projectsEn, type Project } from "./projects";
import { projects as projectsEs } from "./projects.es";

export function getProjects(language: Language): Project[] {
  return language === "es" ? projectsEs : projectsEn;
}

export function getLocalizedProjectBySlug(
  slug: string,
  language: Language
): Project | undefined {
  return getProjects(language).find((p) => p.slug === slug);
}
