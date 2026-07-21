import { Fragment } from "react";
import type { ProblemStat } from "@/data/projects";
import { SectionHeading } from "@/components/case-study/SectionHeading";

export function ProblemSection({
  heading,
  subheading,
  quotes,
  stats,
  note,
}: {
  heading: string;
  subheading: string;
  quotes: string[];
  stats: ProblemStat[];
  note: string;
}) {
  const rows = Math.max(quotes.length, stats.length);

  return (
    <div>
      <SectionHeading heading={heading} subheading={subheading} />
      {/* A single 2-column grid (not two independent lists) so each row's
          quote and stat box share the same auto-sized row height — grid
          items stretch to fill it by default, which is what keeps them
          visually aligned regardless of how much text either one has. */}
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-fg-secondary">
          Feedback
        </p>
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-fg-secondary">
          Findings
        </p>
        {Array.from({ length: rows }, (_, i) => (
          <Fragment key={i}>
            {quotes[i] && (
              <div className="flex items-center rounded-xl border border-white/10 bg-white/5 p-2 text-sm leading-relaxed text-fg-secondary">
                &ldquo;{quotes[i]}&rdquo;
              </div>
            )}
            {stats[i] && (
              <div className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2 text-center">
                <p className="font-display text-3xl font-semibold text-accent-light">
                  {stats[i].value}
                </p>
                <p className="mt-1 text-sm text-fg-secondary">{stats[i].label}</p>
              </div>
            )}
          </Fragment>
        ))}
      </div>
      <p className="mt-2 text-xs text-fg-secondary/70">{note}</p>
    </div>
  );
}
