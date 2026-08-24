"use client";

import { motion } from "framer-motion";
import type { ImpactCard } from "@/data/projects";
import { SectionHeading } from "@/components/case-study/SectionHeading";
import { useTranslation } from "@/lib/i18n/ui";

// How long each card's own fade-in takes (see the `motion.li` below) — the
// Problem -> arrow -> Solution -> arrow -> Impact sequence inside a card
// only starts once that card itself has finished appearing, not before.
const CARD_STAGGER = 0.08;
const CARD_DURATION = 0.5;
// Spacing between each piece of the internal sequence (a row, then an
// arrow, then the next row...).
const SEQUENCE_STEP = 0.18;

// Two-stage draw: the vertical "stick" draws in first, then the ">" chevron
// — built as two separate paths (not one, like the original) so each can
// animate its own `pathLength` in sequence instead of one draw covering
// both pieces at once.
function ArrowDown({ delay }: { delay: number }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="my-3 h-4 w-4 self-center text-text-secondary">
      <motion.path
        d="M8 2 V11"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: false, margin: "-40px" }}
        transition={{ duration: 0.2, delay, ease: "easeOut" }}
      />
      <motion.path
        d="M4 9 L8 13 L12 9"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: false, margin: "-40px" }}
        transition={{ duration: 0.15, delay: delay + 0.2, ease: "easeOut" }}
      />
    </svg>
  );
}

// The card-title icon, shown big (2x the old 16px) and stacked above the
// title instead of beside it.
function ImpactIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 shrink-0 text-accent">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path
        d="M8 12.5 L10.5 15 L16 9"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// The label reads as the start of the same sentence ("Problem: Late errors
// in the process"), not a separate small uppercase heading above it — same
// text-body typography throughout, just the label word itself in bold.
function Row({ label, value, delay }: { label: string; value: string; delay: number }) {
  return (
    <motion.dd
      className="text-body text-text-secondary"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-40px" }}
      transition={{ duration: 0.35, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="font-bold text-text-primary">{label}: </span>
      {value}
    </motion.dd>
  );
}

export function ImpactSection({ heading, cards }: { heading: string; cards: ImpactCard[] }) {
  const t = useTranslation();
  return (
    <div className="flex h-full flex-1 flex-col">
      <SectionHeading heading={heading} />
      <div className="mt-title-to-content flex flex-1 flex-col justify-center">
      <ul className="grid gap-4 sm:grid-cols-2">
        {cards.map((card, i) => {
          // The internal Problem/arrow/Solution/arrow/Impact sequence starts
          // right as this card's own fade-in finishes.
          const sequenceBase = i * CARD_STAGGER + CARD_DURATION;
          return (
            <motion.li
              key={card.title}
              className="rounded-card border border-border border-t-[var(--color-border-top-highlight)] bg-surface p-5 shadow-card backdrop-blur-card transition-colors hover:border-accent/30 hover:bg-surface-hover"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-40px" }}
              transition={{ duration: CARD_DURATION, delay: i * CARD_STAGGER, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -3 }}
            >
              <div className="flex flex-col items-center gap-2 text-center">
                <ImpactIcon />
                <p className="font-medium text-text-primary">{card.title}</p>
              </div>
              <dl className="mt-3 flex flex-col items-center text-center text-body">
                <Row label={t.caseStudy.problem} value={card.problem} delay={sequenceBase} />
                <ArrowDown delay={sequenceBase + SEQUENCE_STEP} />
                <Row label={t.caseStudy.solution} value={card.solution} delay={sequenceBase + SEQUENCE_STEP * 2} />
                <ArrowDown delay={sequenceBase + SEQUENCE_STEP * 3} />
                <Row label={t.caseStudy.impact} value={card.impact} delay={sequenceBase + SEQUENCE_STEP * 4} />
              </dl>
            </motion.li>
          );
        })}
      </ul>
      </div>
    </div>
  );
}
