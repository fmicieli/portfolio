import { Reveal } from "@/components/Reveal";

export function Contact() {
  return (
    <section id="contact" className="relative px-[15vw] py-14">
      <Reveal>
        <h2 className="text-2xl font-semibold">Contact</h2>
      </Reveal>
      <Reveal delay={0.05}>
        <p className="mt-3 leading-relaxed text-fg-secondary">
          Let&apos;s talk about a project?{" "}
          <a
            href="mailto:fmicieli94@gmail.com"
            className="text-accent-light underline underline-offset-4 hover:text-fg"
          >
            fmicieli94@gmail.com
          </a>
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-2 text-sm text-fg-secondary">
          Full project history, while I migrate this portfolio: Behance
          {" "}
          <span className="text-fg-secondary/70">
            (TODO: content pending — missing the Behance profile URL)
          </span>
        </p>
      </Reveal>
    </section>
  );
}
