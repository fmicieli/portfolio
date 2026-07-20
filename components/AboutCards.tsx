"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

const testimonials = [
  { quote: "TODO: testimonio placeholder uno.", name: "TODO: Nombre", role: "TODO: Empresa" },
  { quote: "TODO: testimonio placeholder dos.", name: "TODO: Nombre", role: "TODO: Empresa" },
  { quote: "TODO: testimonio placeholder tres.", name: "TODO: Nombre", role: "TODO: Empresa" },
];

const CARD_WIDTH = 267;
const CARD_GAP = 24;
const CARD_STEP = CARD_WIDTH + CARD_GAP;

function CardContent({ item }: { item: (typeof testimonials)[number] }) {
  return (
    <>
      <span className="font-display text-3xl leading-none text-fg">&ldquo;</span>
      <p className="text-sm leading-relaxed text-fg-secondary">{item.quote}</p>
      <div className="mt-auto">
        <p className="text-sm font-medium text-fg">{item.name}</p>
        <p className="text-sm text-fg-secondary">{item.role}</p>
      </div>
    </>
  );
}

/**
 * Desktop/tablet only: the three cards start fully overlapped, peeking up
 * from below like a fanned stack, then spread apart into a row — driven by
 * `progress` (0-1), a slice of the hero's own pinned scroll rather than the
 * cards' own position in the page, since they live inside Hero's sticky
 * viewport and never actually scroll past it on their own.
 *
 * `progress` covers two scroll gestures worth of pinned motion (see Hero's
 * MID_PROGRESS stop): by roughly its midpoint the cards should already read
 * as "arrived" — visible, mostly settled vertically — but still stacked, not
 * yet spread into a row. So opacity/y resolve early (0-0.6) while the
 * horizontal spread and un-fanning only start after that (0.4-1).
 */
function StackToRow({ progress }: { progress: MotionValue<number> }) {
  const y = useTransform(progress, [0, 0.6], [200, 0]);
  const opacity = useTransform(progress, [0, 0.5], [0, 1]);

  const xLeft = useTransform(progress, [0.4, 1], [0, -CARD_STEP]);
  const xRight = useTransform(progress, [0.4, 1], [0, CARD_STEP]);
  const rotateLeft = useTransform(progress, [0.4, 1], [-8, 0]);
  const rotateMid = useTransform(progress, [0.4, 1], [3, 0]);
  const rotateRight = useTransform(progress, [0.4, 1], [8, 0]);

  const cardMotion = [
    { x: xLeft, rotate: rotateLeft, z: 1 },
    { x: undefined, rotate: rotateMid, z: 2 },
    { x: xRight, rotate: rotateRight, z: 1 },
  ];

  return (
    <div className="relative mx-auto hidden h-[320px] max-w-4xl sm:block">
      {testimonials.map((item, i) => (
        <motion.div
          key={item.name + i}
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            marginLeft: -CARD_WIDTH / 2,
            width: CARD_WIDTH,
            x: cardMotion[i].x,
            y,
            rotate: cardMotion[i].rotate,
            opacity,
            zIndex: cardMotion[i].z,
          }}
          className="flex flex-col gap-6 rounded-xl border border-white/10 bg-white/5 p-6"
        >
          <CardContent item={item} />
        </motion.div>
      ))}
    </div>
  );
}

/** Mobile: single column, simple fade/slide-in — the horizontal spread above
 *  doesn't translate to a viewport this narrow. Same shared `progress`,
 *  since this also lives inside Hero's pinned viewport. */
function StackedColumn({ progress }: { progress: MotionValue<number> }) {
  const y = useTransform(progress, [0, 0.6], [60, 0]);
  const opacity = useTransform(progress, [0, 0.5], [0, 1]);

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-4 px-6 sm:hidden">
      {testimonials.map((item, i) => (
        <motion.div
          key={item.name + i}
          style={{ opacity, y }}
          className="flex flex-col gap-4 rounded-xl border border-white/10 bg-white/5 p-4"
        >
          <CardContent item={item} />
        </motion.div>
      ))}
    </div>
  );
}

export function AboutCards({ progress }: { progress: MotionValue<number> }) {
  return (
    <>
      <StackToRow progress={progress} />
      <StackedColumn progress={progress} />
    </>
  );
}
