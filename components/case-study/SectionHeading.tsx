export function SectionHeading({ heading, subheading }: { heading: string; subheading?: string }) {
  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-fg sm:text-3xl">{heading}</h2>
      {subheading && <p className="mt-2 text-fg-secondary">{subheading}</p>}
    </div>
  );
}
