"use client";

import { motion } from "framer-motion";
import type { UiKitGroup } from "@/data/projects";
import { SectionHeading } from "@/components/case-study/SectionHeading";

/**
 * Real pixel dimensions of every UI Kit screenshot (measured from the
 * source PNGs), plus an optional per-image scale multiplier layered on top
 * of one shared BASE_SCALE. Rendering each image from its own intrinsic
 * size — instead of forcing every image to `w-full` inside a flex-wrap
 * slot — means a small icon button and a full-width top bar keep their
 * real relative scale instead of both being stretched to whatever width
 * their row's flexbox happens to hand them.
 *
 * Multipliers (relative to the shared BASE_SCALE):
 * - Text Fields: 0.7 (-30%, explicit request)
 * - Cards 1 & 2: 0.85 (-15%, explicit request)
 * - Buttons — Secondary/Error read as the "bordered" outline styles (a
 *   visible stroke, no fill) as opposed to Primary (solid fill) and Text
 *   Link (no border/background at all), so they're sized up slightly.
 *   Ghost also has a thin outline in the screenshot, but per explicit
 *   instruction it's grouped with Icon buttons to render smaller instead.
 * - Chat Bubbles: 0.75 (visibly smaller; no target % given)
 */
const BASE_SCALE = 0.32;

const IMAGE_SPEC: Record<string, { width: number; height: number; scale?: number }> = {
  "uikit-btn-primary.png": { width: 512, height: 371 },
  "uikit-btn-secondary.png": { width: 512, height: 371, scale: 1.15 },
  "uikit-btn-ghost.png": { width: 512, height: 371, scale: 0.8 },
  "uikit-btn-error.png": { width: 512, height: 371, scale: 1.15 },
  "uikit-btn-textlink.png": { width: 504, height: 666 },
  "uikit-btn-icon.png": { width: 234, height: 424, scale: 0.8 },
  "uikit-cards-1.png": { width: 209, height: 707, scale: 0.85 },
  "uikit-cards-2.png": { width: 517, height: 359, scale: 0.85 },
  "uikit-chatbubbles.png": { width: 585, height: 435, scale: 0.75 },
  "uikit-listitem.png": { width: 666, height: 538 },
  "uikit-navbar.png": { width: 814, height: 740 },
  "uikit-tabbar.png": { width: 893, height: 328 },
  "uikit-textfields.png": { width: 293, height: 508, scale: 0.7 },
  "uikit-topbar.png": { width: 1062, height: 698 },
};

export function UiKitSection({
  heading,
  subheading,
  intro,
  groups,
}: {
  heading: string;
  subheading: string;
  intro: string;
  groups: UiKitGroup[];
}) {
  return (
    <div className="flex h-full flex-1 flex-col">
      <SectionHeading heading={heading} subheading={subheading} />
      <div className="mt-title-to-content flex flex-1 flex-col justify-center gap-8">
        <p className="text-body leading-relaxed text-text-secondary">{intro}</p>

        <div className="grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group, i) => (
            <motion.div
              key={group.title}
              className="flex flex-col gap-3 rounded-card border border-border border-t-[var(--color-border-top-highlight)] bg-surface p-4 shadow-card backdrop-blur-card"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-display text-[17px] font-bold text-text-primary">{group.title}</p>
              <div className="flex flex-wrap items-end gap-3">
                {group.images.map((image) => {
                  const filename = image.src.split("/").pop() ?? "";
                  const spec = IMAGE_SPEC[filename];
                  const width = spec ? Math.round(spec.width * BASE_SCALE * (spec.scale ?? 1)) : undefined;
                  return (
                    <div key={image.src} className="flex flex-col gap-1.5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={image.src}
                        alt={image.alt}
                        loading="lazy"
                        width={spec?.width}
                        height={spec?.height}
                        style={width ? { width: `${width}px`, height: "auto" } : { width: "160px", height: "auto" }}
                        className="max-w-full rounded-md border border-border bg-white/5"
                      />
                      <p className="text-[11px] leading-snug text-text-muted">{image.label}</p>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
