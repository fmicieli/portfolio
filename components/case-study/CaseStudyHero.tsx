import type { CaseStudyMeta } from "@/data/projects";

export function CaseStudyHero({
  title,
  subtitle,
  meta,
  tags,
}: {
  title: string;
  subtitle: string;
  meta: CaseStudyMeta[];
  tags: string[];
}) {
  return (
    <div className="text-center">
      <ul className="flex flex-wrap items-center justify-center gap-2">
        {tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-fg"
          >
            {tag}
          </li>
        ))}
      </ul>
      <h1 className="mt-6 font-display text-3xl font-semibold sm:text-4xl">{title}</h1>
      <p className="mx-auto mt-4 max-w-xl leading-relaxed text-fg-secondary">{subtitle}</p>
      <div className="mx-auto mt-8 flex flex-wrap justify-center gap-x-10 gap-y-4">
        {meta.map((item) => (
          <div key={item.label} className="flex flex-col items-center gap-1">
            <p className="text-sm text-fg-secondary">{item.label}</p>
            <p className="font-display text-lg font-semibold text-fg">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
