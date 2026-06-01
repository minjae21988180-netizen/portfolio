"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import ControlRoom from "./art/ControlRoom";
import CharacterBack from "./art/CharacterBack";
import MeOdometer from "./MeOdometer";
import IntroSequence from "./IntroSequence";
import { useParallax } from "@/hooks/useParallax";

type Zone = "work" | "me" | "connect" | null;

const ZONES: { key: Exclude<Zone, null>; min: number; max: number; href: string; label: string; hint: string }[] = [
  { key: "work",    min: 0.035, max: 0.305, href: "/work",    label: "Work Island",    hint: "Case studies, projects, craft" },
  { key: "me",      min: 0.330, max: 0.670, href: "/me",      label: "Me Island",      hint: "About, skills, interests" },
  { key: "connect", min: 0.695, max: 0.965, href: "/connect", label: "Connect Island", hint: "Contact, socials, resume" },
];

// Character sways subtly around center (not full-width tracking) so the
// side windows stay clickable. Constants per PROJECT_BRIEF §1.
const CHAR_TRAVEL = 95; // px, ±
const CHAR_TILT = 6; // deg, ±
const LERP = 0.07;

export default function ControlCenter() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<HTMLElement>(null);
  const transitionRef = useRef<HTMLDivElement>(null);
  // background panorama parallax — dramatic; character moves opposite → depth
  useParallax(bgRef, { maxX: 46, maxY: 30, scale: 1.16 });
  const router = useRouter();
  const [activeZone, setActiveZone] = useState<Zone>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [meoOpen, setMeoOpen] = useState(false);
  const [dancing, setDancing] = useState(false);
  // null = undecided (render splash, no hydration mismatch); true/false after mount
  const [intro, setIntro] = useState<boolean | null>(null);

  useEffect(() => {
    const seen = typeof window !== "undefined" && sessionStorage.getItem("cc-intro");
    setIntro(!seen);
  }, []);

  const finishIntro = useCallback(() => {
    try {
      sessionStorage.setItem("cc-intro", "1");
    } catch {}
    setIntro(false);
  }, []);

  const targetXRef = useRef(0.5);
  const currentXRef = useRef(0.5);
  const activeZoneRef = useRef<Zone>(null);
  const rafRef = useRef<number>(0);

  // detect coarse pointer
  useEffect(() => {
    const mql = window.matchMedia("(hover: none), (pointer: coarse), (max-width: 833px)");
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  const detectZone = useCallback((xRatio: number): Zone => {
    for (const z of ZONES) {
      if (xRatio >= z.min && xRatio <= z.max) return z.key;
    }
    return null;
  }, []);

  // animation loop
  useEffect(() => {
    if (isMobile) {
      currentXRef.current = 0.5;
      if (characterRef.current) {
        characterRef.current.style.transform = `translateX(-50%)`;
      }
      return;
    }

    const tick = () => {
      // lerp current → target
      currentXRef.current += (targetXRef.current - currentXRef.current) * LERP;
      const x = currentXRef.current;
      if (characterRef.current) {
        // subtle sway + tilt toward the cursor, character stays centered
        const offset = (x - 0.5) * 2 * CHAR_TRAVEL;
        const tilt = (x - 0.5) * 2 * CHAR_TILT;
        characterRef.current.style.transform = `translateX(calc(-50% + ${offset}px)) rotate(${tilt}deg)`;
      }
      const z = detectZone(x);
      if (z !== activeZoneRef.current) {
        activeZoneRef.current = z;
        setActiveZone(z);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isMobile, detectZone]);

  const onMove = useCallback((e: React.MouseEvent | MouseEvent) => {
    if (isMobile) return;
    if (!sceneRef.current) return;
    const rect = sceneRef.current.getBoundingClientRect();
    const rel = (e.clientX - rect.left) / rect.width;
    targetXRef.current = Math.max(0, Math.min(1, rel));
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;
    const handler = (e: MouseEvent) => onMove(e);
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, [isMobile, onMove]);

  const flyThrough = useCallback((href: string, side: "left" | "center" | "right") => {
    if (transitioning) return;
    setTransitioning(true);
    if (transitionRef.current) {
      transitionRef.current.dataset.side = side;
      transitionRef.current.classList.add("active");
    }
    setTimeout(() => router.push(href), 850);
  }, [router, transitioning]);

  const onSceneClick = useCallback(() => {
    if (intro !== false) return; // ignore scene clicks during the intro/loading
    if (meoOpen) return;
    if (!activeZone) return;
    const target = ZONES.find((z) => z.key === activeZone);
    if (!target) return;
    const side = activeZone === "work" ? "left" : activeZone === "connect" ? "right" : "center";
    flyThrough(target.href, side);
  }, [activeZone, flyThrough, meoOpen, intro]);

  // Click the character → random dance (placeholder CSS wiggle until WebMs
  // land) + open the ME-ODOMETER popup, both on the same click.
  const onCharacterClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setDancing(true);
    setMeoOpen(true);
    window.setTimeout(() => setDancing(false), 1400);
  }, []);

  return (
    <div className="cc-shell" ref={sceneRef} onClick={onSceneClick}>
      <div className="cc-bg" ref={bgRef}>
        <ControlRoom />
      </div>

      {/* Window glow overlays */}
      <div
        className={`cc-glow cc-glow-left ${activeZone === "work" ? "on" : ""}`}
        aria-hidden
      />
      <div
        className={`cc-glow cc-glow-center ${activeZone === "me" ? "on" : ""}`}
        aria-hidden
      />
      <div
        className={`cc-glow cc-glow-right ${activeZone === "connect" ? "on" : ""}`}
        aria-hidden
      />

      {/* Island labels */}
      {ZONES.map((z) => {
        const center = ((z.min + z.max) / 2) * 100;
        return (
          <div
            key={z.key}
            className={`cc-label ${activeZone === z.key ? "on" : ""}`}
            style={{ left: `${center}%` }}
            aria-hidden={activeZone !== z.key}
          >
            <div className="cc-label-cat">{z.label}</div>
            <div className="cc-label-hint">{z.hint}</div>
            <div className="cc-label-cta">Click to explore →</div>
          </div>
        );
      })}

      {/* Character sprite — clickable, opens the ME-ODOMETER */}
      <button
        ref={characterRef as React.RefObject<HTMLButtonElement>}
        type="button"
        className={`cc-character scene-shadow ${dancing ? "dancing" : ""}`}
        onClick={onCharacterClick}
        aria-label="Meet Minjae — open the ME-ODOMETER stats"
      >
        <CharacterBack />
      </button>

      {/* Mobile fallback — tappable island cards */}
      {isMobile && (
        <div className="cc-mobile-tray">
          {ZONES.map((z) => (
            <button
              key={z.key}
              className="cc-mobile-card"
              onClick={(e) => {
                e.stopPropagation();
                const side = z.key === "work" ? "left" : z.key === "connect" ? "right" : "center";
                flyThrough(z.href, side);
              }}
            >
              <span className="cc-mobile-title">{z.label}</span>
              <span className="cc-mobile-hint">{z.hint}</span>
            </button>
          ))}
        </div>
      )}

      {/* Hero copy — Apple-tight, quiet */}
      <div className="cc-hero">
        <div className="t-tagline" style={{ color: "#ffe6a0", marginBottom: 8 }}>Minjae Kim · Control Center</div>
        <h1 className="h-hero" style={{ color: "#fff", maxWidth: 720 }}>
          Three islands. One mind. Take the controls.
        </h1>
        <p className="t-lead" style={{ color: "rgba(255,255,255,0.78)", marginTop: 14, maxWidth: 560 }}>
          {isMobile
            ? "Tap an island to step inside — or tap Minjae for her stat card."
            : "Move your cursor — she turns toward the window. Click a glowing one to fly through, or click Minjae for her ME-ODOMETER."}
        </p>
      </div>

      {/* Entrance: splash while undecided, then the zoom-in intro (once/session) */}
      {intro === null && <div className="cc-splash" aria-hidden />}
      {intro === true && <IntroSequence onDone={finishIntro} />}

      {/* ME-ODOMETER player-card popup */}
      {meoOpen && <MeOdometer onClose={() => setMeoOpen(false)} />}

      {/* Fly-through transition overlay */}
      <div ref={transitionRef} className="cc-transition" aria-hidden />

      <style jsx global>{`
        .cc-shell {
          position: relative;
          width: 100%;
          height: 100vh;
          min-height: 640px;
          overflow: hidden;
          background: #0F0820;
          color: #fff;
          isolation: isolate;
        }

        .cc-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          will-change: transform;
        }

        /* covers the scene until the once-per-session intro decision is made,
           so there's no flash of the room (and no hydration mismatch) */
        .cc-splash {
          position: fixed;
          inset: 0;
          z-index: 210;
          background: linear-gradient(180deg, #2a1f3d, #3d2f5c 60%, #4a3a5c);
        }

        .cc-hero {
          position: absolute;
          left: 22px;
          top: 64px;
          z-index: 4;
          max-width: min(720px, 60vw);
          pointer-events: none;
        }

        @media (max-width: 833px) {
          .cc-hero {
            left: 18px;
            right: 18px;
            top: 56px;
            max-width: none;
            text-align: center;
          }
        }

        .cc-glow {
          position: absolute;
          z-index: 2;
          pointer-events: none;
          opacity: 0;
          mix-blend-mode: screen;
          transition: opacity 0.45s ease;
        }
        .cc-glow.on { opacity: 1; }
        .cc-glow-left {
          left: 3.5%;
          top: 22%;
          width: 24%;
          height: 60%;
          background: radial-gradient(ellipse at center, rgba(240, 153, 123, 0.55), transparent 70%);
        }
        .cc-glow-center {
          left: 33%;
          top: 15%;
          width: 34%;
          height: 70%;
          background: radial-gradient(ellipse at center, rgba(232, 196, 240, 0.6), transparent 70%);
        }
        .cc-glow-right {
          left: 69.5%;
          top: 22%;
          width: 24%;
          height: 60%;
          background: radial-gradient(ellipse at center, rgba(245, 160, 184, 0.55), transparent 70%);
        }

        .cc-label {
          position: absolute;
          bottom: 22%;
          transform: translateX(-50%) translateY(8px);
          opacity: 0;
          pointer-events: none;
          text-align: center;
          z-index: 5;
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .cc-label.on {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
        .cc-label-cat {
          font-family: var(--font-display);
          font-size: 28px;
          font-weight: 600;
          letter-spacing: 0.196px;
          color: #fff;
          line-height: 1.1;
        }
        .cc-label-hint {
          font-size: 14px;
          line-height: 1.43;
          letter-spacing: -0.224px;
          color: rgba(255, 255, 255, 0.7);
          margin-top: 4px;
        }
        .cc-label-cta {
          margin-top: 14px;
          display: inline-block;
          background: var(--primary);
          color: #fff;
          padding: 10px 18px;
          border-radius: var(--r-pill);
          font-size: 14px;
          font-weight: 400;
          letter-spacing: -0.224px;
          box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.06);
        }

        .cc-character {
          position: absolute;
          bottom: 4%;
          left: 50%;
          height: 56%;
          width: auto;
          aspect-ratio: 529 / 1462;
          transform: translateX(-50%);
          transition: filter 0.3s ease;
          z-index: 6;
          pointer-events: auto;
          cursor: pointer;
          padding: 0;
          background: none;
          border: none;
          filter: drop-shadow(0 18px 30px rgba(0, 0, 0, 0.35));
        }
        .cc-character :global(img) {
          height: 100%;
          width: auto;
          display: block;
          user-select: none;
          -webkit-user-drag: none;
          transform-origin: 50% 100%;
        }
        .cc-character:hover :global(img) { animation: cc-wiggle 1.6s ease-in-out infinite; }
        .cc-character.dancing :global(img) { animation: cc-dance 0.5s ease-in-out 0s 3; }
        @keyframes cc-wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(1.5deg); }
          75% { transform: rotate(-1.5deg); }
        }
        @keyframes cc-dance {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          20% { transform: translateY(-12px) rotate(-5deg); }
          50% { transform: translateY(0) rotate(5deg); }
          80% { transform: translateY(-8px) rotate(-3deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .cc-character:hover :global(img),
          .cc-character.dancing :global(img) { animation: none; }
        }

        @media (max-width: 833px) {
          .cc-character {
            height: 38%;
            bottom: 26%;
          }
        }

        .cc-mobile-tray {
          position: absolute;
          left: 18px;
          right: 18px;
          bottom: 18px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          z-index: 10;
        }
        .cc-mobile-card {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.14);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-radius: var(--r-lg);
          padding: 14px 12px;
          color: #fff;
          display: flex;
          flex-direction: column;
          gap: 4px;
          text-align: left;
          transition: transform 0.2s, background 0.2s;
        }
        .cc-mobile-card:active { transform: scale(0.96); }
        .cc-mobile-title {
          font-family: var(--font-display);
          font-size: 15px;
          font-weight: 600;
          letter-spacing: -0.224px;
        }
        .cc-mobile-hint {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.65);
          letter-spacing: -0.12px;
          line-height: 1.3;
        }

        /* Fly-through transition: radial circle expanding from window center */
        .cc-transition {
          position: fixed;
          inset: 0;
          z-index: 100;
          pointer-events: none;
          background: radial-gradient(circle at 50% 50%, #fff 0%, #fff 0%, transparent 0%);
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        .cc-transition.active {
          opacity: 1;
          animation: flyThrough 0.85s cubic-bezier(0.7, 0, 0.85, 1) forwards;
        }
        .cc-transition[data-side="left"].active { animation-name: flyThroughLeft; }
        .cc-transition[data-side="right"].active { animation-name: flyThroughRight; }

        @keyframes flyThrough {
          0% { background: radial-gradient(circle at 50% 45%, #ffffff 0%, #ffffff 0.5%, transparent 1%); }
          60% { background: radial-gradient(circle at 50% 45%, #ffffff 0%, #ffffff 50%, transparent 65%); }
          100% { background: radial-gradient(circle at 50% 45%, #ffffff 0%, #ffffff 200%, transparent 220%); }
        }
        @keyframes flyThroughLeft {
          0% { background: radial-gradient(circle at 16% 50%, #ffffff 0%, #ffffff 0.5%, transparent 1%); }
          60% { background: radial-gradient(circle at 16% 50%, #ffffff 0%, #ffffff 50%, transparent 65%); }
          100% { background: radial-gradient(circle at 16% 50%, #ffffff 0%, #ffffff 200%, transparent 220%); }
        }
        @keyframes flyThroughRight {
          0% { background: radial-gradient(circle at 84% 50%, #ffffff 0%, #ffffff 0.5%, transparent 1%); }
          60% { background: radial-gradient(circle at 84% 50%, #ffffff 0%, #ffffff 50%, transparent 65%); }
          100% { background: radial-gradient(circle at 84% 50%, #ffffff 0%, #ffffff 200%, transparent 220%); }
        }
      `}</style>
    </div>
  );
}
