"use client";

import { useSyncExternalStore } from "react";
import { useScrolled } from "@/components/useScrolled";

const STORAGE_KEY = "cookie-consent";

function subscribe(callback: () => void) {
  window.addEventListener("cookie-consent-change", callback);
  return () => window.removeEventListener("cookie-consent-change", callback);
}

function getSnapshot() {
  return localStorage.getItem(STORAGE_KEY) === null;
}

function getServerSnapshot() {
  return false;
}

function dismiss() {
  localStorage.setItem(STORAGE_KEY, "dismissed");
  window.dispatchEvent(new Event("cookie-consent-change"));
}

export function CookieBanner() {
  const consentPending = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const scrolled = useScrolled();

  if (!consentPending || !scrolled) return null;

  return (
    <div
      role="status"
      className="glass fixed inset-x-4 bottom-4 z-50 flex flex-col gap-3 p-4 text-sm sm:inset-x-auto sm:right-4 sm:max-w-sm"
    >
      <p className="text-fg-secondary">
        Este sitio usa cookies mínimas para funcionar correctamente. No se usan
        para tracking de terceros.
      </p>
      <button
        type="button"
        onClick={dismiss}
        className="self-start rounded-lg bg-accent px-4 py-1.5 text-xs font-medium text-fg transition-transform hover:scale-[1.03]"
      >
        Entendido
      </button>
    </div>
  );
}
