import type { GuideStep } from "@/data/projects";
import { SectionHeading } from "@/components/case-study/SectionHeading";
import { ImagePlaceholder } from "@/components/case-study/ImagePlaceholder";

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
            <div className="mt-4 flex gap-4">
              <ul className="flex flex-1 flex-col gap-2">
                {step.bullets.map((bullet) => (
                  <li key={bullet} className="text-sm leading-relaxed text-fg-secondary">
                    {bullet}
                  </li>
                ))}
              </ul>
              <div className="flex shrink-0 gap-2">
                {step.images.map((image, i) =>
                  "placeholder" in image ? (
                    <ImagePlaceholder key={i} spec={image.placeholder} />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={i}
                      src={image.src}
                      alt={image.alt}
                      className="w-[90px] rounded-lg shadow-lg shadow-black/30"
                    />
                  ),
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
