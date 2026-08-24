export function SectionHeading({ heading, subheading }: { heading: string; subheading?: string }) {
  return (
    <div>
      <h2 className="font-display text-display font-bold text-text-primary">{heading}</h2>
      {subheading && <p className="mt-2 text-subtitle text-text-secondary">{subheading}</p>}
    </div>
  );
}
