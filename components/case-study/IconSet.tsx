"use client";

// Generic UI icon glyphs matching the ones documented in the Figma
// iconography spec (chevron, message, user, share, notifications,
// community, close, google, filter, search, discover/waveform, send,
// settings, heart) — hand-drawn as simple stroke icons in the site's
// existing style (see ProblemSection/ImpactSection) rather than
// re-vectorizing Figma's exact paths, since these are generic UI glyphs,
// not brand-specific art.
const ICONS: { key: string; path: React.ReactNode }[] = [
  {
    key: "chevron-left",
    path: <path d="M15 5 L9 12 L15 19" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    key: "message",
    path: (
      <>
        <path d="M4 5.5 h16 v11 H9 l-4 3.5 v-3.5 H4 Z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
        <path d="M8 10 h8 M8 13.5 h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </>
    ),
  },
  {
    key: "user",
    path: (
      <>
        <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M5 20c0-3.6 3.1-6.2 7-6.2s7 2.6 7 6.2" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </>
    ),
  },
  {
    key: "share",
    path: (
      <>
        <circle cx="6" cy="12" r="2.2" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <circle cx="18" cy="6" r="2.2" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <circle cx="18" cy="18" r="2.2" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M8 10.8 L16 7.2 M8 13.2 L16 16.8" stroke="currentColor" strokeWidth="1.5" />
      </>
    ),
  },
  {
    key: "notifications",
    path: (
      <>
        <path d="M6 10.5c0-3.3 2.7-6 6-6s6 2.7 6 6v4l1.5 2.5h-15L6 14.5Z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
        <path d="M10 19.5a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </>
    ),
  },
  {
    key: "community",
    path: (
      <>
        <circle cx="8.5" cy="9" r="2.6" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <circle cx="16" cy="9.5" r="2.1" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M3.5 19c0-3 2.3-5.2 5-5.2s5 2.2 5 5.2" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M13.6 14.2c2.3.3 4 2.2 4 4.8" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </>
    ),
  },
  {
    key: "close",
    path: <path d="M6 6 L18 18 M18 6 L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />,
  },
  {
    key: "google",
    path: (
      <path
        d="M21 12.2c0-.7-.06-1.4-.18-2H12v3.8h5.1a4.4 4.4 0 0 1-1.9 2.9v2.4h3.1c1.8-1.7 2.8-4.1 2.8-7.1Z M12 21c2.6 0 4.8-.85 6.3-2.3l-3.1-2.4c-.86.6-2 .95-3.2.95-2.45 0-4.53-1.65-5.27-3.87H3.5v2.43A9 9 0 0 0 12 21Z M6.73 13.38A5.4 5.4 0 0 1 6.45 12c0-.48.1-.95.28-1.38V8.19H3.5A9 9 0 0 0 3 12c0 1.45.35 2.83.95 4.16 0 0 3.6-2.78 2.78-2.78Z M12 6.75c1.4 0 2.66.48 3.65 1.42l2.74-2.74C16.8 3.85 14.6 3 12 3a9 9 0 0 0-8.5 5.19l3.23 2.43C7.47 8.4 9.55 6.75 12 6.75Z"
        fill="currentColor"
        stroke="none"
      />
    ),
  },
  {
    key: "filter",
    path: <path d="M4 6 h16 M7 12 h10 M10 18 h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />,
  },
  {
    key: "search",
    path: (
      <>
        <circle cx="10.5" cy="10.5" r="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M15.2 15.2 L20 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </>
    ),
  },
  {
    key: "discover",
    path: (
      <>
        <rect x="3.5" y="10" width="2" height="4" rx="1" fill="currentColor" />
        <rect x="7.5" y="6.5" width="2" height="11" rx="1" fill="currentColor" />
        <rect x="11.5" y="4" width="2" height="16" rx="1" fill="currentColor" />
        <rect x="15.5" y="6.5" width="2" height="11" rx="1" fill="currentColor" />
        <rect x="19" y="10" width="2" height="4" rx="1" fill="currentColor" />
      </>
    ),
  },
  {
    key: "send",
    path: <path d="M4 12 L20 4 L14 20 L11 13 L4 12Z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" />,
  },
  {
    key: "settings",
    path: (
      <>
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path
          d="M12 3.5 v2.2 M12 18.3 v2.2 M20.5 12 h-2.2 M5.7 12 h-2.2 M17.8 6.2 l-1.5 1.5 M7.7 16.3 l-1.5 1.5 M17.8 17.8 l-1.5-1.5 M7.7 7.7 l-1.5-1.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    key: "heart",
    path: (
      <path
        d="M12 20 C7 16.5 3.5 13.4 3.5 9.7 3.5 7 5.6 5 8.2 5c1.5 0 2.9.75 3.8 2 0.9-1.25 2.3-2 3.8-2 2.6 0 4.7 2 4.7 4.7 0 3.7-3.5 6.8-8.5 10.3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinejoin="round"
      />
    ),
  },
];

export function IconSet() {
  return (
    <ul className="grid grid-cols-5 gap-3 sm:grid-cols-7">
      {ICONS.map((icon) => (
        <li
          key={icon.key}
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-surface text-accent"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
            {icon.path}
          </svg>
        </li>
      ))}
    </ul>
  );
}
