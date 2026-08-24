"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Language = "en" | "es";

const STORAGE_KEY = "language";

type LanguageContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Always "en" on first paint (server and client must match exactly to
  // avoid a hydration mismatch) — the stored preference, if any, is only
  // read after mount, so a returning Spanish-preferring visitor sees a
  // brief flash of English before it flips. Deliberately not solved with
  // e.g. a blocking inline script; the flash is an accepted tradeoff for
  // keeping this a plain client-side context.
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    // Named + also wired up as a "storage" listener (not just called once)
    // so a language change in another tab syncs here too — same shape as
    // Hero.tsx's own mount-effect pattern (a named function invoked
    // directly on mount, and reused as the event listener for updates).
    function syncFromStorage() {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "en" || stored === "es") {
        setLanguageState(stored);
      }
    }
    syncFromStorage();
    window.addEventListener("storage", syncFromStorage);
    return () => window.removeEventListener("storage", syncFromStorage);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  function setLanguage(lang: Language) {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
