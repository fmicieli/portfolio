"use client";

import { useState } from "react";
import { useScrolled } from "@/components/useScrolled";

const NAV_LINKS = [
  { href: "/#proyectos", label: "Proyectos" },
  { href: "/#sobre-mi", label: "Sobre mí" },
  { href: "/#contacto", label: "Contacto" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled();

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <div className="relative mx-auto max-w-5xl">
        <div
          aria-hidden="true"
          className={`glass absolute inset-0 ${scrolled ? "" : "glass-off"}`}
        />
        <div className="relative flex items-center justify-center px-4 py-3 sm:px-6">
          <nav className="hidden items-center gap-8 sm:flex" aria-label="Navegación principal">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-fg-secondary transition-colors hover:text-fg"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="absolute right-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-fg sm:hidden"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              {open ? (
                <path
                  d="M4 4L16 16M16 4L4 16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M3 6H17M3 10H17M3 14H17"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <>
          <button
            type="button"
            aria-label="Cerrar menú"
            tabIndex={-1}
            className="fixed inset-0 -z-10 bg-bg/70 sm:hidden"
            onClick={() => setOpen(false)}
          />
          <nav
            className="relative mx-auto mt-2 flex max-w-5xl flex-col gap-1 rounded-xl border border-white/10 bg-[rgba(21,10,19,0.97)] p-2 shadow-xl backdrop-blur-md sm:hidden"
            aria-label="Navegación móvil"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm text-fg-secondary transition-colors hover:bg-white/5 hover:text-fg"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </>
      )}
    </header>
  );
}
