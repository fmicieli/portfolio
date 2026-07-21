import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";

export function ProjectsGrid() {
  return (
    <section id="projects" className="relative mx-auto max-w-5xl px-1.5 py-14">
      <Reveal>
        <h2 className="text-2xl font-semibold">Featured projects</h2>
      </Reveal>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.05}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
