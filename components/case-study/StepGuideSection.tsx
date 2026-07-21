import type { GuideStep } from "@/data/projects";
import { SectionHeading } from "@/components/case-study/SectionHeading";

export function StepGuideSection({
  heading,
  subheading,
  steps,
}: {
  heading: string;
  subheading: string;
  steps: GuideStep[];
}) {
  return (
    <div>
      <SectionHeading heading={heading} subheading={subheading} />
      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {steps.map((step) => (
          <li key={step.number} className="rounded-xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/20 font-display text-sm font-semibold text-accent-light">
                {step.number}
              </span>
              <p className="font-medium text-fg">{step.title}</p>
            </div>
            <ul className="mt-4 flex flex-col gap-2">
              {step.bullets.map((bullet) => (
                <li key={bullet} className="text-sm leading-relaxed text-fg-secondary">
                  {bullet}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
