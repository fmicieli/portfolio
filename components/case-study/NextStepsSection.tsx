import type { NextPhase } from "@/data/projects";
import { SectionHeading } from "@/components/case-study/SectionHeading";

export function NextStepsSection({
  heading,
  subheading,
  phases,
}: {
  heading: string;
  subheading: string;
  phases: NextPhase[];
}) {
  return (
    <div>
      <SectionHeading heading={heading} subheading={subheading} />
      <ul className="mt-6 grid gap-4 sm:grid-cols-3">
        {phases.map((phase) => (
          <li key={phase.title} className="rounded-xl border border-white/10 bg-white/5 p-5">
            <p className="font-medium text-fg">{phase.title}</p>
            <ul className="mt-3 flex flex-col gap-2">
              {phase.items.map((item) => (
                <li key={item} className="text-sm leading-relaxed text-fg-secondary">
                  {item}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
