"use client";

/**
 * Always-visible pulsing gold dot. Positioned on the island background
 * via percentage coordinates so it tracks the underlying art when the
 * viewport scales. Click reveals the island's popup.
 */
export default function Hotspot({
  x,
  y,
  label,
  onClick,
}: {
  /** % from left, 0-100 */
  x: number;
  /** % from top, 0-100 */
  y: number;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      className="hotspot"
      style={{ left: `${x}%`, top: `${y}%` }}
      onClick={onClick}
      aria-label={label}
    >
      <span className="hotspot-dot" />
      <span className="hotspot-pulse" />
      <span className="hotspot-pulse hotspot-pulse-2" />
      <span className="hotspot-label">{label}</span>

      <style jsx>{`
        .hotspot {
          position: absolute;
          transform: translate(-50%, -50%);
          width: 64px;
          height: 64px;
          display: grid;
          place-items: center;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          z-index: 12;
          isolation: isolate;
        }
        .hotspot-dot {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 30%, #fff5c4, #f5d76e 60%, #c9a23a);
          box-shadow:
            0 0 0 4px rgba(245, 215, 110, 0.35),
            0 0 24px 6px rgba(245, 215, 110, 0.65);
          z-index: 2;
          transition: transform 0.18s ease;
        }
        .hotspot:hover .hotspot-dot {
          transform: scale(1.18);
        }
        .hotspot:active .hotspot-dot {
          transform: scale(0.92);
        }
        .hotspot-pulse,
        .hotspot-pulse-2 {
          position: absolute;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: rgba(245, 215, 110, 0.6);
          z-index: 1;
          animation: hp-pulse 2.4s ease-out infinite;
        }
        .hotspot-pulse-2 {
          animation-delay: 1.2s;
        }
        @keyframes hp-pulse {
          0%   { transform: scale(1);   opacity: 0.7; }
          70%  { transform: scale(4);   opacity: 0;   }
          100% { transform: scale(4);   opacity: 0;   }
        }
        .hotspot-label {
          position: absolute;
          bottom: -40px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(29, 29, 31, 0.92);
          color: #fff;
          font-family: var(--font-text);
          font-size: 13px;
          font-weight: 600;
          letter-spacing: -0.224px;
          padding: 6px 12px;
          border-radius: 9999px;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .hotspot:hover .hotspot-label,
        .hotspot:focus-visible .hotspot-label {
          opacity: 1;
          transform: translateX(-50%) translateY(-4px);
        }

        @media (prefers-reduced-motion: reduce) {
          .hotspot-pulse,
          .hotspot-pulse-2 { animation: none; opacity: 0.35; }
        }
      `}</style>
    </button>
  );
}
