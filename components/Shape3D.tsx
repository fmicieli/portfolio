"use client";

import { motion, useMotionTemplate, type MotionValue } from "framer-motion";

/**
 * Rotating 3D diamond — a stack of offset, shaded copies (for a beveled
 * look) plus a moving shine band, driven by scroll-linked scale/rotate
 * motion values. This is the exact shape used in the reference (a rotated
 * square), standing in for whatever brand mark replaces it later.
 */
export function Shape3D({
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
  const darkest = { r: 20, g: 8, b: 17 };
  const lightest = { r: 138, g: 47, b: 82 };

  const shineBackground = useMotionTemplate`linear-gradient(105deg, #8a2f52 0%, #8a2f52 calc(${shine}% - 16%), #f0d6e2 calc(${shine}%), #8a2f52 calc(${shine}% + 16%), #8a2f52 100%)`;

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
          rotateZ: 45,
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
            <div
              key={i}
              className="absolute"
              style={{
                width: "clamp(220px, 32vw, 480px)",
                height: "clamp(220px, 32vw, 480px)",
                background: `rgb(${r}, ${g}, ${b})`,
                transform: `translate(${i * 1.2}px, ${i * 1.2}px)`,
              }}
            />
          );
        })}
        <motion.div
          style={{
            width: "clamp(220px, 32vw, 480px)",
            height: "clamp(220px, 32vw, 480px)",
            backgroundImage: shineBackground,
          }}
        />
      </motion.div>
    </div>
  );
}
