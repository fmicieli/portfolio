import type { FlowStep } from "@/data/projects";
import { SectionHeading } from "@/components/case-study/SectionHeading";

// One icon per highlight card, in order: early validation (shield),
// combined steps (layers), speed + security (bolt).
const HIGHLIGHT_ICON_PATHS = [
  <path
    key="shield"
    d="M12 3 L20 6 V11 C20 16 16.5 19.5 12 21 C7.5 19.5 4 16 4 11 V6 Z"
    stroke="currentColor"
    strokeWidth="1.5"
    fill="none"
    strokeLinejoin="round"
  />,
  <g key="layers">
    <path d="M12 4 L21 8.5 L12 13 L3 8.5 Z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
    <path d="M3 13.5 L12 18 L21 13.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </g>,
  <path
    key="bolt"
    d="M13 3 L5 13 H11 L10 21 L19 10 H13 Z"
    stroke="currentColor"
    strokeWidth="1.5"
    fill="none"
    strokeLinejoin="round"
  />,
];

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
  // "50% reduction" -> ["50%", "reduction"], so the number can be shown
  // bigger with the word below it, rather than as one same-size line.
  const [reductionValue, ...reductionRest] = reductionLabel.split(" ");
  const reductionWord = reductionRest.join(" ");

  return (
    <div>
      <SectionHeading heading={heading} subheading={subheading} />
      <div className="mt-6 grid items-stretch justify-center gap-8 sm:grid-cols-[auto_auto_auto]">
        <div className="w-full max-w-xs rounded-xl border border-white/10 bg-white/5 p-5 sm:w-64">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-fg-secondary">
            Before
          </p>
          <div className="mt-3">
            <StepList steps={before} />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center text-center">
          <p className="font-display text-[2.8125rem] font-semibold leading-none text-accent-light">
            {reductionValue}
          </p>
          {reductionWord && (
            <p className="mt-1 text-sm text-fg-secondary">{reductionWord}</p>
          )}
        </div>

        <div className="w-full max-w-xs rounded-xl border border-white/10 bg-white/5 p-5 sm:w-64">
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

      <ul className="mt-6 grid gap-4 sm:grid-cols-3">
        {highlights.map((highlight, i) => (
          <li key={highlight.title} className="rounded-xl border border-white/10 bg-white/5 p-4">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 text-accent-light">
              {HIGHLIGHT_ICON_PATHS[i]}
            </svg>
            <p className="mt-3 font-medium text-fg">{highlight.title}</p>
            <p className="mt-1 text-sm text-fg-secondary">{highlight.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
