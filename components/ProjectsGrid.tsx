import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";

export function ProjectsGrid() {
  return (
    <section id="proyectos" className="relative mx-auto max-w-5xl px-6 py-28">
      <Reveal>
        <h2 className="text-2xl font-semibold">Proyectos destacados</h2>
      </Reveal>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.05}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
