"use client";

import { motion, useMotionTemplate, type MotionValue } from "framer-motion";

/**
 * Large "F" monogram: a layered-extrusion look (stacked offset copies
 * shading dark-to-light) so it reads as a beveled 3D object, not flat
 * background-clip text. `scale`/`opacity` let it sit quietly in the hero
 * background at rest; `rotateX`/`rotateY` give it a real tumble as it grows,
 * and `shine` sweeps a bright highlight band across its face — together
 * approximating a glossy rotating 3D object (à la obermann-webdesign.de)
 * without pulling in a WebGL dependency.
 */
export function Monogram({
  scale,
  opacity,
  rotateX,
  rotateY,
  shine,
}: {
  scale: MotionValue<number>;
  opacity: MotionValue<number>;
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  shine: MotionValue<number>;
}) {
  const depthLayers = Array.from({ length: 18 }, (_, i) => i);
  const darkest = { r: 30, g: 31, b: 68 };
  const lightest = { r: 91, g: 95, b: 239 };

  const shineBackground = useMotionTemplate`linear-gradient(105deg, #5b5fef 0%, #5b5fef calc(${shine}% - 16%), #e4e5fc calc(${shine}%), #5b5fef calc(${shine}% + 16%), #5b5fef 100%)`;

  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
      style={{ perspective: "1600px" }}
      aria-hidden="true"
    >
      <motion.div
        style={{
          scale,
          opacity,
          rotateX,
          rotateY,
          // Zoom/rotate from the gap between the F's two horizontal strokes
          // (calibrated empirically against the rendered glyph — see the
          // pixel-scan measurement in the component's history) rather than
          // the glyph's geometric center, so scrolling reads as passing
          // *through* that gap instead of just growing from the middle.
          transformOrigin: "63% 46.5%",
          willChange: "transform, opacity",
        }}
        className="relative select-none"
      >
        {depthLayers.map((i) => {
          const t = i / (depthLayers.length - 1);
          const r = Math.round(darkest.r + (lightest.r - darkest.r) * t);
          const g = Math.round(darkest.g + (lightest.g - darkest.g) * t);
          const b = Math.round(darkest.b + (lightest.b - darkest.b) * t);
          return (
            <span
              key={i}
              className="absolute inset-0 font-display font-semibold leading-none"
              style={{
                fontSize: "clamp(320px, 48vw, 760px)",
                color: `rgb(${r}, ${g}, ${b})`,
                transform: `translate(${i * 1.4}px, ${i * 1.4}px)`,
              }}
            >
              F
            </span>
          );
        })}
        <motion.span
          className="relative font-display font-semibold leading-none"
          style={{
            fontSize: "clamp(320px, 48vw, 760px)",
            backgroundImage: shineBackground,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          F
        </motion.span>
      </motion.div>
    </div>
  );
}
