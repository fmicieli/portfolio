export type CaseStudySection = {
  heading: string;
  body: string;
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  tags: string[];
  coverImage: string | null;
  coverAlt: string;
  behanceUrl: string;
  contentReady: boolean;
  sections: {
    contexto: CaseStudySection;
    proceso: CaseStudySection;
    decisiones: CaseStudySection;
    resultado: CaseStudySection;
  };
};

export const projects: Project[] = [
  {
    slug: "bbva-frances",
    title: "BBVA Francés",
    tagline:
      "Rediseño no solicitado del home y el flujo de transferencias de la app de BBVA Argentina.",
    tags: ["UX Research", "Mobile", "Fintech"],
    coverImage: null,
    coverAlt: "Pantallas del rediseño de la app de BBVA Francés",
    behanceUrl: "https://www.behance.net/gallery/243625059/BBVA-Francs-Caso-de-Estudio",
    contentReady: true,
    sections: {
      contexto: {
        heading: "Contexto y problema",
        body: "La app de BBVA Argentina resolvía una transferencia en 6 pasos, con información dispersa en el home y fricción para encontrar las acciones más frecuentes. El proyecto fue un rediseño no solicitado (unsolicited redesign): un ejercicio propio para explorar cómo simplificar el flujo sin acceso al equipo de producto real, partiendo de research heurístico sobre la app publicada.",
      },
      proceso: {
        heading: "Proceso",
        body: "Evaluación heurística (Nielsen) de la app actual, mapeo del flujo de transferencias paso a paso, identificación de puntos de fricción y re-priorización de la información del home según frecuencia de uso real reportada por usuarios en research previo.",
      },
      decisiones: {
        heading: "Decisiones clave",
        body: "Se consolidaron pasos redundantes de confirmación, se adelantó la selección de cuenta destino al primer paso, y se rediseñó el home para priorizar accesos directos a transferencias sobre contenido promocional.",
      },
      resultado: {
        heading: "Resultado",
        body: "El flujo de transferencias se redujo de 6 a 3 pasos, manteniendo las validaciones de seguridad necesarias pero eliminando fricción innecesaria en la navegación.",
      },
    },
  },
  {
    slug: "tribu-music",
    title: "Tribu Music",
    tagline: "Caso de estudio de diseño de producto para una plataforma musical.",
    tags: ["Product Design", "UI"],
    coverImage: null,
    coverAlt: "Pantallas del proyecto Tribu Music",
    behanceUrl: "https://www.behance.net/gallery/241107187/Tribu-Music-Caso-de-estudio",
    contentReady: false,
    sections: {
      contexto: { heading: "Contexto y problema", body: "TODO: contenido pendiente" },
      proceso: { heading: "Proceso", body: "TODO: contenido pendiente" },
      decisiones: { heading: "Decisiones clave", body: "TODO: contenido pendiente" },
      resultado: { heading: "Resultado", body: "TODO: contenido pendiente" },
    },
  },
  {
    slug: "out",
    title: "Diseño de sección para OUT",
    tagline: "Diseño de una sección de producto para OUT.",
    tags: ["UI", "Design System"],
    coverImage: null,
    coverAlt: "Pantallas del proyecto OUT",
    behanceUrl: "https://www.behance.net/gallery/230515938/Diseno-de-seccion-para-OUT",
    contentReady: false,
    sections: {
      contexto: { heading: "Contexto y problema", body: "TODO: contenido pendiente" },
      proceso: { heading: "Proceso", body: "TODO: contenido pendiente" },
      decisiones: { heading: "Decisiones clave", body: "TODO: contenido pendiente" },
      resultado: { heading: "Resultado", body: "TODO: contenido pendiente" },
    },
  },
  {
    slug: "medife-research",
    title: "Medifé Research",
    tagline: "Caso de estudio de research para Medifé.",
    tags: ["UX Research", "Healthcare"],
    coverImage: null,
    coverAlt: "Material de research del proyecto Medifé",
    behanceUrl: "https://www.behance.net/gallery/225357747/Medif-Research-Caso-de-estudio",
    contentReady: false,
    sections: {
      contexto: { heading: "Contexto y problema", body: "TODO: contenido pendiente" },
      proceso: { heading: "Proceso", body: "TODO: contenido pendiente" },
      decisiones: { heading: "Decisiones clave", body: "TODO: contenido pendiente" },
      resultado: { heading: "Resultado", body: "TODO: contenido pendiente" },
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
