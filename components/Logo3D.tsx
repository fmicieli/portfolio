"use client";

import { motion, useMotionTemplate, type MotionValue } from "framer-motion";

// The brand mark's silhouette (an angular "F" built from sheared blade
// shapes), used as a CSS mask so solid/gradient fills can be clipped to its
// outline — the same trick used for text via background-clip, generalized
// to an arbitrary vector shape via mask-image.
const LOGO_MASK =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpolygon points='12,8 90,8 78,26 24,26'/%3E%3Cpolygon points='22,32 42,32 24,88 8,88'/%3E%3Cpolygon points='50,32 70,32 56,54 40,54'/%3E%3C/svg%3E\")";

const maskStyle = {
  WebkitMaskImage: LOGO_MASK,
  maskImage: LOGO_MASK,
  WebkitMaskSize: "contain",
  maskSize: "contain",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
  maskPosition: "center",
} as const;

/**
 * Rotating 3D brand mark — a stack of offset, shaded copies of the logo's
 * silhouette (for a beveled look) plus a moving shine band, driven by
 * scroll-linked scale/rotate motion values.
 */
export function Logo3D({
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
                backgroundColor: `rgb(${r}, ${g}, ${b})`,
                transform: `translate(${i * 0.35}px, ${i * 0.35}px)`,
                ...maskStyle,
              }}
            />
          );
        })}
        <motion.div
          style={{
            width: "clamp(220px, 32vw, 480px)",
            height: "clamp(220px, 32vw, 480px)",
            backgroundImage: shineBackground,
            ...maskStyle,
          }}
        />
      </motion.div>
    </div>
  );
}
