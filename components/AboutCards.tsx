"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

const skills = [
  {
    title: "User Research",
    text: "Understanding real user needs through interviews, personas, and journey mapping.",
    tags: ["Claude", "Manual research", "Google Meet", "Loom", "Miro"],
  },
  {
    title: "Testing & Heuristic Evaluation",
    text: "Validating usability with real users and Nielsen's heuristics.",
    tags: ["Google Meet", "Loom"],
  },
  {
    title: "Accessibility",
    text: "Designing inclusive interfaces that meet WCAG AA standards.",
    tags: ["Stark (Figma)"],
  },
  {
    title: "UX/UI Design",
    text: "Wireframes, high-fidelity prototypes, and scalable design systems.",
    tags: ["Figma"],
  },
  {
    title: "Documentation & Visual Design",
    text: "Specs, redlines, and visual assets ready for development.",
    tags: ["Figma", "Photoshop", "Illustrator"],
  },
  {
    title: "AI-Assisted Vibe Coding",
    text: "Building functional prototypes independently, powered by AI.",
    tags: ["Claude Code", "Framer", "Vercel"],
  },
];

const COLUMNS = 3;
const ROWS = Math.ceil(skills.length / COLUMNS);

const CARD_WIDTH = 400;
const CARD_GAP = 56;
const CARD_STEP = CARD_WIDTH + CARD_GAP;
const ROW_GAP = 20;
// Kept compact (short padding/type below to match) so heading + two full
// rows still fit inside the hero's single pinned screen.
const CARD_HEIGHT = 210;
const ROW_STEP = CARD_HEIGHT + ROW_GAP;

// How far apart each card's center sits in the *starting* single-row, fanned
// arrangement — tight enough that all six fit across one screen (they
// overlap somewhat), wide enough to read as "spread out", not stacked.
const START_STEP = 220;

// Same peek travel as before: how far below the viewport's bottom edge the
// row still sits at the mid checkpoint, cut off by the sticky container's
// overflow-hidden, before the second scroll gesture settles everything.
const PEEK_OFFSET = 460;

function CardContent({ item }: { item: (typeof skills)[number] }) {
  return (
    <>
      <h3 className="font-display text-lg font-semibold text-fg">{item.title}</h3>
      <p className="text-sm leading-relaxed text-fg-secondary">{item.text}</p>
      <div className="mt-auto flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white bg-white/20 px-3 py-1 text-xs text-white"
          >
            {tag}
          </span>
        ))}
      </div>
    </>
  );
}

const CARD_STYLE =
  "flex flex-col gap-3 rounded-xl border border-white/10 bg-white/10 p-5 backdrop-blur-md";

/**
 * Desktop/tablet only: all six cards start already distributed across one
 * fanned horizontal row (peeking up from below the viewport), then on
 * continued scroll condense into a compact 3-column x 2-row grid — driven by
 * `progress` (0-1), a slice of the hero's own pinned scroll rather than the
 * cards' own position in the page, since they live inside Hero's sticky
 * viewport and never actually scroll past it on their own.
 *
 * Each card's x target is unique (its starting single-row slot -> its final
 * grid column), so each needs its own motion value — six of them, named
 * individually rather than built in a loop so this stays a fixed, static set
 * of hook calls. y only takes one of two values (which row a card ends up
 * in), so those two are shared.
 */
function StackToGrid({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.4], [0, 1]);

  const startX = (i: number) => (i - (skills.length - 1) / 2) * START_STEP;
  const finalX = (i: number) => ((i % COLUMNS) - 1) * CARD_STEP;

  const x0 = useTransform(progress, [0, 1], [startX(0), finalX(0)]);
  const x1 = useTransform(progress, [0, 1], [startX(1), finalX(1)]);
  const x2 = useTransform(progress, [0, 1], [startX(2), finalX(2)]);
  const x3 = useTransform(progress, [0, 1], [startX(3), finalX(3)]);
  const x4 = useTransform(progress, [0, 1], [startX(4), finalX(4)]);
  const x5 = useTransform(progress, [0, 1], [startX(5), finalX(5)]);
  const xByIndex = [x0, x1, x2, x3, x4, x5];

  const yRow0 = useTransform(progress, [0, 1], [PEEK_OFFSET, 0]);
  const yRow1 = useTransform(progress, [0, 1], [PEEK_OFFSET, ROW_STEP]);
  const yByRow = [yRow0, yRow1];

  return (
    <div
      className="relative mx-auto hidden max-w-6xl sm:block"
      style={{ height: ROWS * ROW_STEP }}
    >
      {skills.map((item, i) => {
        const row = Math.floor(i / COLUMNS);
        return (
          <motion.div
            key={item.title}
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              marginLeft: -CARD_WIDTH / 2,
              width: CARD_WIDTH,
              height: CARD_HEIGHT,
              x: xByIndex[i],
              y: yByRow[row],
              opacity,
            }}
            className={CARD_STYLE}
          >
            <CardContent item={item} />
          </motion.div>
        );
      })}
    </div>
  );
}

/** Mobile: a plain 2-column grid (no horizontal spread to animate — there's
 *  no room for a fanned row on a narrow screen), sharing the same
 *  peek-from-below/fade-in as the desktop version. */
function StackedGrid({ progress }: { progress: MotionValue<number> }) {
  const y = useTransform(progress, [0, 1], [PEEK_OFFSET, 0]);
  const opacity = useTransform(progress, [0, 0.4], [0, 1]);

  return (
    <div className="mx-auto grid max-w-4xl grid-cols-2 gap-3 px-6 sm:hidden">
      {skills.map((item) => (
        <motion.div key={item.title} style={{ opacity, y }} className={CARD_STYLE}>
          <CardContent item={item} />
        </motion.div>
      ))}
    </div>
  );
}

export function AboutCards({ progress }: { progress: MotionValue<number> }) {
  return (
    <>
      <StackToGrid progress={progress} />
      <StackedGrid progress={progress} />
    </>
  );
}
