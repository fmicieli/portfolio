import Link from "next/link";
import type { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex h-[26rem] w-full flex-col overflow-hidden rounded-xl border border-white/10 transition-transform hover:-translate-y-1 hover:scale-[1.01]"
    >
      <div className="relative h-48 w-full shrink-0 overflow-hidden bg-white/5">
        {project.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.coverImage}
            alt={project.coverAlt}
            className="h-full w-full object-cover object-top"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center text-center text-xs text-fg-secondary"
            role="img"
            aria-label={`${project.coverAlt} — image pending replacement`}
          >
            TODO: image pending
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1.5 overflow-hidden p-2.5">
        <h3 className="line-clamp-1 font-display text-lg font-medium text-fg">{project.title}</h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-fg-secondary">
          {project.tagline}
        </p>
        <ul className="mt-auto flex flex-wrap gap-1 pt-1">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-white bg-white/20 px-1.5 py-0.5 text-xs text-white"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}
