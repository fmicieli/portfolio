/**
 * Stand-in for a screenshot the user hasn't provided yet: a green box
 * (deliberately loud, not styled to blend in) with the exact spec of what
 * needs to go there, so it's unmissable in the rendered page and easy to
 * swap for the real asset later.
 */
export function ImagePlaceholder({ spec }: { spec: string }) {
  return (
    <div
      className="flex aspect-[231/471] w-full max-w-[180px] items-center justify-center rounded-xl border-2 border-dashed border-green-400 bg-green-500/20 p-3 text-center text-xs leading-relaxed text-green-100"
      role="img"
      aria-label={`Placeholder — screenshot needed: ${spec}`}
    >
      TODO screenshot: {spec}
    </div>
  );
}
