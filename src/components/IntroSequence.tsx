"use client";

import { useEffect, useRef, useState } from "react";
import { useParallax } from "@/hooks/useParallax";

/**
 * Entrance sequence for the landing page.
 * Shows the zoomed-OUT room (landing-wide.png) with the character hanging from
 * the cursor. On click — or automatically after 5s — it dives IN, cross-zooming
 * to the zoomed-in frame (control-room.png, the live Control Room) and then
 * hands off to the interactive scene underneath.
 *
 * Images are referenced by runtime path so a missing file never breaks the
 * build. Drop them in at:
 *   public/assets/landing-wide.png   (zoomed-out / image 1)
 *   public/assets/control-room.png   (zoomed-in  / image 2 — the live room)
 */
const AUTO_MS = 5000;
const ZOOM_MS = 1500;

export default function IntroSequence({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"wide" | "enter">("wide");
  const charRef = useRef<HTMLDivElement>(null);
  const wideRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef(false);

  // same cursor-parallax depth as the live site, on the wide loading frame.
  // (Nested inside the dive-zoom wrapper so both transforms compose.)
  useParallax(wideRef, { maxX: 42, maxY: 28, scale: 1.12 });

  // character hangs from the cursor (anchored at top, gentle lag via CSS)
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (coarse) {
      if (charRef.current) {
        charRef.current.style.left = "50%";
        charRef.current.style.top = "42%";
      }
      return;
    }
    if (charRef.current) {
      charRef.current.style.left = "50%";
      charRef.current.style.top = "42%";
    }
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      if (!charRef.current) return;
      charRef.current.style.left = `${e.clientX}px`;
      charRef.current.style.top = `${e.clientY}px`;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const enter = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setPhase("enter");
    window.setTimeout(onDone, reduce ? 350 : ZOOM_MS);
  };

  // auto-advance after 5s
  useEffect(() => {
    const t = window.setTimeout(enter, AUTO_MS);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`intro ${phase}`}
      onClick={enter}
      role="button"
      tabIndex={0}
      aria-label="Enter the Control Center"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") enter();
      }}
    >
      {/* zoomed-in frame (the live room) — fades/scales in as we dive */}
      <div className="intro-layer intro-zoom" aria-hidden>
        <img src="/assets/control-room.png" alt="" />
      </div>

      {/* zoomed-out frame — has its own cursor-parallax (inner), and the
          outer wrapper scales up / fades as the camera flies in */}
      <div className="intro-layer intro-wide" aria-hidden>
        <div className="intro-wide-px" ref={wideRef}>
          <img src="/assets/landing-wide.png" alt="" />
        </div>
      </div>

      {/* character hanging from the cursor */}
      <div className="intro-char" ref={charRef} aria-hidden>
        <div className="intro-char-swing">
          <img src="/assets/character-sprite.png" alt="" />
        </div>
      </div>

      {/* prompt + auto-advance progress */}
      <div className="intro-prompt">
        <span className="intro-cta">Click to enter</span>
        <span className="intro-sub">or wait a moment…</span>
        <span className="intro-progress" />
      </div>

      <style jsx>{`
        .intro {
          position: fixed;
          inset: 0;
          z-index: 200;
          overflow: hidden;
          cursor: pointer;
          background: #2a1f3d;
          isolation: isolate;
        }
        .intro-layer {
          position: absolute;
          inset: 0;
          transform-origin: 50% 46%;
          will-change: transform, opacity;
        }
        .intro-layer :global(img) {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          user-select: none;
          -webkit-user-drag: none;
        }
        .intro-wide-px {
          position: absolute;
          inset: 0;
          will-change: transform;
        }

        /* wide frame on top to start */
        .intro-wide {
          opacity: 1;
          transform: scale(1);
          transition: transform ${ZOOM_MS}ms cubic-bezier(0.6, 0, 0.75, 0.2),
            opacity ${ZOOM_MS}ms ease-in;
        }
        /* zoomed-in frame waiting underneath, slightly oversized */
        .intro-zoom {
          opacity: 0;
          transform: scale(1.28);
          transition: transform ${ZOOM_MS}ms cubic-bezier(0.2, 0.7, 0.3, 1),
            opacity ${ZOOM_MS}ms ease-out;
        }

        /* THE DIVE-IN */
        .intro.enter .intro-wide {
          opacity: 0;
          transform: scale(2.6);
        }
        .intro.enter .intro-zoom {
          opacity: 1;
          transform: scale(1);
        }

        /* character hanging from the cursor */
        .intro-char {
          position: fixed;
          left: 50%;
          top: 42%;
          z-index: 5;
          pointer-events: none;
          transform: translate(-50%, 0);
          transition: left 0.18s ease-out, top 0.18s ease-out, opacity 0.5s ease;
          height: 30vh;
          filter: drop-shadow(0 16px 26px rgba(0, 0, 0, 0.4));
        }
        .intro-char-swing {
          height: 100%;
          transform-origin: 50% 0%;
          animation: intro-swing 3.2s ease-in-out infinite;
        }
        .intro-char :global(img) {
          height: 100%;
          width: auto;
          display: block;
        }
        @keyframes intro-swing {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        .intro.enter .intro-char {
          opacity: 0;
          transform: translate(-50%, -30px) scale(1.4);
        }

        /* prompt */
        .intro-prompt {
          position: absolute;
          left: 50%;
          bottom: 8%;
          transform: translateX(-50%);
          z-index: 6;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          text-align: center;
          transition: opacity 0.4s ease;
        }
        .intro.enter .intro-prompt { opacity: 0; }
        .intro-cta {
          font-family: var(--font-display);
          font-size: clamp(18px, 2.4vw, 24px);
          font-weight: 600;
          color: #fff;
          letter-spacing: 0.01em;
          text-shadow: 0 2px 18px rgba(0, 0, 0, 0.45);
          animation: intro-pulse 2s ease-in-out infinite;
        }
        .intro-sub {
          font-family: var(--font-text);
          font-size: 13px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.75);
          text-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
        }
        .intro-progress {
          margin-top: 8px;
          width: 180px;
          max-width: 50vw;
          height: 4px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.28);
          overflow: hidden;
          position: relative;
        }
        .intro-progress::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 999px;
          background: linear-gradient(90deg, #ff7eb6, #ffd86b);
          transform-origin: left center;
          transform: scaleX(0);
          animation: intro-fill ${AUTO_MS}ms linear forwards;
        }
        @keyframes intro-fill {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @keyframes intro-pulse {
          0%, 100% { opacity: 0.85; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.04); }
        }

        @media (prefers-reduced-motion: reduce) {
          .intro-wide, .intro-zoom { transition: opacity 0.3s ease; }
          .intro.enter .intro-wide { transform: scale(1); }
          .intro.enter .intro-zoom { transform: scale(1); }
          .intro-char-swing, .intro-cta { animation: none; }
          .intro-progress::after { animation: none; transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
}
