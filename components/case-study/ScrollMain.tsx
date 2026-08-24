"use client";

import { createContext, useContext, useRef, type ReactNode, type WheelEvent } from "react";
import { animate, type AnimationPlaybackControls } from "framer-motion";

/**
 * The project page's `<main>` is its own scroll container (not the window —
 * see its `overflow-y-scroll`/`h-screen` classes), so any section that needs
 * framer-motion's `useScroll({ target })` to track scroll-linked progress
 * (e.g. StepGuideSection's pinned stepper) has to point it at this element
 * instead of the default `window`. This just forwards that ref down.
 */
const ScrollContainerContext = createContext<React.RefObject<HTMLElement | null> | null>(null);

export function useScrollContainer() {
  return useContext(ScrollContainerContext);
}

// Custom-eased, not native `scroll-snap`: the browser's own snap-settle
// animation isn't customizable (fixed curve/duration per browser), and it
// read as abrupt next to the rest of the site's tuned motion. Same
// ease-in-out camera-pan curve as StepGuideSection's step transitions, for
// the same reason — this is a pan between two states, not a reveal.
const SECTION_DURATION = 0.55;
const SECTION_EASE = [0.65, 0, 0.35, 1] as const;
// Hard-lock further section jumps until this long after a jump starts —
// well past SECTION_DURATION — so one physical scroll gesture (short or
// long, fast or slow) advances at most one section, never chains through
// several. Uses setTimeout (a real timer, not requestAnimationFrame), so it
// still fires and releases the lock even if the tab is backgrounded and
// rAF gets paused mid-animation — the animation itself would stall in that
// case, but the lock can't get stuck open forever the way it did before.
const SECTION_LOCK_MS = (SECTION_DURATION + 0.3) * 1000;
// How close to a tall section's top/bottom edge (in px) counts as "already
// at the edge" for the purposes of handing off to the next/previous
// section, vs. still having native scroll room left inside it.
const EDGE_TOLERANCE = 4;

export function ScrollMain({ className, children }: { className?: string; children: ReactNode }) {
  const containerRef = useRef<HTMLElement>(null);
  const lockedRef = useRef(false);
  const lockTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animRef = useRef<AnimationPlaybackControls | null>(null);

  const getSections = () => {
    const container = containerRef.current;
    if (!container) return [];
    return Array.from(container.querySelectorAll<HTMLElement>(".snap-start"));
  };

  const jumpTo = (container: HTMLElement, target: HTMLElement) => {
    const from = container.scrollTop;
    const to = target.offsetTop;
    if (Math.abs(to - from) < 1) return;

    lockedRef.current = true;
    animRef.current?.stop();
    animRef.current = animate(from, to, {
      duration: SECTION_DURATION,
      ease: SECTION_EASE,
      onUpdate: (v) => {
        container.scrollTop = v;
      },
    });

    if (lockTimeoutRef.current) clearTimeout(lockTimeoutRef.current);
    lockTimeoutRef.current = setTimeout(() => {
      animRef.current?.stop();
      // Force-land exactly on target regardless of whether the tween above
      // actually got to play out (e.g. rAF paused by a backgrounded tab) —
      // the lock releasing is what matters, not leaving scroll stranded
      // mid-transition.
      container.scrollTop = to;
      lockedRef.current = false;
    }, SECTION_LOCK_MS);
  };

  const handleWheel = (e: WheelEvent<HTMLElement>) => {
    const container = containerRef.current;
    if (!container) return;

    // Trackpads fire many small-delta events per gesture; always swallow
    // these regardless of lock state so their momentum tail never drifts
    // native scroll between sections.
    if (Math.abs(e.deltaY) < 2) {
      e.preventDefault();
      return;
    }

    if (lockedRef.current) {
      e.preventDefault();
      return;
    }

    const sections = getSections();
    if (sections.length === 0) return;

    const scrollTop = container.scrollTop;
    let currentIndex = 0;
    for (let i = 0; i < sections.length; i++) {
      if (sections[i].offsetTop <= scrollTop + 2) currentIndex = i;
    }
    const current = sections[currentIndex];
    const viewportHeight = container.clientHeight;
    const isTall = current.offsetHeight > viewportHeight + EDGE_TOLERANCE;

    if (isTall) {
      // A section like the step-guide's tall scroll-linked block: let
      // native scroll handle its interior entirely (it drives its own
      // useScroll-based progress off real scrollTop) and only take over
      // once the user has scrolled it all the way to an edge — scrolling
      // further in that same direction from there means "leave this
      // section", which is where the normal jump logic below applies.
      const sectionBottom = current.offsetTop + current.offsetHeight;
      const remainingDown = sectionBottom - viewportHeight - scrollTop;
      const remainingUp = scrollTop - current.offsetTop;
      // Compare against this tick's own delta, not just the fixed
      // EDGE_TOLERANCE: a fixed few-px tolerance only protects against
      // tiny ticks. A single large-delta tick (a strong trackpad flick, or
      // a mouse wheel with accelerated/high-magnitude deltaY) can be
      // bigger than the remaining interior room, in which case letting
      // native scroll handle it would overshoot straight past this
      // section's edge — landing mid-way into the next section via
      // uncontrolled native scroll instead of a clean animated snap. Once
      // the remaining room is smaller than what this tick would consume,
      // take over now (from wherever native scroll last left off) instead
      // of letting it overshoot.
      if (e.deltaY > 0 && remainingDown > Math.max(EDGE_TOLERANCE, e.deltaY)) return;
      if (e.deltaY < 0 && remainingUp > Math.max(EDGE_TOLERANCE, -e.deltaY)) return;
    }

    const direction = e.deltaY > 0 ? 1 : -1;
    const targetIndex = Math.min(Math.max(currentIndex + direction, 0), sections.length - 1);
    if (targetIndex === currentIndex) {
      // Already at the last (or first) section with nowhere further to jump
      // — don't preventDefault, so scroll continues natively into the
      // Footer (or wherever comes before the first section) instead of
      // trapping the user here forever.
      return;
    }
    e.preventDefault();
    jumpTo(container, sections[targetIndex]);
  };

  return (
    <ScrollContainerContext.Provider value={containerRef}>
      <main ref={containerRef} onWheel={handleWheel} className={className}>
        {children}
      </main>
    </ScrollContainerContext.Provider>
  );
}
