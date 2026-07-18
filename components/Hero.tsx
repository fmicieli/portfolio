"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Monogram } from "@/components/Monogram";

const TRANSITION_HEIGHT_VH = 220;

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Manually measure how many pixels of scroll the pinned transition spans
  // (container height minus one viewport) and drive progress from plain
  // window scrollY against that range. This is more robust than Framer's
  // target+offset intersection measurement, which can end up stale if the
  // section's height shifts after web fonts finish loading.
  const [scrollRange, setScrollRange] = useState(1);
  useEffect(() => {
    function measure() {
      if (!containerRef.current) return;
      setScrollRange(Math.max(containerRef.current.offsetHeight - window.innerHeight, 1));
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollY } = useScroll();
  const scrollYProgress = useTransform(scrollY, [0, scrollRange], [0, 1]);

  // Cursor-follow glow: the radial gradient's center tracks the pointer, with
  // a spring so it trails smoothly instead of snapping.
  const rawX = useMotionValue(75);
  const rawY = useMotionValue(30);
  const glowX = useSpring(rawX, { stiffness: 60, damping: 20 });
  const glowY = useSpring(rawY, { stiffness: 60, damping: 20 });
  const glowBackground = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, rgba(91,95,239,0.35), transparent 55%)`;

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    rawX.set(((event.clientX - rect.left) / rect.width) * 100);
    rawY.set(((event.clientY - rect.top) / rect.height) * 100);
  }

  // The F swells toward the viewer (a "zoom through the logo" pass), getting
  // bolder as it grows, then fading once it's "passed" — tumbling in 3D with
  // a light sweeping across its face along the way, like a rotating glossy
  // object rather than a flat sticker. The zoom expands from the gap between
  // the F's two horizontal strokes (not the glyph's geometric center), so
  // the camera reads as passing *through* that gap.
  const monogramScale = useTransform(scrollYProgress, [0, 0.7], [1, 18]);
  const monogramOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.45, 0.7],
    [0.14, 0.9, 0.9, 0]
  );
  const monogramRotateY = useTransform(scrollYProgress, [0, 0.35, 0.7], [0, -22, 34]);
  const monogramRotateX = useTransform(scrollYProgress, [0, 0.35, 0.7], [0, 12, -18]);
  const monogramShine = useTransform(scrollYProgress, [0.05, 0.55], [-20, 120]);

  // The role title fades out early as the F starts its pass...
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, -60]);

  // ...then, once the F has substantially passed through and faded, "Sobre
  // mí" and the intro paragraph fade in together in its place.
  const introOpacity = useTransform(scrollYProgress, [0.55, 0.9], [0, 1]);
  const introY = useTransform(scrollYProgress, [0.55, 0.9], [40, 0]);
  const introScale = useTransform(scrollYProgress, [0.55, 0.9], [0.85, 1]);

  return (
    <section ref={containerRef} className="relative" style={{ height: `${TRANSITION_HEIGHT_VH}vh` }}>
      <div
        className="sticky top-0 h-screen overflow-hidden px-6"
        onMouseMove={handleMouseMove}
      >
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: glowBackground }}
        />

        <Monogram
          scale={monogramScale}
          opacity={monogramOpacity}
          rotateX={monogramRotateX}
          rotateY={monogramRotateY}
          shine={monogramShine}
        />

        <div className="absolute inset-0 flex items-center px-6">
          <motion.div
            style={{ opacity: heroOpacity, y: heroY, willChange: "opacity, transform" }}
            className="relative mx-auto max-w-3xl"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-x-10 -inset-y-8 -z-10 rounded-[2rem]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(184,184,190,0.14) 0%, rgba(184,184,190,0.05) 60%, transparent 100%)",
              }}
            />
            <h1 className="font-display text-4xl font-semibold leading-tight sm:text-5xl">
              <span className="text-fg">UX/UI Designer</span>{" "}
              <span className="text-accent-light">· Product Design</span>
            </h1>
          </motion.div>
        </div>

        <div className="absolute inset-0 flex items-center px-6">
          <motion.div
            style={{
              opacity: introOpacity,
              y: introY,
              scale: introScale,
              willChange: "opacity, transform",
            }}
            className="relative mx-auto max-w-3xl"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-x-10 -inset-y-8 -z-10 rounded-[2rem]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(184,184,190,0.14) 0%, rgba(184,184,190,0.05) 60%, transparent 100%)",
              }}
            />
            <h2 className="font-display text-3xl font-semibold text-fg sm:text-4xl">
              Sobre mí
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-fg-secondary sm:text-lg">
              3+ años diseñando productos B2B y SaaS. Sistemas de diseño, prototipos de
              alta fidelidad y un flujo potenciado por IA generativa para explorar,
              documentar y construir interfaces de forma autónoma.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
