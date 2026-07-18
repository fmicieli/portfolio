import { Reveal } from "@/components/Reveal";
import { AboutCards } from "@/components/AboutCards";

export function About() {
  return (
    <section id="sobre-mi" className="relative py-28">
      {/* The "Sobre mí" heading and its intro paragraph appear earlier, as
          the Hero's scroll-driven reveal — not repeated here. */}
      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
          <p className="leading-relaxed text-fg-secondary">
            UX/UI Designer en{" "}
            <span className="text-fg">RED Atlas</span> (Sep 2022–presente), una
            plataforma B2B de datos inmobiliarios en Puerto Rico y Colombia.
          </p>
        </Reveal>
      </div>

      <div className="mt-10">
        <AboutCards />
      </div>

      <div className="mx-auto max-w-3xl px-6">
        <Reveal delay={0.15}>
          <p className="mt-10 leading-relaxed text-fg-secondary">
            Antes, <span className="text-fg">Web &amp; Multimedia Designer en Premium Group</span>{" "}
            (Abr 2021–Ago 2022).
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-10">
            <h3 className="text-sm font-medium text-fg">Formación</h3>
            <p className="mt-2 text-sm leading-relaxed text-fg-secondary">
              Técnicatura en Diseño Multimedial (ISEC, 2016–2018). Certificaciones en
              UI Design, UX Research y UX/UI Design (Talento Tech / Coderhouse,
              2021–2025).
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
