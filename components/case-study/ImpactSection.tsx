import type { ImpactCard } from "@/data/projects";
import { SectionHeading } from "@/components/case-study/SectionHeading";

export function ImpactSection({ heading, cards }: { heading: string; cards: ImpactCard[] }) {
  return (
    <div>
      <SectionHeading heading={heading} />
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {cards.map((card) => (
          <li key={card.title} className="rounded-xl border border-white/10 bg-white/5 p-5">
            <p className="font-medium text-fg">{card.title}</p>
            <dl className="mt-4 flex flex-col gap-3 text-sm">
              <div>
                <dt className="text-xs uppercase tracking-[0.1em] text-fg-secondary/70">
                  Problem
                </dt>
                <dd className="mt-1 text-fg-secondary">{card.problem}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.1em] text-fg-secondary/70">
                  Solution
                </dt>
                <dd className="mt-1 text-fg-secondary">{card.solution}</dd>
              </div>
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
