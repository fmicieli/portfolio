export type CaseStudySection = {
  heading: string;
  body: string;
};

export type CaseStudyMeta = { label: string; value: string };
export type ProblemStat = { value: string; label: string };
export type BenchmarkRow = { name: string; steps: number; highlight?: boolean };
export type SolutionPoint = { number: string; title: string; description: string };
export type FlowStep = { number: string; label: string };
export type GuideStep = { number: string; title: string; bullets: string[] };
export type ImpactCard = { title: string; problem: string; solution: string; impact: string };
export type NextPhase = { title: string; items: string[] };
export type CaseStudyImage = { src: string; alt: string };

export type CaseStudyBlock =
  | {
      type: "hero";
      title: string;
      subtitle: string;
      meta: CaseStudyMeta[];
      tags: string[];
      images?: CaseStudyImage[];
    }
  | {
      type: "problem";
      heading: string;
      subheading: string;
      quotes: string[];
      stats: ProblemStat[];
      note: string;
    }
  | {
      type: "benchmarking";
      heading: string;
      subheading: string;
      note: string;
      rows: BenchmarkRow[];
    }
  | {
      type: "solution";
      heading: string;
      subheading: string;
      points: SolutionPoint[];
      annotations: string[];
    }
  | {
      type: "flow-comparison";
      heading: string;
      subheading: string;
      before: FlowStep[];
      after: FlowStep[];
      afterLabel: string;
      reductionLabel: string;
      highlights: { title: string; description: string }[];
    }
  | { type: "step-guide"; heading: string; subheading: string; steps: GuideStep[] }
  | { type: "impact"; heading: string; cards: ImpactCard[] }
  | { type: "next-steps"; heading: string; subheading: string; phases: NextPhase[] }
  | { type: "disclaimer"; text: string };

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
  /** When present, the project page renders these instead of `sections`. */
  caseStudyBlocks?: CaseStudyBlock[];
};

