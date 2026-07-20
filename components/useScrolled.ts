"use client";

import { useSyncExternalStore } from "react";

/**
 * True once the page has scrolled past the #hero section entirely (i.e. its
 * pinned zoom-through sequence has finished) — not just past a small pixel
 * threshold. The header's background stays hidden for the full hero,
 * including its "TODO: título sección" reveal, and only appears once real
 * content sections are underway.
 */
function subscribe(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  window.addEventListener("resize", callback, { passive: true });
  return () => {
    window.removeEventListener("scroll", callback);
    window.removeEventListener("resize", callback);
  };
}

function getSnapshot() {
  const heroEl = document.getElementById("hero");
  if (!heroEl) return false;
  return heroEl.getBoundingClientRect().bottom <= 0;
}

function getServerSnapshot() {
  return false;
}

export function useScrolled() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
