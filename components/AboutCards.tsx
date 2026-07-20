"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

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
 * from below the viewport like a fanned stack, then spread apart into a row
 * as the section keeps scrolling into view — tracked continuously against
 * scroll position rather than a single fade-in trigger.
 */
function StackToRow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start 40%"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [160, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.35, 1], [0, 1, 1]);

  const xLeft = useTransform(scrollYProgress, [0, 1], [0, -CARD_STEP]);
  const xRight = useTransform(scrollYProgress, [0, 1], [0, CARD_STEP]);
  const rotateLeft = useTransform(scrollYProgress, [0, 1], [-8, 0]);
  const rotateMid = useTransform(scrollYProgress, [0, 1], [3, 0]);
  const rotateRight = useTransform(scrollYProgress, [0, 1], [8, 0]);

  const cardMotion = [
    { x: xLeft, rotate: rotateLeft, z: 1 },
    { x: undefined, rotate: rotateMid, z: 2 },
    { x: xRight, rotate: rotateRight, z: 1 },
  ];

  return (
    <div ref={containerRef} className="relative mx-auto hidden h-[320px] max-w-4xl sm:block">
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

/** Mobile: single column, simple fade/slide-in per card — the horizontal
 *  spread above doesn't translate to a viewport this narrow. */
function StackedColumn() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 px-6 sm:hidden">
      {testimonials.map((item, i) => (
        <motion.div
          key={item.name + i}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-6 rounded-xl border border-white/10 bg-white/5 p-6"
        >
          <CardContent item={item} />
        </motion.div>
      ))}
    </div>
  );
}

export function AboutCards() {
  return (
    <>
      <StackToRow />
      <StackedColumn />
    </>
  );
}
