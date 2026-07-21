import type { CaseStudyImage, CaseStudyMeta } from "@/data/projects";

export function CaseStudyHero({
  title,
  subtitle,
  meta,
  tags,
  images,
}: {
  title: string;
  subtitle: string;
  meta: CaseStudyMeta[];
  tags: string[];
  images?: CaseStudyImage[];
}) {
  return (
    <div className="text-center">
      <ul className="flex flex-wrap items-center justify-center gap-2">
        {tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-fg"
          >
            {tag}
          </li>
        ))}
      </ul>
      <h1 className="mt-6 font-display text-3xl font-semibold sm:text-4xl">{title}</h1>
      <p className="mx-auto mt-4 max-w-xl leading-relaxed text-fg-secondary">{subtitle}</p>

      {images && images.length > 0 && (
        <div className="mx-auto mt-10 flex items-end justify-center gap-4 sm:gap-6">
          {images.map((image, i) => {
            const isCenter = i === Math.floor((images.length - 1) / 2);
            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={image.src}
                src={image.src}
                alt={image.alt}
                className={`w-24 rounded-2xl border border-white/10 shadow-xl shadow-black/30 sm:w-36 ${
                  isCenter ? "z-10 w-28 sm:w-44" : "mb-4 opacity-90 sm:mb-6"
                }`}
              />
            );
          })}
        </div>
      )}

      <div className="mx-auto mt-10 flex flex-wrap justify-center gap-x-10 gap-y-4">
        {meta.map((item) => (
          <div key={item.label} className="flex flex-col items-center gap-1">
            <p className="text-sm text-fg-secondary">{item.label}</p>
            <p className="font-display text-lg font-semibold text-fg">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
