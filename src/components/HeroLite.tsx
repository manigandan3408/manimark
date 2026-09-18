/**
 * Mobile-only stand-in for the desktop Three.js hero scene.
 *
 * Pure CSS/SVG — no WebGL context, no Three.js/@react-three bundle,
 * so this never pulls in the heavy 3D dependency chain on phones.
 * Mirrors the desktop sculpture's palette (dark metal ring + gold
 * accent + faceted core) so the brand feel carries over.
 */
export default function HeroLite() {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {/* Soft ambient glow behind the mark */}
      <div className="hero-lite-glow absolute w-[70vw] h-[70vw] max-w-[520px] max-h-[520px] rounded-full bg-accent/10 blur-3xl" />

      <svg
        viewBox="0 0 400 400"
        className="hero-lite-mark relative w-[68vw] h-[68vw] max-w-[420px] max-h-[420px]"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="heroLiteGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e0c896" />
            <stop offset="50%" stopColor="#c4a86f" />
            <stop offset="100%" stopColor="#9a7f4a" />
          </linearGradient>
        </defs>

        {/* Outer architectural ring — matches the desktop torus */}
        <circle
          cx="200"
          cy="200"
          r="150"
          fill="none"
          stroke="#1a1a24"
          strokeWidth="10"
        />

        {/* Accent ring */}
        <circle
          cx="200"
          cy="200"
          r="120"
          fill="none"
          stroke="url(#heroLiteGold)"
          strokeWidth="3"
          strokeDasharray="6 10"
          className="hero-lite-ring"
        />

        {/* Faceted inner form, simplified to a rotated square */}
        <rect
          x="150"
          y="150"
          width="100"
          height="100"
          fill="#0f0f16"
          stroke="#2a2a38"
          strokeWidth="1.5"
          transform="rotate(45 200 200)"
        />

        {/* Glowing core */}
        <circle cx="200" cy="200" r="22" fill="url(#heroLiteGold)" className="hero-lite-core" />
      </svg>
    </div>
  );
}
