/**
 * Composites a phone frame (with a transparent cutout where its screen
 * should be) over a tall screenshot of everything that screen would show if
 * scrolled top to bottom, then slow-pans that tall image up through the
 * cutout on a loop — simulating someone scrolling the real screen, using
 * only two static exports (no video, no live embed).
 *
 * The cutout's position/size (as % of the frame image's own box) and the
 * scroll distance (as % of the content image's own height) were measured
 * directly from the exported PNGs' alpha channel and aspect ratios — see the
 * commit that introduced this file for the exact pixel measurements.
 */
export function PhoneScrollDemo({
  frameSrc,
  frameAlt,
  scrollSrc,
}: {
  frameSrc: string;
  frameAlt: string;
  scrollSrc: string;
}) {
  return (
    <div className="relative mx-auto w-64" style={{ aspectRatio: "877 / 1783" }}>
      <div
        className="absolute overflow-hidden rounded-[10%]"
        style={{ left: "5.25%", top: "13.01%", width: "89.51%", height: "73.25%" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={scrollSrc}
          alt=""
          aria-hidden="true"
          className="w-full"
          style={{ animation: "phone-scroll 16s ease-in-out infinite" }}
        />
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={frameSrc}
        alt={frameAlt}
        className="pointer-events-none absolute inset-0 h-full w-full"
      />
    </div>
  );
}
