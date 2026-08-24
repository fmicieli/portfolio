import type { CaseStudySection as CaseStudySectionData } from "@/data/projects";
import { Reveal } from "@/components/Reveal";
import { useTranslation } from "@/lib/i18n/ui";

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
  const t = useTranslation();
  return (
    <Reveal once={false} className="flex min-h-screen flex-col pt-section-top pb-10 snap-start">
      <div
        className={`grid items-center gap-6 sm:grid-cols-2 ${
          reverse ? "sm:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div>
          <h2 className="text-xl font-semibold text-text-primary">{section.heading}</h2>
          <p className="mt-3 leading-relaxed text-text-secondary">{section.body}</p>
        </div>
        <div className="aspect-[4/3] w-full overflow-hidden rounded-card border border-border border-t-[var(--color-border-top-highlight)] bg-surface shadow-card backdrop-blur-card">
          {imageSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imageSrc} alt={imageAlt ?? ""} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-center text-sm text-text-secondary">
              {t.caseStudy.imagePending}
            </div>
          )}
        </div>
      </div>
    </Reveal>
  );
}
