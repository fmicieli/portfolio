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
import { Shape3D } from "@/components/Shape3D";

const TRANSITION_HEIGHT_VH = 220;

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Manually measure how many pixels of scroll the pinned transition spans
  // (container height minus one viewport) and drive progress from plain
  // window scrollY against that range. More robust than Framer's
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

  // The shape swells toward the viewer (a "zoom through" pass), getting
  // bolder as it grows, then fading once it's "passed" — tumbling in 3D with
  // a light sweeping across its face along the way.
  const shapeScale = useTransform(scrollYProgress, [0, 0.7], [1, 18]);
  const shapeOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.45, 0.7],
    [0.5, 0.95, 0.95, 0]
  );
  const shapeRotateY = useTransform(scrollYProgress, [0, 0.35, 0.7], [0, -22, 34]);
  const shapeRotateX = useTransform(scrollYProgress, [0, 0.35, 0.7], [0, 12, -18]);
  const shapeShine = useTransform(scrollYProgress, [0.05, 0.55], [-20, 120]);

  // Hero copy fades out early...
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, -60]);

  // ...then, once the shape has substantially passed through and faded, the
  // next section's heading + subtitle fade in together in its place.
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

        <Shape3D
          scale={shapeScale}
          opacity={shapeOpacity}
          rotateX={shapeRotateX}
          rotateY={shapeRotateY}
          shine={shapeShine}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <motion.div
            style={{ opacity: heroOpacity, y: heroY, willChange: "opacity, transform" }}
            className="relative max-w-2xl"
          >
            <p className="mb-4 text-sm uppercase tracking-[0.2em] text-fg-secondary">
              TODO: eyebrow
            </p>
            <h1 className="font-display text-4xl font-semibold leading-tight sm:text-6xl">
              TODO: Título principal
            </h1>
            <p className="mt-6 text-base leading-relaxed text-fg-secondary sm:text-lg">
              TODO: bajada del hero
            </p>
            <a
              href="#proyectos"
              className="mt-10 inline-flex items-center rounded-full bg-fg px-8 py-3 text-sm font-medium text-bg transition-transform hover:scale-[1.03]"
            >
              TODO: CTA
            </a>
          </motion.div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
          <motion.div
            style={{
              opacity: introOpacity,
              y: introY,
              scale: introScale,
              willChange: "opacity, transform",
            }}
            className="relative max-w-2xl"
          >
            <h2 className="font-display text-3xl font-semibold text-fg sm:text-4xl">
              TODO: título sección
            </h2>
            <p className="mt-4 leading-relaxed text-fg-secondary">
              TODO: bajada sección
            </p>
          </motion.div>
        </div>

        <p className="absolute bottom-8 left-6 text-xs text-fg-secondary sm:left-8">
          Scroll para explorar
        </p>
      </div>
    </section>
  );
}
