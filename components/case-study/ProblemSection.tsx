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
  return (
    <div>
      <SectionHeading heading={heading} subheading={subheading} />
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-fg-secondary">
            Feedback
          </p>
          <ul className="mt-2 flex flex-col gap-1.5">
            {quotes.map((quote) => (
              <li
                key={quote}
                className="rounded-xl border border-white/10 bg-white/5 p-2 text-sm leading-relaxed text-fg-secondary"
              >
                &ldquo;{quote}&rdquo;
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-fg-secondary">
            Findings
          </p>
          <ul className="mt-2 flex flex-col gap-1.5">
            {stats.map((stat) => (
              <li
                key={stat.label}
                className="rounded-xl border border-white/10 bg-white/5 p-2 text-center"
              >
                <p className="font-display text-3xl font-semibold text-accent-light">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-fg-secondary">{stat.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mt-2 text-xs text-fg-secondary/70">{note}</p>
    </div>
  );
}
