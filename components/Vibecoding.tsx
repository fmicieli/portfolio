import { Reveal } from "@/components/Reveal";

export function Vibecoding() {
  return (
    <section className="relative mx-auto max-w-3xl px-6 py-28">
      <Reveal>
        <h2 className="text-2xl font-semibold">How I work</h2>
      </Reveal>
      <Reveal delay={0.05}>
        <p className="mt-6 leading-relaxed text-fg-secondary">
          I use generative AI to speed up research and documentation — synthesizing
          interviews, generating component variants, drafting first-pass flows —
          but design and prioritization decisions are 100% human. That&apos;s the
          difference between using AI as a shortcut and using it as a multiplier
          for judgment.
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-4 leading-relaxed text-fg-secondary">
          This very landing page is an example of that workflow: designed with my
          own judgment and built with Claude Code, iterating on a design system
          defined upfront instead of letting AI improvise the visual direction.
        </p>
      </Reveal>
    </section>
  );
}
