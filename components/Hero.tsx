"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Logo3D } from "@/components/Logo3D";

const TRANSITION_HEIGHT_VH = 220;

// Block wheel/touch input while the auto-complete animation is running so
// residual trackpad momentum can't fight it mid-flight (that fight is what
// read as a "pause"/stutter instead of one continuous motion). Stateless, so
// these live outside the component for a stable reference.
function blockInput(event: Event) {
  event.preventDefault();
}
function startBlockingInput() {
  window.addEventListener("wheel", blockInput, { passive: false });
  window.addEventListener("touchmove", blockInput, { passive: false });
}
function stopBlockingInput() {
  window.removeEventListener("wheel", blockInput);
  window.removeEventListener("touchmove", blockInput);
}

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

  // Shared auto-scroll machinery: used both to auto-complete the transition
  // when the user stops mid-scroll, and to drive the hero CTA (clicking it
  // does exactly what letting go mid-scroll-down does).
  const scrollRangeRef = useRef(scrollRange);
  useEffect(() => {
    scrollRangeRef.current = scrollRange;
  }, [scrollRange]);

  const rafRef = useRef<number | undefined>(undefined);
  const isAutoScrollingRef = useRef(false);

  // Manual eased scroll instead of `scrollTo({ behavior: "smooth" })`: it's
  // portable across browsers/durations and we need precise control over
  // when `isAutoScrolling` clears.
  const animateScrollTo = useCallback((target: number, duration = 380) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const start = window.scrollY;
    const distance = target - start;
    const startTime = performance.now();
    isAutoScrollingRef.current = true;
    startBlockingInput();

    function step(now: number) {
      const t = Math.min((now - startTime) / duration, 1);
      // ease-out cubic: quick to start, so it reads as a continuation of
      // the user's own scroll momentum rather than a fresh, separate move.
      const eased = 1 - Math.pow(1 - t, 3);
      window.scrollTo(0, start + distance * eased);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        isAutoScrollingRef.current = false;
        stopBlockingInput();
      }
    }
    rafRef.current = requestAnimationFrame(step);
  }, []);

  // Once the user stops scrolling mid-transition (partway through the pinned
  // zoom), auto-complete it in whichever direction they were scrolling —
  // forward (into the next section) if they were scrolling down, back to the
  // hero if they were scrolling up — instead of leaving it frozen half-zoomed.
  // Direction of the gesture decides the target, not how far it got.
  useEffect(() => {
    let debounceId: ReturnType<typeof setTimeout> | undefined;
    let lastY = window.scrollY;
    let direction: "down" | "up" = "down";

    function settle() {
      if (isAutoScrollingRef.current) return;
      const y = window.scrollY;
      if (y <= 0 || y >= scrollRangeRef.current) return;
      const target = direction === "up" ? 0 : scrollRangeRef.current;
      animateScrollTo(target);
    }

    function handleScroll() {
      if (isAutoScrollingRef.current) return;
      const y = window.scrollY;
      if (y > lastY) direction = "down";
      else if (y < lastY) direction = "up";
      lastY = y;
      clearTimeout(debounceId);
      debounceId = setTimeout(settle, 60);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(debounceId);
      stopBlockingInput();
    };
  }, [animateScrollTo]);

  function handleCtaClick() {
    animateScrollTo(scrollRange);
  }

  // Cursor-follow glow: the radial gradient's center tracks the pointer, with
  // a spring so it trails smoothly instead of snapping.
  const rawX = useMotionValue(75);
  const rawY = useMotionValue(30);
  const glowX = useSpring(rawX, { stiffness: 60, damping: 20 });
  const glowY = useSpring(rawY, { stiffness: 60, damping: 20 });
  const glowBackground = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, rgba(138,47,82,0.35), transparent 55%)`;

  // Cursor-driven tilt for the 3D logo: whichever side the pointer is nearer
  // to dips back slightly (like pressing down on that edge), on top of the
  // scroll-driven rotation — a subtle "it's a real object" cue.
  const logoTiltY = useTransform(glowX, [0, 100], [-8, 8]);
  const logoTiltX = useTransform(glowY, [0, 100], [8, -8]);

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

        <Logo3D
          scale={shapeScale}
          opacity={shapeOpacity}
          rotateX={shapeRotateX}
          rotateY={shapeRotateY}
          shine={shapeShine}
          tiltX={logoTiltX}
          tiltY={logoTiltY}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <motion.div
            style={{ opacity: heroOpacity, y: heroY, willChange: "opacity, transform" }}
            className="relative max-w-2xl"
          >
            <p className="mb-4 text-sm uppercase tracking-[0.2em] text-fg-secondary">
              UX / UI - Product Designer
            </p>
            <h1 className="font-display text-4xl font-semibold leading-tight sm:text-6xl">
              Florencia Micieli
            </h1>
            <button
              type="button"
              onClick={handleCtaClick}
              className="mt-10 inline-flex items-center rounded-full bg-fg px-8 py-3 text-sm font-medium text-bg transition hover:scale-[1.03] hover:bg-accent-light"
            >
              View more
            </button>
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
