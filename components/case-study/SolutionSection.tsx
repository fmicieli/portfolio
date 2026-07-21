import type { SolutionPoint } from "@/data/projects";
import { SectionHeading } from "@/components/case-study/SectionHeading";

export function SolutionSection({
  heading,
  subheading,
  points,
  annotations,
}: {
  heading: string;
  subheading: string;
  points: SolutionPoint[];
  annotations: string[];
}) {
  return (
    <div>
      <SectionHeading heading={heading} subheading={subheading} />
      <ul className="mt-4 flex flex-col gap-2.5">
        {points.map((point) => (
          <li key={point.number} className="flex gap-2">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/20 font-display text-sm font-semibold text-accent-light">
              {point.number}
            </span>
            <div>
              <p className="font-medium text-fg">{point.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-fg-secondary">
                {point.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <ul className="mt-3 flex flex-wrap gap-1">
        {annotations.map((annotation) => (
          <li
            key={annotation}
            className="rounded-full border border-white/10 bg-white/5 px-1.5 py-0.5 text-xs text-fg-secondary"
          >
            {annotation}
          </li>
        ))}
      </ul>
    </div>
  );
}
