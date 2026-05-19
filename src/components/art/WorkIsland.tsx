import SkyGradient from "./SkyGradient";

export default function WorkIsland({
  withSky = true,
  className,
}: {
  withSky?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <SkyGradient id="work-sky" />
      <defs>
        <radialGradient id="work-cloud" cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#FFCFB8" />
          <stop offset="60%" stopColor="#F0997B" />
          <stop offset="100%" stopColor="#C46F55" />
        </radialGradient>
        <radialGradient id="work-bulb" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFF1BF" />
          <stop offset="60%" stopColor="#F5D76E" />
          <stop offset="100%" stopColor="#C9A33A" />
        </radialGradient>
        <linearGradient id="work-prism" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFE7F0" />
          <stop offset="100%" stopColor="#C8B6E2" />
        </linearGradient>
        <filter id="work-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {withSky && <rect width="400" height="400" fill="url(#work-sky)" />}

      {/* distant clouds */}
      <ellipse cx="60" cy="120" rx="45" ry="14" fill="#fff" opacity="0.5" />
      <ellipse cx="330" cy="90" rx="55" ry="16" fill="#fff" opacity="0.4" />
      <ellipse cx="200" cy="60" rx="40" ry="11" fill="#fff" opacity="0.35" />

      {/* coral cloud base */}
      <ellipse cx="200" cy="290" rx="170" ry="60" fill="url(#work-cloud)" />
      <ellipse cx="130" cy="270" rx="55" ry="32" fill="#FFCFB8" opacity="0.85" />
      <ellipse cx="270" cy="275" rx="65" ry="32" fill="#FFCFB8" opacity="0.75" />
      <ellipse cx="200" cy="255" rx="80" ry="34" fill="#FFE0D0" opacity="0.6" />

      {/* crystal prisms */}
      <g opacity="0.92">
        <polygon points="110,250 124,210 138,250 124,275" fill="url(#work-prism)" />
        <polygon points="124,210 138,250 138,260 124,275" fill="#A993D1" opacity="0.55" />
      </g>
      <g opacity="0.92">
        <polygon points="260,235 278,180 296,235 278,265" fill="url(#work-prism)" />
        <polygon points="278,180 296,235 296,250 278,265" fill="#A993D1" opacity="0.6" />
      </g>
      <g opacity="0.9">
        <polygon points="155,260 167,230 179,260 167,278" fill="url(#work-prism)" />
        <polygon points="167,230 179,260 179,268 167,278" fill="#A993D1" opacity="0.5" />
      </g>
      <g opacity="0.9">
        <polygon points="225,255 237,220 249,255 237,275" fill="url(#work-prism)" />
        <polygon points="237,220 249,255 249,265 237,275" fill="#A993D1" opacity="0.5" />
      </g>

      {/* lightbulb monument */}
      <g filter="url(#work-glow)">
        <ellipse cx="200" cy="160" rx="46" ry="52" fill="url(#work-bulb)" />
        <ellipse cx="184" cy="142" rx="14" ry="20" fill="#fff" opacity="0.6" />
        <rect x="182" y="210" width="36" height="14" rx="3" fill="#B8985C" />
        <rect x="186" y="222" width="28" height="6" rx="2" fill="#8A6F3D" />
        <rect x="190" y="228" width="20" height="6" rx="2" fill="#8A6F3D" />
        {/* filament */}
        <path
          d="M 188 175 Q 200 158 212 175 Q 200 188 188 175"
          fill="none"
          stroke="#FFB347"
          strokeWidth="2"
          opacity="0.9"
        />
      </g>

      {/* sparkle rays */}
      <g stroke="#FFF1BF" strokeWidth="1.5" opacity="0.7" strokeLinecap="round">
        <line x1="200" y1="80" x2="200" y2="100" />
        <line x1="135" y1="120" x2="148" y2="130" />
        <line x1="265" y1="120" x2="252" y2="130" />
        <line x1="118" y1="160" x2="138" y2="160" />
        <line x1="282" y1="160" x2="262" y2="160" />
      </g>
    </svg>
  );
}
