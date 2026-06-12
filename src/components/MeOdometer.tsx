"use client";

import { useEffect } from "react";
import CharacterBack from "./art/CharacterBack";

type Stat = { name: string; value: number; fill: string; signature?: boolean };

const STATS: Stat[] = [
  { name: "UX RESEARCH", value: 92, fill: "f-rose" },
  { name: "PRODUCT DESIGN", value: 85, fill: "f-lilac" },
  { name: "VISUAL / BRAND", value: 88, fill: "f-butter" },
  { name: "PROTOTYPING", value: 80, fill: "f-aqua" },
  { name: "SYSTEMS THINKING", value: 90, fill: "f-rainbow", signature: true },
];

/**
 * Y2K candy game player-card popup, opened by clicking the landing character.
 * Deliberately breaks the calm island chrome (Baloo 2, candy gradient ring,
 * chunky outlined bars that animate fill on open).
 */
export default function MeOdometer({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="meo-overlay" role="dialog" aria-modal="true" aria-label="ME-ODOMETER career stats" onClick={onClose}>
      <div className="meo" onClick={(e) => e.stopPropagation()}>
        <button className="meo-close" onClick={onClose} aria-label="Close">✕</button>

        {/* LEFT — character on pedestal */}
        <div className="meo-hero">
          <div className="meo-char">
            <CharacterBack />
          </div>
          <div className="meo-pedestal" />
          <div className="meo-name">MINJAE</div>
        </div>

        {/* RIGHT — stats */}
        <div className="meo-stats">
          <div className="meo-eyebrow">PLAYER CARD · DESIGNER CLASS</div>
          <div className="meo-heading">ME-ODOMETER</div>
          <p className="meo-blurb">
            A UX &amp; product designer who turns friction into flow. Tap me again to see new moves!
            Here&rsquo;s the stat sheet 👇
          </p>
          <div className="meo-label">★ CAREER STATS ★</div>

          {STATS.map((s) => (
            <div className="meo-row" key={s.name}>
              <span className="meo-bar-name">{s.name}</span>
              {s.signature && <span className="meo-sig">★ SIGNATURE</span>}
              <div className="meo-track">
                <div
                  className={`meo-fill ${s.fill}`}
                  style={{ "--w": `${s.value}%` } as React.CSSProperties}
                >
                  <span className="meo-val">{s.value}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .meo-overlay {
          position: fixed;
          inset: 0;
          z-index: 70;
          display: grid;
          place-items: center;
          padding: 24px;
          background: radial-gradient(130% 90% at 15% 0%, rgba(217, 194, 240, 0.5), transparent 55%),
            radial-gradient(120% 90% at 92% 15%, rgba(255, 209, 228, 0.5), transparent 50%),
            rgba(40, 22, 50, 0.42);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          animation: meo-fade 0.3s ease;
        }
        @keyframes meo-fade { from { opacity: 0; } to { opacity: 1; } }

        .meo {
          position: relative;
          width: min(1000px, 94vw);
          height: min(86vh, 680px);
          background: rgba(255, 255, 255, 0.55);
          backdrop-filter: blur(26px) saturate(150%);
          -webkit-backdrop-filter: blur(26px) saturate(150%);
          border: 3px solid #fff;
          border-radius: 34px;
          box-shadow: 0 30px 80px rgba(120, 70, 130, 0.4);
          display: grid;
          grid-template-columns: 0.95fr 1.15fr;
          overflow: hidden;
          animation: meo-pop 0.55s cubic-bezier(0.34, 1.56, 0.4, 1) both;
          font-family: var(--font-candy);
          color: var(--ink);
        }
        .meo::before {
          content: "";
          position: absolute;
          inset: -3px;
          border-radius: 34px;
          padding: 3px;
          background: linear-gradient(135deg, var(--rose), var(--butter), var(--aqua), var(--candy-lilac));
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
        @keyframes meo-pop {
          from { opacity: 0; transform: translateY(26px) scale(0.93); }
          to { opacity: 1; transform: none; }
        }

        .meo-close {
          position: absolute;
          top: 18px;
          left: 20px;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: 3px solid #fff;
          background: var(--rose);
          color: #fff;
          font-size: 18px;
          font-weight: 700;
          z-index: 5;
          box-shadow: 0 4px 12px rgba(232, 90, 155, 0.5);
          transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.4, 1);
        }
        .meo-close:hover { transform: scale(1.12) rotate(90deg); }

        .meo-hero {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          padding: 52px 20px 28px;
          background: linear-gradient(180deg, rgba(182, 155, 240, 0.25), rgba(111, 217, 224, 0.18));
        }
        .meo-char {
          height: 62%;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          animation: meo-bob 5s ease-in-out infinite;
          filter: drop-shadow(0 14px 22px rgba(120, 70, 130, 0.35));
        }
        .meo-char :global(img) { height: 100%; width: auto; }
        @keyframes meo-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-9px); } }
        .meo-pedestal {
          width: 200px;
          height: 26px;
          border-radius: 50%;
          margin-top: -4px;
          background: radial-gradient(ellipse, rgba(149, 121, 232, 0.55), transparent 70%);
        }
        .meo-name {
          margin-top: 12px;
          font-weight: 800;
          font-size: 22px;
          color: #fff;
          -webkit-text-stroke: 2px var(--outline);
          letter-spacing: 0.02em;
        }

        .meo-stats { padding: 34px 38px; overflow-y: auto; }
        .meo-stats::-webkit-scrollbar { width: 8px; }
        .meo-stats::-webkit-scrollbar-thumb { background: rgba(232, 90, 155, 0.35); border-radius: 5px; }
        .meo-eyebrow {
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.1em;
          color: #fff;
          -webkit-text-stroke: 1.2px var(--aqua-deep);
          margin-bottom: 2px;
        }
        .meo-heading {
          font-weight: 800;
          font-size: clamp(30px, 5vw, 40px);
          line-height: 1;
          color: #fff;
          -webkit-text-stroke: 2.5px var(--rose-deep);
          margin-bottom: 6px;
        }
        .meo-blurb {
          font-family: var(--font-text);
          font-size: 14px;
          color: var(--ink);
          line-height: 1.5;
          margin-bottom: 20px;
          font-weight: 500;
          max-width: 420px;
        }
        .meo-label {
          font-weight: 800;
          font-size: 15px;
          letter-spacing: 0.08em;
          color: #fff;
          -webkit-text-stroke: 1.5px var(--candy-lilac-deep);
          margin-bottom: 14px;
        }

        .meo-row { margin-bottom: 16px; }
        .meo-bar-name {
          font-weight: 800;
          font-size: 14px;
          letter-spacing: 0.04em;
          color: #fff;
          -webkit-text-stroke: 1.4px var(--outline);
          transform: rotate(-1deg);
          display: inline-block;
          margin-bottom: 5px;
        }
        .meo-sig {
          font-weight: 800;
          font-size: 10px;
          color: #fff;
          -webkit-text-stroke: 0.8px var(--candy-lilac-deep);
          margin-left: 8px;
          letter-spacing: 0.06em;
        }
        .meo-track {
          height: 26px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.7);
          border: 2.5px solid var(--outline);
          overflow: hidden;
        }
        .meo-fill {
          height: 100%;
          border-radius: 999px;
          position: relative;
          width: var(--w);
          animation: meo-grow 1.1s cubic-bezier(0.3, 0.9, 0.3, 1) both;
        }
        @keyframes meo-grow { from { width: 0; } }
        .f-rose { background: linear-gradient(90deg, #ffd1e4, var(--rose)); }
        .f-lilac { background: linear-gradient(90deg, #e0d4fb, var(--candy-lilac)); }
        .f-butter { background: linear-gradient(90deg, #fff0c9, var(--butter)); }
        .f-aqua { background: linear-gradient(90deg, #cdf3f5, var(--aqua)); }
        .f-rainbow { background: linear-gradient(90deg, var(--aqua), var(--candy-lilac), var(--rose), var(--butter)); }
        .meo-val {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          font-weight: 800;
          font-size: 12px;
          color: #fff;
          -webkit-text-stroke: 0.8px var(--outline);
        }

        @media (max-width: 720px) {
          .meo { grid-template-columns: 1fr; height: 92vh; }
          .meo-hero { padding: 56px 20px 18px; min-height: 240px; }
          .meo-char { height: 180px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .meo, .meo-char, .meo-fill { animation: none; }
        }
      `}</style>
    </div>
  );
}
