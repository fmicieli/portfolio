import type { CaseStudyImage, SolutionPoint } from "@/data/projects";
import { SectionHeading } from "@/components/case-study/SectionHeading";
import { PhoneScrollDemo } from "@/components/case-study/PhoneScrollDemo";

export function SolutionSection({
  heading,
  subheading,
  points,
  annotations,
  image,
  phoneDemo,
}: {
  heading: string;
  subheading: string;
  points: SolutionPoint[];
  annotations: string[];
  image?: CaseStudyImage;
  phoneDemo?: { frameSrc: string; frameAlt: string; scrollSrc: string };
}) {
  const hasVisual = Boolean(image || phoneDemo);

  return (
    <div>
      <SectionHeading heading={heading} subheading={subheading} />
      <div className={hasVisual ? "mt-6 grid gap-8 sm:grid-cols-2 sm:items-center" : "mt-6"}>
        <ul className="flex flex-col gap-5">
          {points.map((point) => (
            <li key={point.number} className="flex gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/20 font-display text-sm font-semibold text-accent-light">
                {point.number}
              </span>
              <div>
                <p className="font-medium text-fg">{point.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-fg-secondary">
                  {point.description}
                </p>
              </div>
            </li>
          ))}
        </ul>

        {hasVisual ? (
          // Mockup on top, its callouts wrapped below it — the Figma
          // original connects these with pointer lines, which doesn't
          // translate cleanly outside Figma, and a full-size phone mockup
          // doesn't leave room for a text sidebar next to it, so this
          // stacks them instead of splitting the column horizontally.
          <div className="flex flex-col items-center justify-center gap-4">
            {phoneDemo ? (
              <PhoneScrollDemo
                frameSrc={phoneDemo.frameSrc}
                frameAlt={phoneDemo.frameAlt}
                scrollSrc={phoneDemo.scrollSrc}
              />
            ) : (
              image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-32 shrink-0 rounded-2xl border border-white/10 shadow-xl shadow-black/30 sm:w-40"
                />
              )
            )}
            <ul className="flex flex-wrap justify-center gap-2">
              {annotations.map((annotation) => (
                <li
                  key={annotation}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs leading-relaxed text-fg-secondary"
                >
                  {annotation}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <ul className="mt-4 flex flex-wrap gap-2">
            {annotations.map((annotation) => (
              <li
                key={annotation}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-fg-secondary"
              >
                {annotation}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
