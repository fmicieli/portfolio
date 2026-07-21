import type { CaseStudySection as CaseStudySectionData } from "@/data/projects";
import { Reveal } from "@/components/Reveal";

export function CaseStudySection({
  section,
  imageSrc,
  imageAlt,
  reverse = false,
}: {
  section: CaseStudySectionData;
  imageSrc?: string;
  imageAlt?: string;
  reverse?: boolean;
}) {
  return (
    <Reveal className="py-7">
      <div
        className={`grid items-center gap-4 sm:grid-cols-2 ${
          reverse ? "sm:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div>
          <h2 className="text-xl font-semibold">{section.heading}</h2>
          <p className="mt-2 leading-relaxed text-fg-secondary">{section.body}</p>
        </div>
        <div className="aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/10 bg-white/5">
          {imageSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imageSrc} alt={imageAlt ?? ""} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-center text-xs text-fg-secondary">
              TODO: image pending
            </div>
          )}
        </div>
      </div>
    </Reveal>
  );
}
