import { cn } from "@/lib/utils";

type Kind = "hero" | "card" | "square";

/**
 * On-brand placeholder artwork: a seeded architectural night-skyline rendered as
 * pure SVG in the brand palette. Deterministic per `seed` so each project looks
 * distinct. Swap for real photography by replacing usages with <Image …/>.
 */
function makeRng(seed: number) {
  let a = (seed + 11) * 9301 + 49297;
  return () => {
    a = (a * 9301 + 49297) % 233280;
    return a / 233280;
  };
}

export function BrandImage({
  seed = 1,
  kind = "card",
  className,
}: {
  seed?: number;
  kind?: Kind;
  className?: string;
}) {
  const r = makeRng(seed);
  const uid = `bi-${kind}-${seed}`;
  const tones = ["#063a55", "#04314a", "#0a6394"];

  // Build a skyline across the 1200-wide canvas.
  const buildings: { x: number; w: number; y: number; tone: string }[] = [];
  let x = -30;
  while (x < 1230) {
    const w = 64 + Math.floor(r() * 116);
    const y = 250 + Math.floor(r() * 280);
    buildings.push({ x, w, y, tone: tones[Math.floor(r() * tones.length)] });
    x += w + (6 + Math.floor(r() * 20));
  }

  // A few amber-lit accent windows for warmth.
  const litWindows = Array.from({ length: 7 }).map(() => {
    const b = buildings[Math.floor(r() * buildings.length)];
    return {
      x: b.x + 12 + r() * Math.max(8, b.w - 30),
      y: b.y + 24 + r() * 220,
    };
  });

  const showCrane = r() > 0.35;
  const craneX = 180 + Math.floor(r() * 760);
  const craneTop = 140 + Math.floor(r() * 90);

  return (
    <svg
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      className={cn("h-full w-full block", className)}
      role="img"
      aria-label="Architectural skyline illustration (placeholder)"
    >
      <defs>
        <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#042334" />
          <stop offset="55%" stopColor="#053e5c" />
          <stop offset="100%" stopColor="#0a6394" />
        </linearGradient>
        <radialGradient id={`${uid}-glow`} cx="50%" cy="92%" r="60%">
          <stop offset="0%" stopColor="#ee9c45" stopOpacity="0.34" />
          <stop offset="55%" stopColor="#ee9c45" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#ee9c45" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${uid}-vig`} cx="50%" cy="42%" r="75%">
          <stop offset="60%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#021a27" stopOpacity="0.55" />
        </radialGradient>
        <pattern
          id={`${uid}-grid`}
          width="48"
          height="48"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M48 0H0V48"
            fill="none"
            stroke="#b8bbba"
            strokeOpacity="0.07"
            strokeWidth="1"
          />
        </pattern>
        <pattern
          id={`${uid}-win`}
          width="26"
          height="34"
          patternUnits="userSpaceOnUse"
        >
          <rect x="7" y="9" width="9" height="13" fill="#cfd3d2" opacity="0.16" />
        </pattern>
      </defs>

      {/* Sky + grid + horizon glow */}
      <rect width="1200" height="800" fill={`url(#${uid}-sky)`} />
      <rect width="1200" height="800" fill={`url(#${uid}-grid)`} />
      <ellipse cx="600" cy="780" rx="640" ry="240" fill={`url(#${uid}-glow)`} />

      {/* Crane (construction motif) */}
      {showCrane && (
        <g stroke="#9fb4c0" strokeOpacity="0.5" strokeWidth="2.5" fill="none">
          <line x1={craneX} y1={craneTop} x2={craneX} y2="560" />
          <line x1={craneX - 150} y1={craneTop + 22} x2={craneX + 210} y2={craneTop + 22} />
          <line x1={craneX} y1={craneTop} x2={craneX - 150} y2={craneTop + 22} />
          <line x1={craneX} y1={craneTop} x2={craneX + 210} y2={craneTop + 22} />
          <line x1={craneX + 150} y1={craneTop + 22} x2={craneX + 150} y2={craneTop + 70} />
          <rect x={craneX + 142} y={craneTop + 70} width="16" height="11" fill="#ee9c45" stroke="none" />
        </g>
      )}

      {/* Skyline */}
      {buildings.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={b.y} width={b.w} height={800 - b.y} fill={b.tone} />
          <rect
            x={b.x}
            y={b.y}
            width={b.w}
            height={800 - b.y}
            fill={`url(#${uid}-win)`}
          />
          <rect x={b.x} y={b.y} width={b.w} height="2.5" fill="#0a6394" opacity="0.5" />
        </g>
      ))}

      {/* Amber-lit windows */}
      {litWindows.map((w, i) => (
        <rect
          key={`l-${i}`}
          x={w.x}
          y={w.y}
          width="9"
          height="13"
          fill="#ee9c45"
          opacity="0.85"
        />
      ))}

      {/* Vignette */}
      <rect width="1200" height="800" fill={`url(#${uid}-vig)`} />
    </svg>
  );
}
