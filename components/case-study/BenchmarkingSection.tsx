import type { BenchmarkRow } from "@/data/projects";
import { SectionHeading } from "@/components/case-study/SectionHeading";

export function BenchmarkingSection({
  heading,
  subheading,
  note,
  rows,
}: {
  heading: string;
  subheading: string;
  note: string;
  rows: BenchmarkRow[];
}) {
  const maxSteps = Math.max(...rows.map((row) => row.steps));

  return (
    <div>
      <SectionHeading heading={heading} subheading={subheading} />
      <p className="mt-4 text-xs font-medium uppercase tracking-[0.15em] text-fg-secondary">
        {note}
      </p>
      <ul className="mt-2 flex flex-col gap-1.5">
        {rows.map((row) => (
          <li key={row.name} className="flex items-center gap-2">
            <p className="w-32 shrink-0 text-sm text-fg-secondary sm:w-40">{row.name}</p>
            <div className="relative h-8 flex-1 overflow-hidden rounded-full bg-white/5">
              <div
                className={`h-full rounded-full ${row.highlight ? "bg-accent" : "bg-white/20"}`}
                style={{ width: `${(row.steps / maxSteps) * 100}%` }}
              />
            </div>
            <p className="w-6 shrink-0 text-right text-sm font-medium text-fg">{row.steps}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
