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
import { AboutCards } from "@/components/AboutCards";

const TRANSITION_HEIGHT_VH = 220;

// The hero's zoom-through always takes this long, no matter how the user
// triggered it (a light wheel tick, a hard swipe, or the CTA button) — the
// transition's pace is fixed, never scrubbed by raw scroll speed.
const TRANSITION_DURATION = 1100;

// The header has no background of its own — instead the pinned hero reserves
// this much space below it (header height + a 24px gap) so its content never
// runs behind the header at any point in the scroll, not just at rest.
const HEADER_GAP = 24;

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Manually measure how many pixels of scroll the pinned transition spans
  // (container height minus the sticky viewport) and drive progress from
  // plain window scrollY against that range. More robust than Framer's
  // target+offset intersection measurement, which can end up stale if the
  // section's height shifts after web fonts finish loading.
  const [scrollRange, setScrollRange] = useState(1);
  const [headerClearance, setHeaderClearance] = useState(0);
  useEffect(() => {
    function measure() {
      if (!containerRef.current) return;
      const headerHeight = document.querySelector("header")?.offsetHeight ?? 0;
      const clearance = headerHeight + HEADER_GAP;
      setHeaderClearance(clearance);
      const stickyHeight = window.innerHeight - clearance;
      setScrollRange(Math.max(containerRef.current.offsetHeight - stickyHeight, 1));
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollY } = useScroll();
  const scrollYProgress = useTransform(scrollY, [0, scrollRange], [0, 1]);

  // Shared auto-scroll machinery: window.scrollY is only ever moved by this
  // controlled, fixed-duration animation while inside the hero's pinned
  // zone — never scrubbed directly by the user's raw scroll/touch input —
  // so the visual transition always plays at the same pace.
  const scrollRangeRef = useRef(scrollRange);
  useEffect(() => {
    scrollRangeRef.current = scrollRange;
  }, [scrollRange]);

  const rafRef = useRef<number | undefined>(undefined);
  const isAutoScrollingRef = useRef(false);

  const animateScrollTo = useCallback((target: number, duration = TRANSITION_DURATION) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const start = window.scrollY;
    const distance = target - start;
    if (distance === 0) return;
    const startTime = performance.now();
    isAutoScrollingRef.current = true;

    function step(now: number) {
      const t = Math.min((now - startTime) / duration, 1);
      // ease-in-out: gentle start and finish, constant felt speed in the
      // middle — reads as one deliberate motion regardless of trigger.
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      window.scrollTo(0, start + distance * eased);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        isAutoScrollingRef.current = false;
      }
    }
    rafRef.current = requestAnimationFrame(step);
  }, []);

  // Scrolling inside the hero's pinned zone always plays the *same*
  // fixed-duration transition, no matter how fast/slow/far the actual
  // gesture was: the very first wheel/touch tick decides a direction and
  // hands off entirely to the animation, and every further raw input is
  // swallowed until it finishes. Outside the zone (already past the hero,
  // or above the page top), input passes through untouched.
  useEffect(() => {
    function tryTrigger(direction: "down" | "up") {
      if (isAutoScrollingRef.current) return true;
      const y = window.scrollY;
      if (direction === "down" && (y < 0 || y >= scrollRangeRef.current)) return false;
      if (direction === "up" && (y <= 0 || y > scrollRangeRef.current)) return false;
      animateScrollTo(direction === "down" ? scrollRangeRef.current : 0);
      return true;
    }

    function handleWheel(event: WheelEvent) {
      if (tryTrigger(event.deltaY > 0 ? "down" : "up")) {
        event.preventDefault();
      }
    }

    let touchStartY = 0;
    function handleTouchStart(event: TouchEvent) {
      touchStartY = event.touches[0]?.clientY ?? 0;
    }
    function handleTouchMove(event: TouchEvent) {
      if (isAutoScrollingRef.current) {
        event.preventDefault();
        return;
      }
      const currentY = event.touches[0]?.clientY ?? touchStartY;
      const deltaY = touchStartY - currentY;
      if (Math.abs(deltaY) < 8) return;
      if (tryTrigger(deltaY > 0 ? "down" : "up")) {
        event.preventDefault();
      }
    }

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [animateScrollTo]);

  // Fallback for input that doesn't fire wheel/touch events — keyboard
  // paging, scrollbar dragging: if one of those leaves scrollY mid-
  // transition, complete it the same way, at the same fixed pace.
  useEffect(() => {
    let debounceId: ReturnType<typeof setTimeout> | undefined;
    let lastY = window.scrollY;
    let direction: "down" | "up" = "down";

    function settle() {
      if (isAutoScrollingRef.current) return;
      const y = window.scrollY;
      if (y <= 0 || y >= scrollRangeRef.current) return;
      animateScrollTo(direction === "up" ? 0 : scrollRangeRef.current);
    }

    function handleScroll() {
      if (isAutoScrollingRef.current) return;
      const y = window.scrollY;
      if (y > lastY) direction = "down";
      else if (y < lastY) direction = "up";
      lastY = y;
      clearTimeout(debounceId);
      debounceId = setTimeout(settle, 40);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(debounceId);
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
  // testimonials heading + cards take over the same pinned screen — cards
  // get their own 0-1 slice of this to drive their stack-to-row spread.
  const revealProgress = useTransform(scrollYProgress, [0.55, 1], [0, 1]);
  const headingOpacity = useTransform(revealProgress, [0, 0.25], [0, 1]);
  const headingY = useTransform(revealProgress, [0, 0.25], [30, 0]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative"
      style={{ height: `${TRANSITION_HEIGHT_VH}vh` }}
    >
      <div
        className="sticky overflow-hidden px-6"
        style={{ top: headerClearance, height: `calc(100vh - ${headerClearance}px)` }}
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
            className="relative max-w-3xl"
          >
            <p className="mb-4 text-sm uppercase tracking-[0.2em] text-fg-secondary">
              Florencia Micieli
            </p>
            <h1 className="whitespace-nowrap font-display text-xl font-semibold leading-tight sm:text-4xl lg:text-6xl">
              UX / UI - Product Designer
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

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-10 overflow-hidden px-6 text-center">
          <motion.div
            style={{ opacity: headingOpacity, y: headingY, willChange: "opacity, transform" }}
            className="relative max-w-2xl"
          >
            <h2 className="font-display text-3xl font-semibold text-fg sm:text-4xl">
              TODO: título sección
            </h2>
            <p className="mt-4 leading-relaxed text-fg-secondary">TODO: bajada sección</p>
          </motion.div>

          <div className="relative w-full">
            <AboutCards progress={revealProgress} />
          </div>
        </div>

        <p className="absolute bottom-8 left-6 text-xs text-fg-secondary sm:left-8">
          Scroll para explorar
        </p>
      </div>
    </section>
  );
}
