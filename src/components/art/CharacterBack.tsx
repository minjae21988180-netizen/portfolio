/**
 * Back-view chibi character per brief:
 * Asian young woman, messy bun, white cropped tank, leopard print
 * wide-leg pants, red sneakers, gold hoops. Pure SVG so the scene
 * renders crisp at any size, and the scene is the only place the
 * single product-shadow is allowed (mirrors Apple's product render).
 */
export default function CharacterBack({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 400"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
      preserveAspectRatio="xMidYMax meet"
    >
      <defs>
        <linearGradient id="char-skin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F5D6BB" />
          <stop offset="100%" stopColor="#E8B898" />
        </linearGradient>
        <linearGradient id="char-tank" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E6E6EA" />
        </linearGradient>
        <linearGradient id="char-pants" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D9B68A" />
          <stop offset="100%" stopColor="#B8945E" />
        </linearGradient>
        <pattern id="leopard" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
          <rect width="14" height="14" fill="url(#char-pants)" />
          <ellipse cx="4" cy="4" rx="2.2" ry="1.6" fill="#3D2817" opacity="0.85" />
          <ellipse cx="10" cy="10" rx="2.2" ry="1.6" fill="#3D2817" opacity="0.85" />
          <ellipse cx="4" cy="4" rx="0.8" ry="0.6" fill="#7A5230" />
          <ellipse cx="10" cy="10" rx="0.8" ry="0.6" fill="#7A5230" />
          <circle cx="12" cy="2" r="0.7" fill="#3D2817" opacity="0.6" />
        </pattern>
        <radialGradient id="char-hair" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#3D2817" />
          <stop offset="100%" stopColor="#1A0F08" />
        </radialGradient>
      </defs>

      {/* legs / leopard pants */}
      <path
        d="M 70 240 Q 64 320 70 380 L 96 380 Q 100 320 98 240 Z"
        fill="url(#leopard)"
      />
      <path
        d="M 130 240 Q 136 320 130 380 L 104 380 Q 100 320 102 240 Z"
        fill="url(#leopard)"
      />

      {/* red sneakers */}
      <ellipse cx="83" cy="384" rx="18" ry="7" fill="#D4422A" />
      <ellipse cx="117" cy="384" rx="18" ry="7" fill="#D4422A" />
      <rect x="66" y="378" width="34" height="3" rx="1.5" fill="#FFFFFF" opacity="0.8" />
      <rect x="100" y="378" width="34" height="3" rx="1.5" fill="#FFFFFF" opacity="0.8" />

      {/* arms (relaxed at sides) */}
      <path
        d="M 56 168 Q 50 218 60 252 L 70 250 Q 70 215 74 172 Z"
        fill="url(#char-skin)"
      />
      <path
        d="M 144 168 Q 150 218 140 252 L 130 250 Q 130 215 126 172 Z"
        fill="url(#char-skin)"
      />

      {/* gold rings on right wrist (back view) */}
      <ellipse cx="142" cy="246" rx="6.5" ry="2" fill="#F5D76E" />

      {/* torso: cropped white ribbed tank */}
      <path
        d="M 70 168 Q 64 200 68 240 L 132 240 Q 136 200 130 168 Q 100 158 70 168 Z"
        fill="url(#char-tank)"
      />
      {/* ribbed lines */}
      <g stroke="#D6D6DA" strokeWidth="0.8" opacity="0.7">
        <line x1="80" y1="172" x2="80" y2="238" />
        <line x1="90" y1="172" x2="90" y2="238" />
        <line x1="100" y1="172" x2="100" y2="238" />
        <line x1="110" y1="172" x2="110" y2="238" />
        <line x1="120" y1="172" x2="120" y2="238" />
      </g>

      {/* tank strap shadow */}
      <path d="M 78 170 Q 80 165 86 162" stroke="#C8C8CC" strokeWidth="1.2" fill="none" />
      <path d="M 122 170 Q 120 165 114 162" stroke="#C8C8CC" strokeWidth="1.2" fill="none" />

      {/* gold chain necklace (peeks from back of neck) */}
      <path
        d="M 88 162 Q 100 158 112 162"
        stroke="#F5D76E"
        strokeWidth="1.6"
        fill="none"
      />

      {/* neck */}
      <rect x="92" y="152" width="16" height="14" fill="url(#char-skin)" />

      {/* head — back of head, with hair */}
      <ellipse cx="100" cy="118" rx="34" ry="38" fill="url(#char-hair)" />
      {/* small visible jawline hint */}
      <path
        d="M 78 142 Q 100 156 122 142"
        stroke="#2A1810"
        strokeWidth="0.8"
        fill="none"
        opacity="0.5"
      />

      {/* messy bun */}
      <ellipse cx="100" cy="86" rx="22" ry="18" fill="url(#char-hair)" />
      <ellipse cx="100" cy="84" rx="20" ry="16" fill="#2D1B0E" opacity="0.6" />
      {/* loose strands */}
      <path
        d="M 80 88 Q 76 78 84 70"
        stroke="#1A0F08"
        strokeWidth="1.4"
        fill="none"
      />
      <path
        d="M 120 88 Q 124 78 116 70"
        stroke="#1A0F08"
        strokeWidth="1.4"
        fill="none"
      />
      <path
        d="M 100 70 Q 98 62 104 60"
        stroke="#1A0F08"
        strokeWidth="1.2"
        fill="none"
      />
      <path
        d="M 88 96 Q 80 102 78 112"
        stroke="#2A1810"
        strokeWidth="1.2"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M 112 96 Q 120 102 122 112"
        stroke="#2A1810"
        strokeWidth="1.2"
        fill="none"
        opacity="0.6"
      />

      {/* gold hoop earrings (back-view peek) */}
      <circle cx="66" cy="128" r="4" fill="none" stroke="#F5D76E" strokeWidth="1.8" />
      <circle cx="134" cy="128" r="4" fill="none" stroke="#F5D76E" strokeWidth="1.8" />
    </svg>
  );
}
