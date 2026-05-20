import WorkIsland from "./WorkIsland";
import MeIsland from "./MeIsland";
import ConnectIsland from "./ConnectIsland";

/**
 * Control room scene: deep purple interior with 3 arched windows
 * looking out onto pastel sky and floating islands. The scene is
 * the "product photography" in Apple's chassis — quiet UI sits
 * outside; the scene carries the only product shadow.
 */
export default function ControlRoom() {
  return (
    <div className="control-room" aria-hidden>
      <svg
        viewBox="0 0 1600 900"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        className="control-room-svg"
      >
        <defs>
          {/* room gradient */}
          <linearGradient id="room-wall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1A1330" />
            <stop offset="50%" stopColor="#2A1F3D" />
            <stop offset="100%" stopColor="#1A1330" />
          </linearGradient>
          <radialGradient id="dome-light" cx="50%" cy="0%" r="60%">
            <stop offset="0%" stopColor="#F5D76E" stopOpacity="0.18" />
            <stop offset="60%" stopColor="#3D2F5C" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#1A1330" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2A1F3D" />
            <stop offset="100%" stopColor="#0F0820" />
          </linearGradient>

          {/* sky gradients per window (lit slightly differently per island) */}
          <linearGradient id="sky-window-left" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C8B6E2" />
            <stop offset="55%" stopColor="#F5B6C4" />
            <stop offset="100%" stopColor="#F0997B" />
          </linearGradient>
          <linearGradient id="sky-window-center" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C8B6E2" />
            <stop offset="55%" stopColor="#E8C4F0" />
            <stop offset="100%" stopColor="#F5C4A8" />
          </linearGradient>
          <linearGradient id="sky-window-right" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C8B6E2" />
            <stop offset="55%" stopColor="#F5A0B8" />
            <stop offset="100%" stopColor="#F5D0E0" />
          </linearGradient>

          {/* arched window clip paths */}
          <clipPath id="arch-left">
            <path d="M 56 760 L 56 360 Q 56 200 248 200 Q 440 200 440 360 L 440 760 Z" />
          </clipPath>
          <clipPath id="arch-center">
            <path d="M 528 780 L 528 320 Q 528 140 800 140 Q 1072 140 1072 320 L 1072 780 Z" />
          </clipPath>
          <clipPath id="arch-right">
            <path d="M 1160 760 L 1160 360 Q 1160 200 1352 200 Q 1544 200 1544 360 L 1544 760 Z" />
          </clipPath>
        </defs>

        {/* back wall */}
        <rect width="1600" height="900" fill="url(#room-wall)" />
        <rect width="1600" height="900" fill="url(#dome-light)" />

        {/* starlit dome ceiling */}
        <g opacity="0.9">
          {Array.from({ length: 50 }).map((_, i) => {
            const x = ((i * 173) % 1600);
            const y = ((i * 47) % 130);
            const r = (i % 3) * 0.5 + 0.5;
            return <circle key={i} cx={x} cy={y} r={r} fill="#F5D76E" opacity={0.4 + (i % 5) * 0.1} />;
          })}
        </g>

        {/* ceiling arch */}
        <path
          d="M 0 130 Q 800 0 1600 130 L 1600 0 L 0 0 Z"
          fill="#1A1330"
          opacity="0.95"
        />

        {/* arched windows */}
        {/* LEFT */}
        <g clipPath="url(#arch-left)">
          <rect x="56" y="200" width="384" height="560" fill="url(#sky-window-left)" />
          <g transform="translate(56 360) scale(0.96)">
            <svg x="0" y="0" width="400" height="400" viewBox="0 0 400 400">
              <WorkIsland withSky={false} />
            </svg>
          </g>
        </g>
        <path
          d="M 56 760 L 56 360 Q 56 200 248 200 Q 440 200 440 360 L 440 760 Z"
          fill="none"
          stroke="#5C4380"
          strokeWidth="6"
        />
        {/* window mullion */}
        <line x1="248" y1="200" x2="248" y2="760" stroke="#5C4380" strokeWidth="3" />
        <line x1="56" y1="480" x2="440" y2="480" stroke="#5C4380" strokeWidth="3" />

        {/* CENTER (taller arch) */}
        <g clipPath="url(#arch-center)">
          <rect x="528" y="140" width="544" height="640" fill="url(#sky-window-center)" />
          <g transform="translate(528 360) scale(1.1)">
            <svg x="0" y="0" width="400" height="400" viewBox="0 0 400 400">
              <MeIsland withSky={false} />
            </svg>
          </g>
        </g>
        <path
          d="M 528 780 L 528 320 Q 528 140 800 140 Q 1072 140 1072 320 L 1072 780 Z"
          fill="none"
          stroke="#5C4380"
          strokeWidth="6"
        />
        <line x1="800" y1="140" x2="800" y2="780" stroke="#5C4380" strokeWidth="3" />
        <line x1="528" y1="460" x2="1072" y2="460" stroke="#5C4380" strokeWidth="3" />

        {/* RIGHT */}
        <g clipPath="url(#arch-right)">
          <rect x="1160" y="200" width="384" height="560" fill="url(#sky-window-right)" />
          <g transform="translate(1160 360) scale(0.96)">
            <svg x="0" y="0" width="400" height="400" viewBox="0 0 400 400">
              <ConnectIsland withSky={false} />
            </svg>
          </g>
        </g>
        <path
          d="M 1160 760 L 1160 360 Q 1160 200 1352 200 Q 1544 200 1544 360 L 1544 760 Z"
          fill="none"
          stroke="#5C4380"
          strokeWidth="6"
        />
        <line x1="1352" y1="200" x2="1352" y2="760" stroke="#5C4380" strokeWidth="3" />
        <line x1="1160" y1="480" x2="1544" y2="480" stroke="#5C4380" strokeWidth="3" />

        {/* floor */}
        <rect x="0" y="760" width="1600" height="140" fill="url(#floor)" />
        {/* floor reflections */}
        <rect x="56" y="760" width="384" height="140" fill="#F5C4A8" opacity="0.06" />
        <rect x="528" y="760" width="544" height="140" fill="#E8C4F0" opacity="0.06" />
        <rect x="1160" y="760" width="384" height="140" fill="#F5A0B8" opacity="0.06" />

        {/* ambient interior lamps */}
        <circle cx="475" cy="500" r="3" fill="#F5D76E" opacity="0.9" />
        <circle cx="475" cy="500" r="12" fill="#F5D76E" opacity="0.18" />
        <circle cx="1125" cy="500" r="3" fill="#F5D76E" opacity="0.9" />
        <circle cx="1125" cy="500" r="12" fill="#F5D76E" opacity="0.18" />

        {/* small control desk silhouette at bottom */}
        <path
          d="M 0 820 Q 200 800 460 810 L 460 900 L 0 900 Z"
          fill="#13091F"
          opacity="0.8"
        />
        <path
          d="M 1600 820 Q 1400 800 1140 810 L 1140 900 L 1600 900 Z"
          fill="#13091F"
          opacity="0.8"
        />
        <path
          d="M 460 810 Q 800 815 1140 810 L 1140 900 L 460 900 Z"
          fill="#0F0820"
          opacity="0.9"
        />
      </svg>

      <style jsx>{`
        .control-room {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
        .control-room-svg {
          width: 100%;
          height: 100%;
          display: block;
        }
      `}</style>
    </div>
  );
}
