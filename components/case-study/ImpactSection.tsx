import type { ImpactCard } from "@/data/projects";
import { SectionHeading } from "@/components/case-study/SectionHeading";

function ArrowDown() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="my-1 h-4 w-4 text-fg-secondary/50">
      <path
        d="M8 2 V13 M8 13 L4 9 M8 13 L12 9"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ImpactSection({ heading, cards }: { heading: string; cards: ImpactCard[] }) {
  return (
    <div>
      <SectionHeading heading={heading} />
      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {cards.map((card) => (
          <li key={card.title} className="rounded-xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 shrink-0 text-accent-light">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <path
                  d="M8 12.5 L10.5 15 L16 9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="font-medium text-fg">{card.title}</p>
            </div>
            <dl className="mt-3 flex flex-col text-sm">
              <div>
                <dt className="text-xs uppercase tracking-[0.1em] text-fg-secondary/70">
                  Problem
                </dt>
                <dd className="mt-1 text-fg-secondary">{card.problem}</dd>
              </div>
              <ArrowDown />
              <div>
                <dt className="text-xs uppercase tracking-[0.1em] text-fg-secondary/70">
                  Solution
                </dt>
                <dd className="mt-1 text-fg-secondary">{card.solution}</dd>
              </div>
              <ArrowDown />
              <div>
                <dt className="text-xs uppercase tracking-[0.1em] text-fg-secondary/70">
                  Impact
                </dt>
                <dd className="mt-1 text-fg-secondary">{card.impact}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
    </div>
  );
}
