"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import type { ProblemStat } from "@/data/projects";
import { SectionHeading } from "@/components/case-study/SectionHeading";
import { useTranslation } from "@/lib/i18n/ui";

export function ProblemSection({
  heading,
  subheading,
  quotes,
  stats,
  note,
}: {
  heading: string;
  subheading: string;
  quotes: string[];
  stats: ProblemStat[];
  note: string;
}) {
  const rows = Math.max(quotes.length, stats.length);
  const t = useTranslation();

  return (
    <div className="flex h-full flex-1 flex-col">
      <SectionHeading heading={heading} subheading={subheading} />
      {/* A single 2-column grid (not two independent lists) so each row's
          quote and stat box share the same auto-sized row height — grid
          items stretch to fill it by default, which is what keeps them
          visually aligned regardless of how much text either one has. */}
      <div className="mt-title-to-content flex flex-1 flex-col justify-center">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <p className="text-label font-semibold uppercase tracking-[0.08em] text-text-secondary">
          {t.caseStudy.feedback}
        </p>
        <p className="text-label font-semibold uppercase tracking-[0.08em] text-text-secondary">
          {t.caseStudy.findings}
        </p>
        {Array.from({ length: rows }, (_, i) => (
          <Fragment key={i}>
            {quotes[i] && (
              <motion.div
                className="flex flex-col items-center gap-3 rounded-card border border-border border-t-[var(--color-border-top-highlight)] bg-surface p-4 text-center text-body leading-relaxed text-text-secondary shadow-card backdrop-blur-card"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/10">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    className="h-7 w-7 text-text-secondary"
                  >
                    <circle cx="12" cy="8" r="4" fill="currentColor" />
                    <path
                      d="M4 20c0-3.5 3.5-6 8-6s8 2.5 8 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <p>&ldquo;{quotes[i]}&rdquo;</p>
              </motion.div>
            )}
            {stats[i] && (
              <motion.div
                className="flex flex-col items-center justify-center rounded-card border border-border border-t-[var(--color-border-top-highlight)] bg-surface p-4 text-center shadow-card backdrop-blur-card"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1 + 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="font-display text-stat-lg font-bold text-accent">
                  {stats[i].value}
                </p>
                <p className="mt-1 text-body text-text-secondary">{stats[i].label}</p>
              </motion.div>
            )}
          </Fragment>
        ))}
      </div>
      <motion.p
        className="mt-4 text-body text-text-secondary"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, margin: "-40px" }}
        transition={{ duration: 0.5, delay: rows * 0.1 + 0.1 }}
      >
        {note}
      </motion.p>
      </div>
    </div>
  );
}
