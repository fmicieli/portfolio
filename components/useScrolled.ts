"use client";

import { useSyncExternalStore } from "react";

/**
 * True the instant the fixed header actually starts covering content: once
 * #hero's bottom edge (and everything pinned inside it, including the "TODO:
 * título sección" reveal) has scrolled up to meet the header's own bottom
 * edge. Before that, the hero fills the full viewport behind the header and
 * nothing is really "underneath" it yet, so the background stays off.
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
  const headerEl = document.querySelector("header");
  if (!heroEl || !headerEl) return false;
  return heroEl.getBoundingClientRect().bottom <= headerEl.offsetHeight;
}

function getServerSnapshot() {
  return false;
}

export function useScrolled() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
