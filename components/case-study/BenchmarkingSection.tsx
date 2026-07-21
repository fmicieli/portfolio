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

  const competitors = rows.filter((row) => row.logo);

  return (
    <div>
      <SectionHeading heading={heading} subheading={subheading} />

      <ul className="mt-6 flex flex-wrap justify-center gap-8">
        {competitors.map((row) => (
          <li key={row.name} className="flex flex-col items-center gap-2">
            <div className="flex h-[90px] w-[90px] items-center justify-center rounded-full bg-white p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={row.logo} alt={row.name} className="h-full w-full object-contain" />
            </div>
            <p className="text-xs text-fg-secondary">{row.name}</p>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-xs font-medium uppercase tracking-[0.15em] text-fg-secondary">
        {note}
      </p>
      <ul className="mt-3 flex flex-col gap-2.5">
        {rows.map((row) => (
          <li key={row.name} className="flex items-center gap-3">
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