export const projects: Project[] = [
  {
    slug: "bbva-frances",
    title: "BBVA Francés App Redesign",
    tagline:
      "Simplifying the home screen and transfer flow to improve the mobile banking experience.",
    tags: ["UX Research", "Mobile", "Fintech"],
    coverImage: "/projects/bbva-frances/home-screen.png",
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
    caseStudyBlocks: [
      {
        type: "hero",
        title: "BBVA Francés App Redesign",
        subtitle:
          "Simplifying the home screen and transfer flow to improve the mobile banking experience",
        images: [
          { src: "/projects/bbva-frances/destination-account.png", alt: "Destination account screen" },
          { src: "/projects/bbva-frances/home-screen.png", alt: "Redesigned home screen" },
          { src: "/projects/bbva-frances/transfer-amount.png", alt: "Transfer amount screen" },
        ],
        meta: [
          { label: "Role", value: "UX/UI Designer" },
          { label: "Duration", value: "10 Days" },
          { label: "Platform", value: "iOS" },
          { label: "Tools", value: "Figma, Claude AI" },
        ],
        tags: ["Case study", "February 2026"],
      },
      {
        type: "problem",
        heading: "Problem",
        subheading: "What users think about BBVA Francés",
        quotes: [
          "I can't find how to transfer money",
          "Everything's mixed together, it's confusing",
          "I don't know when my transfer will arrive",
        ],
        stats: [
          { value: "42%", label: "Can't find basic functions" },
          { value: "80%", label: "UX problems, not technical ones" },
          { value: "#1", label: "Transfers — pain point" },
        ],
        note: "89 reviews analyzed — June 2025 to January 2026",
      },
      {
        type: "benchmarking",
        heading: "Benchmarking",
        subheading: "We analyzed 4 competitors in the Argentine market",
        note: "Steps to complete a transfer",
        rows: [
          { name: "Banco Galicia", steps: 6 },
          { name: "Mercado Pago", steps: 4 },
          { name: "Naranja X", steps: 4 },
          { name: "Cuenta DNI", steps: 2 },
          { name: "New solution", steps: 3, highlight: true },
        ],
      },
      {
        type: "solution",
        heading: "Solution",
        subheading: "How we solve the identified problems",
        points: [
          {
            number: "1",
            title: "Clear Visual Hierarchy",
            description: "The most used, most visible. Balance and key actions stand out.",
          },
          {
            number: "2",
            title: "Progressive Validation",
            description: "Catch errors early to avoid frustration.",
          },
          {
            number: "3",
            title: "Reduced Friction",
            description: "3 steps instead of 6. Fast without sacrificing security.",
          },
        ],
        annotations: [
          "Balance highlighted with maximum visual hierarchy",
          "Prioritized shortcuts: most-used front and center",
          "QR in the FAB for instant payments",
        ],
      },
      {
        type: "flow-comparison",
        heading: "Transfer Flow Optimization",
        subheading: "From 6 confusing steps to 3 clearer ones",
        before: [
          { number: "1", label: "Account confirmation" },
          { number: "2", label: "Recipient selection" },
          { number: "3", label: "Recipient data confirmation" },
          { number: "4", label: "Transfer amount" },
          { number: "5", label: "Operation confirmation" },
          { number: "6", label: "SMS code confirmation" },
        ],
        after: [
          { number: "1", label: "Recipient" },
          { number: "2", label: "Data validation" },
          { number: "3", label: "Amount + account + confirmation" },
        ],
        afterLabel: "Redesign",
        reductionLabel: "50% reduction",
        highlights: [
          { title: "Early validation", description: "Prevents errors before they happen" },
          { title: "Combined steps", description: "Fewer frictions, same security" },
          { title: "Speed + Security", description: "Speed without compromising protection" },
        ],
      },
      {
        type: "step-guide",
        heading: "Step-by-Step Guide",
        subheading: "How the new transfer flow works",
        steps: [
          {
            number: "1",
            title: "Recipient",
            bullets: [
              "Single input (Alias/CBU/CVU)",
              "Recent contacts visible",
              "Automatic validation",
            ],
          },
          {
            number: "2",
            title: "Data Confirmation",
            bullets: [
              "Name and bank validated",
              "Shows full CBU and CUIT",
              "Option to save contact",
            ],
          },
          {
            number: "3",
            title: "Amount + Source",
            bullets: [
              "Instant numeric keypad + visible balance",
              "Source account selection",
              "Confirm transfer button",
            ],
          },
          {
            number: "4",
            title: "Success",
            bullets: [
              "Clear visual status",
              "Receipt available",
              "Operation number, date, and time visible",
            ],
          },
        ],
      },
      {
        type: "impact",
        heading: "Design with Impact",
        cards: [
          {
            title: "Progressive Validation",
            problem: "Late errors in the process",
            solution: "Validation at every step",
            impact: "Prevents frustration",
          },
          {
            title: "Intermediate Confirmation",
            problem: "Users transfer to the wrong destination",
            solution: "Modal with complete data before the amount",
            impact: "Reviews the recipient before committing money",
          },
          {
            title: "Everything on One Screen",
            problem: "Fragmented screens lengthen the process",
            solution: "Amount + Account + Confirmation in a single view",
            impact: "Reduces steps without losing clarity",
          },
          {
            title: "Visual Hierarchy on Home",
            problem: "42% can't find basic functions",
            solution: "Highlighted balance + prioritized shortcuts",
            impact: "Immediate access to critical functions",
          },
        ],
      },
      {
        type: "next-steps",
        heading: "What's Next",
        subheading: "Next steps for the project",
        phases: [
          {
            title: "Phase 1: Validation",
            items: [
              "User testing: 5 to 8 participants",
              "Measured: time on task, error rate, satisfaction",
              "Iteration based on findings",
            ],
          },
          {
            title: "Phase 2: Expansion",
            items: [
              "Pay bills (pain point #2)",
              "Account details and transaction history",
              "Card management feature",
              "Settings and profile",
            ],
          },
          {
            title: "Phase 3: Implementation",
            items: [
              "Documentation",
              "Component library",
              "Transition and animation guides",
              "Handoff to the development team",
            ],
          },
        ],
      },
      {
        type: "disclaimer",
        text: "This is a personal conceptual redesign project created for educational and portfolio purposes. I am not affiliated with BBVA Francés, nor was I hired by the company to do this work. All proposals and designs are hypothetical and do not represent official BBVA plans. The brands, logos, and trade names shown are the property of their respective owners and are used solely for illustrative purposes in this case study.",
      },
    ],
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
