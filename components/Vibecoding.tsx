import { Reveal } from "@/components/Reveal";

export function Vibecoding() {
  return (
    <section className="relative mx-auto max-w-3xl px-6 py-28">
      <Reveal>
        <h2 className="text-2xl font-semibold">Cómo trabajo</h2>
      </Reveal>
      <Reveal delay={0.05}>
        <p className="mt-6 leading-relaxed text-fg-secondary">
          Uso IA generativa para acelerar research y documentación — síntesis de
          entrevistas, generación de variantes de componentes, primeros borradores
          de flujos — pero las decisiones de diseño y de priorización son 100%
          humanas. Esa es la diferencia entre usar IA como atajo y usarla como
          multiplicador de criterio.
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-4 leading-relaxed text-fg-secondary">
          Esta misma landing es un ejemplo de ese flujo: diseñada con criterio propio
          y construida con Claude Code, iterando sobre un sistema de diseño definido
          de antemano en vez de dejar que la IA improvise la dirección visual.
        </p>
      </Reveal>
    </section>
  );
}
