import SkyGradient from "./SkyGradient";

export default function ConnectIsland({
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
      <SkyGradient id="connect-sky" />
      <defs>
        <radialGradient id="connect-cloud" cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#FCD9E3" />
          <stop offset="60%" stopColor="#F5A0B8" />
          <stop offset="100%" stopColor="#D17089" />
        </radialGradient>
        <linearGradient id="connect-lighthouse" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFAFC" />
          <stop offset="100%" stopColor="#F5C4D2" />
        </linearGradient>
        <radialGradient id="connect-beam" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F5A0B8" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#F5A0B8" stopOpacity="0" />
        </radialGradient>
        <filter id="connect-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {withSky && <rect width="400" height="400" fill="url(#connect-sky)" />}

      {/* hot air balloon */}
      <g transform="translate(320 130)" opacity="0.85">
        <ellipse cx="0" cy="0" rx="18" ry="22" fill="#F5A0B8" />
        <path d="M -18 -2 Q 0 -6 18 -2" stroke="#fff" strokeWidth="0.8" fill="none" opacity="0.6" />
        <rect x="-6" y="24" width="12" height="8" rx="2" fill="#B8985C" />
        <line x1="-12" y1="18" x2="-5" y2="24" stroke="#3D2817" strokeWidth="0.6" />
        <line x1="12" y1="18" x2="5" y2="24" stroke="#3D2817" strokeWidth="0.6" />
      </g>

      {/* clouds */}
      <ellipse cx="80" cy="90" rx="50" ry="14" fill="#fff" opacity="0.5" />
      <ellipse cx="200" cy="55" rx="38" ry="10" fill="#fff" opacity="0.4" />

      {/* heart beams from lighthouse */}
      <g opacity="0.7">
        <circle cx="200" cy="120" r="60" fill="url(#connect-beam)" />
        <path
          d="M 80 110 C 75 100, 85 95, 92 105 C 99 95, 109 100, 104 110 L 92 124 Z"
          fill="#F5A0B8"
          opacity="0.7"
        />
        <path
          d="M 296 105 C 291 95, 301 90, 308 100 C 315 90, 325 95, 320 105 L 308 119 Z"
          fill="#F5A0B8"
          opacity="0.7"
        />
        <path
          d="M 188 50 C 183 40, 193 35, 200 45 C 207 35, 217 40, 212 50 L 200 64 Z"
          fill="#F5A0B8"
          opacity="0.6"
        />
      </g>

      {/* island base */}
      <ellipse cx="200" cy="300" rx="170" ry="60" fill="url(#connect-cloud)" />
      <ellipse cx="135" cy="280" rx="55" ry="30" fill="#FCD9E3" opacity="0.85" />
      <ellipse cx="270" cy="285" rx="60" ry="30" fill="#FCD9E3" opacity="0.75" />

      {/* tiny cafe — two chairs and a table */}
      <g transform="translate(110 280)">
        <rect x="-2" y="-10" width="4" height="12" fill="#8A6F3D" />
        <ellipse cx="0" cy="-12" rx="10" ry="3" fill="#B8985C" />
        <rect x="-12" y="-5" width="3" height="8" fill="#8A6F3D" />
        <rect x="9" y="-5" width="3" height="8" fill="#8A6F3D" />
      </g>

      {/* lighthouse monument */}
      <g filter="url(#connect-glow)">
        {/* base */}
        <rect x="186" y="218" width="28" height="14" fill="#B8985C" />
        {/* tower */}
        <path
          d="M 188 218 L 192 150 L 208 150 L 212 218 Z"
          fill="url(#connect-lighthouse)"
        />
        {/* stripes */}
        <rect x="189" y="195" width="22" height="6" fill="#F5A0B8" />
        <rect x="189" y="175" width="22" height="6" fill="#F5A0B8" />
        {/* top platform */}
        <rect x="186" y="142" width="28" height="8" fill="#D17089" />
        {/* lantern room */}
        <rect x="190" y="124" width="20" height="18" fill="#FFF1BF" />
        <rect x="190" y="124" width="20" height="18" fill="none" stroke="#D17089" strokeWidth="1.5" />
        {/* roof */}
        <polygon points="186,124 200,108 214,124" fill="#D17089" />
        <circle cx="200" cy="106" r="2.5" fill="#F5D76E" />
      </g>
    </svg>
  );
}
