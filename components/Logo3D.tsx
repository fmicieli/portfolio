"use client";

import { motion, useMotionTemplate, useTransform, type MotionValue } from "framer-motion";

// The brand mark's silhouette (an angular "F" built from sheared blade
// shapes), split into its three facets so each can carry its own static
// shading — like distinct faces of a faceted object catching light from
// different angles — on top of the shared beveled-edge extrusion.
const MASK_ALL =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpolygon points='12,8 90,8 78,26 24,26'/%3E%3Cpolygon points='22,32 42,32 24,88 8,88'/%3E%3Cpolygon points='50,32 70,32 56,54 40,54'/%3E%3C/svg%3E\")";
const MASK_TOP =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpolygon points='12,8 90,8 78,26 24,26'/%3E%3C/svg%3E\")";
const MASK_LEG_LONG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpolygon points='22,32 42,32 24,88 8,88'/%3E%3C/svg%3E\")";
const MASK_LEG_SHORT =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpolygon points='50,32 70,32 56,54 40,54'/%3E%3C/svg%3E\")";

function maskFor(mask: string) {
  return {
    WebkitMaskImage: mask,
    maskImage: mask,
    WebkitMaskSize: "contain",
    maskSize: "contain",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
  } as const;
}

const SIZE = "clamp(264px, 38.4vw, 576px)";

// Fewer, chunkier steps at a near-uniform dark tone (rather than many
// hair's-width layers fading smoothly) so the offset reads as a flat side
// wall with a crisp corner, not a soft blurred double-exposure.
const SIDE_STEPS = 10;
const SIDE_STEP_OFFSET = 1.15; // px per step -> ~10px total depth
const SIDE_DARK = { r: 26, g: 10, b: 21 };
const SIDE_LIGHT = { r: 62, g: 22, b: 40 };

/**
 * Rotating 3D brand mark: a stepped side-wall extrusion for a real
 * corners-and-edges block look, three per-facet static metallic gradients
 * on the front face, a dynamic highlight sweeping across the whole
 * silhouette as it turns, a cast drop-shadow, and a cursor-driven tilt
 * (`tiltX`/`tiltY`) layered on top of the scroll-driven rotation.
 */
export function Logo3D({
  scale,
  opacity,
  rotateX,
  rotateY,
  shine,
  tiltX,
  tiltY,
}: {
  scale: MotionValue<number>;
  opacity: MotionValue<number>;
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  shine: MotionValue<number>;
  tiltX: MotionValue<number>;
  tiltY: MotionValue<number>;
}) {
  const sideLayers = Array.from({ length: SIDE_STEPS }, (_, i) => i);

  const shineBackground = useMotionTemplate`linear-gradient(105deg, transparent 0%, transparent calc(${shine}% - 18%), rgba(240,214,226,0.9) calc(${shine}%), transparent calc(${shine}% + 18%), transparent 100%)`;

  const totalRotateX = useTransform(
    [rotateX, tiltX],
    ([a, b]: number[]) => a + b
  );
  const totalRotateY = useTransform(
    [rotateY, tiltY],
    ([a, b]: number[]) => a + b
  );

  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
      style={{ perspective: "1600px" }}
      aria-hidden="true"
    >
      <motion.div
        style={{
          width: SIZE,
          height: SIZE,
          scale,
          opacity,
          rotateX: totalRotateX,
          rotateY: totalRotateY,
          // Zoom/rotate from the gap between the top bar (y 8-26) and the
          // legs (y 32-88) in the 0-100 mask coordinate space — the "F"'s
          // horizontal lines — so scrolling reads as passing *through* that
          // gap instead of growing from the shape's geometric center.
          transformOrigin: "45% 29%",
          filter: "drop-shadow(6px 14px 18px rgba(0,0,0,0.55))",
          willChange: "transform, opacity",
        }}
        className="relative select-none"
      >
        {/* Side wall: a handful of solidly-dark, more widely offset steps —
            reads as a flat extruded edge with a real corner, not a blur. */}
        {sideLayers.map((i) => {
          const t = i / (sideLayers.length - 1);
          const r = Math.round(SIDE_DARK.r + (SIDE_LIGHT.r - SIDE_DARK.r) * t);
          const g = Math.round(SIDE_DARK.g + (SIDE_LIGHT.g - SIDE_DARK.g) * t);
          const b = Math.round(SIDE_DARK.b + (SIDE_LIGHT.b - SIDE_DARK.b) * t);
          return (
            <div
              key={i}
              className="absolute inset-0 m-auto"
              style={{
                width: SIZE,
                height: SIZE,
                backgroundColor: `rgb(${r}, ${g}, ${b})`,
                transform: `translate(${(i + 1) * SIDE_STEP_OFFSET}px, ${(i + 1) * SIDE_STEP_OFFSET}px)`,
                ...maskFor(MASK_ALL),
              }}
            />
          );
        })}

        {/* Per-facet static "metallic" shading — each face catches light at
            a different angle, so the mark reads as faceted, not flat. */}
        <div
          className="absolute inset-0 m-auto"
          style={{
            width: SIZE,
            height: SIZE,
            backgroundImage:
              "linear-gradient(100deg, #f3d9e6 0%, #b85d84 35%, #6b2440 100%)",
            ...maskFor(MASK_TOP),
          }}
        />
        <div
          className="absolute inset-0 m-auto"
          style={{
            width: SIZE,
            height: SIZE,
            backgroundImage:
              "linear-gradient(165deg, #a04a70 0%, #6b2440 55%, #300f1f 100%)",
            ...maskFor(MASK_LEG_LONG),
          }}
        />
        <div
          className="absolute inset-0 m-auto"
          style={{
            width: SIZE,
            height: SIZE,
            backgroundImage:
              "linear-gradient(205deg, #d290ac 0%, #8a2f52 50%, #401a2c 100%)",
            ...maskFor(MASK_LEG_SHORT),
          }}
        />

        {/* Dynamic highlight sweeping across the whole mark as it turns. */}
        <motion.div
          className="absolute inset-0 m-auto"
          style={{
            width: SIZE,
            height: SIZE,
            backgroundImage: shineBackground,
            mixBlendMode: "screen",
            ...maskFor(MASK_ALL),
          }}
        />
      </motion.div>
    </div>
  );
}
