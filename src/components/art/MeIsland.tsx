import SkyGradient from "./SkyGradient";

export default function MeIsland({
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
      <SkyGradient id="me-sky" />
      <defs>
        <radialGradient id="me-cloud" cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#E8D9F3" />
          <stop offset="60%" stopColor="#C8B6E2" />
          <stop offset="100%" stopColor="#9A82C2" />
        </radialGradient>
        <radialGradient id="me-sun" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF1BF" />
          <stop offset="60%" stopColor="#F5D76E" />
          <stop offset="100%" stopColor="#E0B848" />
        </radialGradient>
        <linearGradient id="me-statue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFE89A" />
          <stop offset="100%" stopColor="#E8B450" />
        </linearGradient>
        <filter id="me-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {withSky && <rect width="400" height="400" fill="url(#me-sky)" />}

      {/* sun */}
      <circle cx="320" cy="90" r="38" fill="url(#me-sun)" opacity="0.9" />
      <g stroke="#F5D76E" strokeWidth="2" opacity="0.5" strokeLinecap="round">
        <line x1="320" y1="35" x2="320" y2="48" />
        <line x1="320" y1="132" x2="320" y2="145" />
        <line x1="265" y1="90" x2="278" y2="90" />
        <line x1="362" y1="90" x2="375" y2="90" />
      </g>

      {/* clouds */}
      <ellipse cx="80" cy="100" rx="48" ry="14" fill="#fff" opacity="0.55" />
      <ellipse cx="200" cy="70" rx="40" ry="11" fill="#fff" opacity="0.4" />

      {/* lavender island base */}
      <ellipse cx="200" cy="295" rx="170" ry="62" fill="url(#me-cloud)" />
      <ellipse cx="135" cy="275" rx="55" ry="32" fill="#E8D9F3" opacity="0.85" />
      <ellipse cx="270" cy="278" rx="62" ry="30" fill="#E8D9F3" opacity="0.75" />
      <ellipse cx="200" cy="258" rx="80" ry="32" fill="#F0E3F8" opacity="0.6" />

      {/* yoga mat */}
      <ellipse cx="120" cy="290" rx="22" ry="6" fill="#9A82C2" opacity="0.6" />
      {/* disco ball / DJ deck */}
      <g transform="translate(290 260)">
        <circle r="12" fill="#E8D9F3" />
        <circle r="12" fill="#fff" opacity="0.3" />
        <line x1="-12" y1="0" x2="12" y2="0" stroke="#9A82C2" strokeWidth="0.5" />
        <line x1="0" y1="-12" x2="0" y2="12" stroke="#9A82C2" strokeWidth="0.5" />
      </g>

      {/* character statue in butter yellow */}
      <g filter="url(#me-glow)">
        {/* pedestal */}
        <rect x="180" y="240" width="40" height="14" rx="2" fill="#B8985C" />
        {/* body */}
        <path
          d="M 180 240 Q 178 210 188 198 L 212 198 Q 222 210 220 240 Z"
          fill="url(#me-statue)"
        />
        {/* head */}
        <circle cx="200" cy="178" r="22" fill="url(#me-statue)" />
        {/* hair bun */}
        <ellipse cx="200" cy="160" rx="12" ry="9" fill="#3D2817" />
        <path
          d="M 178 178 Q 178 168 184 162 L 216 162 Q 222 168 222 178"
          fill="#3D2817"
        />
        {/* sunglasses / smile */}
        <ellipse cx="194" cy="178" rx="3" ry="2" fill="#2A1F3D" />
        <ellipse cx="206" cy="178" rx="3" ry="2" fill="#2A1F3D" />
        <path d="M 195 188 Q 200 192 205 188" stroke="#2A1F3D" strokeWidth="1.5" fill="none" />
      </g>

      {/* sparkles */}
      <g fill="#FFF1BF" opacity="0.8">
        <circle cx="140" cy="190" r="2" />
        <circle cx="260" cy="200" r="2" />
        <circle cx="155" cy="155" r="1.5" />
        <circle cx="245" cy="160" r="1.5" />
      </g>
    </svg>
  );
}
