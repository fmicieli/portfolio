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
    context: CaseStudySection;
    process: CaseStudySection;
    decisions: CaseStudySection;
    result: CaseStudySection;
  };
};

export const projects: Project[] = [
  {
    slug: "bbva-frances",
    title: "BBVA Francés",
    tagline:
      "Unsolicited redesign of the BBVA Argentina app's home and transfer flow.",
    tags: ["UX Research", "Mobile", "Fintech"],
    coverImage: null,
    coverAlt: "Screens from the BBVA Francés app redesign",
    behanceUrl: "https://www.behance.net/gallery/243625059/BBVA-Francs-Caso-de-Estudio",
    contentReady: true,
    sections: {
      context: {
        heading: "Context & problem",
        body: "The BBVA Argentina app resolved a transfer in 6 steps, with information scattered across the home screen and friction finding the most frequent actions. This was an unsolicited redesign: a self-directed exercise exploring how to simplify the flow without access to the real product team, starting from heuristic research on the published app.",
      },
      process: {
        heading: "Process",
        body: "A heuristic (Nielsen) evaluation of the current app, step-by-step mapping of the transfer flow, identifying friction points, and re-prioritizing home screen information based on actual usage frequency reported by users in prior research.",
      },
      decisions: {
        heading: "Key decisions",
        body: "Consolidated redundant confirmation steps, moved destination account selection up to the first step, and redesigned the home screen to prioritize direct transfer shortcuts over promotional content.",
      },
      result: {
        heading: "Result",
        body: "The transfer flow went from 6 steps to 3, keeping the necessary security validations while removing unnecessary navigation friction.",
      },
    },
  },
  {
    slug: "tribu-music",
    title: "Tribu Music",
    tagline: "Product design case study for a music platform.",
    tags: ["Product Design", "UI"],
    coverImage: null,
    coverAlt: "Screens from the Tribu Music project",
    behanceUrl: "https://www.behance.net/gallery/241107187/Tribu-Music-Caso-de-estudio",
    contentReady: false,
    sections: {
      context: { heading: "Context & problem", body: "TODO: content pending" },
      process: { heading: "Process", body: "TODO: content pending" },
      decisions: { heading: "Key decisions", body: "TODO: content pending" },
      result: { heading: "Result", body: "TODO: content pending" },
    },
  },
  {
    slug: "out",
    title: "Section design for OUT",
    tagline: "Design of a product section for OUT.",
    tags: ["UI", "Design System"],
    coverImage: null,
    coverAlt: "Screens from the OUT project",
    behanceUrl: "https://www.behance.net/gallery/230515938/Diseno-de-seccion-para-OUT",
    contentReady: false,
    sections: {
      context: { heading: "Context & problem", body: "TODO: content pending" },
      process: { heading: "Process", body: "TODO: content pending" },
      decisions: { heading: "Key decisions", body: "TODO: content pending" },
      result: { heading: "Result", body: "TODO: content pending" },
    },
  },
  {
    slug: "medife-research",
    title: "Medifé Research",
    tagline: "Research case study for Medifé.",
    tags: ["UX Research", "Healthcare"],
    coverImage: null,
    coverAlt: "Research material from the Medifé project",
    behanceUrl: "https://www.behance.net/gallery/225357747/Medif-Research-Caso-de-estudio",
    contentReady: false,
    sections: {
      context: { heading: "Context & problem", body: "TODO: content pending" },
      process: { heading: "Process", body: "TODO: content pending" },
      decisions: { heading: "Key decisions", body: "TODO: content pending" },
      result: { heading: "Result", body: "TODO: content pending" },
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
