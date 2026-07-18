import Link from "next/link";
import type { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/proyectos/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-white/10 transition-transform hover:-translate-y-1 hover:scale-[1.01]"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-white/5">
        {project.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.coverImage}
            alt={project.coverAlt}
            className="h-full w-full object-cover"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center text-center text-xs text-fg-secondary"
            role="img"
            aria-label={`${project.coverAlt} — imagen pendiente de reemplazo`}
          >
            TODO: imagen pendiente
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-display text-lg font-medium text-fg">{project.title}</h3>
        <p className="text-sm leading-relaxed text-fg-secondary">{project.tagline}</p>
        <ul className="mt-auto flex flex-wrap gap-2 pt-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-white/10 px-3 py-1 text-xs text-fg-secondary"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}
