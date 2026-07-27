import type { CaseStudyImage, SolutionPoint } from "@/data/projects";
import { SectionHeading } from "@/components/case-study/SectionHeading";
import { PhoneScrollDemo } from "@/components/case-study/PhoneScrollDemo";

// Vertical position (% down the phone frame, matching PhoneScrollDemo's own
// box) each annotation's arrow points at: the balance card near the top of
// the cutout, the shortcuts row just below it, and the bottom nav bar near
// the bottom of the screen.
const ANNOTATION_TOP = ["20%", "calc(34% + 40px)", "calc(85% + 40px)"];

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
        <ul className="flex flex-col gap-8">
          {points.map((point) => (
            <li key={point.number} className="flex gap-3">
              <span className="flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-full bg-accent/20 font-display text-[21px] font-semibold text-accent-light">
                {point.number}
              </span>
              <div>
                <p className="font-medium text-fg">{point.title}</p>
                <p className="mt-1 text-base leading-relaxed text-fg-secondary">
                  {point.description}
                </p>
              </div>
            </li>
          ))}
        </ul>

        {hasVisual ? (
          // Mockup on the left, three callouts pointing at fixed spots on
          // its screen (balance card near the top, shortcuts row just below
          // it, bottom nav near the bottom) on the right. All three are on
          // screen together only during the initial pause, then fade out
          // together the moment the auto-scroll starts, via the shared
          // annotation-group-fade keyframe (see globals.css).
          <div className="flex flex-row items-stretch justify-center gap-10">
            {phoneDemo ? (
              <div className="relative shrink-0">
                <PhoneScrollDemo
                  frameSrc={phoneDemo.frameSrc}
                  frameAlt={phoneDemo.frameAlt}
                  scrollSrc={phoneDemo.scrollSrc}
                />
              </div>
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

            {phoneDemo && (
              <div
                className="relative min-h-[64px] flex-1"
                style={{ animation: "annotation-group-fade 16s ease-in-out infinite" }}
              >
                {annotations.map((annotation, i) => (
                  <div
                    key={annotation}
                    className="absolute left-0 flex w-full -translate-y-1/2 items-center gap-2"
                    style={{ top: ANNOTATION_TOP[i] }}
                  >
                    <svg
                      viewBox="0 0 40 24"
                      aria-hidden="true"
                      className="w-8 shrink-0 text-accent-light"
                    >
                      <path d="M1 12 H30" stroke="currentColor" strokeWidth="2" fill="none" />
                      <path
                        d="M22 5 L32 12 L22 19"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="min-w-0 flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs leading-relaxed text-fg-secondary">
                      {annotation}
                    </span>
                  </div>
                ))}
              </div>
            )}
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
