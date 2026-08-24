"use client";

import { motion } from "framer-motion";
import type { LabeledImage } from "@/data/projects";
import { SectionHeading } from "@/components/case-study/SectionHeading";

export function PrototypeSection({
  heading,
  subheading,
  intro,
  bullets,
  linkLabel,
  linkHref,
  screens,
}: {
  heading: string;
  subheading: string;
  intro: string;
  bullets: string[];
  linkLabel: string;
  linkHref: string;
  screens: LabeledImage[];
}) {
  return (
    <div className="flex h-full flex-1 flex-col">
      <SectionHeading heading={heading} subheading={subheading} />
      <div className="mt-title-to-content flex flex-1 flex-col justify-center gap-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-body leading-relaxed text-text-secondary">{intro}</p>
            <ul className="mt-3 flex flex-col gap-2 text-body leading-relaxed text-text-secondary">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" aria-hidden="true" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <a
            href={linkHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 shrink-0 items-center justify-center self-start rounded-[5px] bg-accent px-5 text-[14px] font-bold text-[#121212] transition-opacity hover:opacity-90 sm:self-auto"
          >
            {linkLabel}
          </a>
        </div>

        <ul className="grid grid-cols-2 gap-4 sm:max-w-[75%] sm:grid-cols-3 lg:grid-cols-6">
          {screens.map((screen, i) => (
            <motion.li
              key={screen.label}
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={screen.src}
                alt={screen.alt}
                loading="lazy"
                className="w-full rounded-xl border border-border shadow-lg shadow-black/30"
              />
              <p className="text-center text-[13px] font-medium text-text-secondary">{screen.label}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}
