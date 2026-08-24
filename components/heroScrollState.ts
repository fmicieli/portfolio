// Shared, read-only-from-outside handle on Hero's pinned-zone scroll range.
//
// HomeScrollSnap (the landing page's section-to-section snap system — see
// components/HomeScrollSnap.tsx) needs to know exactly where Hero's own
// wheel-driven zone ends, so the two systems can divide ownership of scroll
// input cleanly: Hero owns every scroll position up to `range`, and
// HomeScrollSnap owns everything past it. Reading this one shared value
// (instead of each side re-deriving the sticky-position math independently)
// guarantees they always agree exactly — no risk of two copies of the same
// formula drifting apart after an edit to one but not the other.
export const heroScrollState: { range: number } = { range: 1 };

// Small tolerance both sides use around `range` so float rounding (or a
// browser snapping window.scrollTo's argument to an integer pixel) never
// leaves a scrollY value that neither system claims as its own.
export const HERO_EXIT_MARGIN = 2;
