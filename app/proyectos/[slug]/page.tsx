import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/data/projects";
import { CaseStudySection } from "@/components/CaseStudySection";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Florencia Micieli`,
    description: project.tagline,
    openGraph: {
      title: `${project.title} — Florencia Micieli`,
      description: project.tagline,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const sections = Object.values(project.sections);

  return (
    <>
      <Header />
      <main className="relative mx-auto max-w-3xl px-6 pb-28 pt-32">
        <Reveal>
          <Link
            href="/#proyectos"
            className="text-sm text-fg-secondary hover:text-fg"
          >
            ← Volver a proyectos
          </Link>
          <h1 className="mt-6 font-display text-3xl font-semibold sm:text-4xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-xl leading-relaxed text-fg-secondary">
            {project.tagline}
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-white/10 px-3 py-1 text-xs text-fg-secondary"
              >
                {tag}
              </li>
            ))}
          </ul>
          {!project.contentReady && (
            <p className="mt-6 rounded-lg border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-fg-secondary">
              TODO: contenido pendiente — este case study todavía no tiene el
              contenido e imágenes definitivas.{" "}
              <a
                href={project.behanceUrl}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4 hover:text-fg"
              >
                Ver mientras tanto en Behance
              </a>
              .
            </p>
          )}
        </Reveal>

        <div className="mt-4 divide-y divide-white/10">
          {sections.map((section, i) => (
            <CaseStudySection key={section.heading} section={section} reverse={i % 2 === 1} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
