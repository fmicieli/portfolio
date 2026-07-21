import type { FlowStep } from "@/data/projects";
import { SectionHeading } from "@/components/case-study/SectionHeading";

function StepList({ steps }: { steps: FlowStep[] }) {
  return (
    <ol className="flex flex-col gap-3">
      {steps.map((step) => (
        <li key={step.number} className="flex items-center gap-3">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-medium text-fg">
            {step.number}
          </span>
          <span className="text-sm text-fg-secondary">{step.label}</span>
        </li>
      ))}
    </ol>
  );
}

export function FlowComparisonSection({
  heading,
  subheading,
  before,
  after,
  afterLabel,
  reductionLabel,
  highlights,
}: {
  heading: string;
  subheading: string;
  before: FlowStep[];
  after: FlowStep[];
  afterLabel: string;
  reductionLabel: string;
  highlights: { title: string; description: string }[];
}) {
  return (
    <div>
      <SectionHeading heading={heading} subheading={subheading} />
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-fg-secondary">
            Before
          </p>
          <div className="mt-3">
            <StepList steps={before} />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-fg-secondary">
              After
            </p>
            <span className="rounded-full bg-accent/20 px-2 py-0.5 text-xs font-medium text-accent-light">
              {afterLabel}
            </span>
          </div>
          <div className="mt-3">
            <StepList steps={after} />
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-5">
        <p className="font-display text-3xl font-semibold text-accent-light">{reductionLabel}</p>
      </div>

      <ul className="mt-6 grid gap-4 sm:grid-cols-3">
        {highlights.map((highlight) => (
          <li key={highlight.title} className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="font-medium text-fg">{highlight.title}</p>
            <p className="mt-1 text-sm text-fg-secondary">{highlight.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
