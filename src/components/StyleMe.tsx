"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

type Look = { id: string; name: string; image: string };

const LOOKS: Look[] = [
  { id: "studio-day",     name: "Studio Day",     image: "/assets/looks/studio-day.png" },
  { id: "yoga-flow",      name: "Yoga Flow",      image: "/assets/looks/yoga-flow.png" },
  { id: "cafe",           name: "Café Connect",   image: "/assets/looks/cafe.png" },
  { id: "sunlight",       name: "Sunlight",       image: "/assets/looks/sunlight.png" },
  { id: "designer-pitch", name: "Designer Pitch", image: "/assets/looks/designer-pitch.png" },
  { id: "weekend",        name: "Weekend",        image: "/assets/looks/weekend.png" },
  { id: "concert",        name: "Concert",        image: "/assets/looks/concert.png" },
  { id: "edm-night",      name: "EDM Night",      image: "/assets/looks/edm-night.png" },
];

type Skill = { label: string; value: number; icon: IconName; bar: string };

const SKILLS: Skill[] = [
  { label: "UX Research",     value: 92, icon: "search",  bar: "linear-gradient(90deg, #ff5fb8, #b15bff)" },
  { label: "Product Design",  value: 88, icon: "box",     bar: "linear-gradient(90deg, #6fc6ff, #4f8cff)" },
  { label: "Visual Design",   value: 95, icon: "brush",   bar: "linear-gradient(90deg, #d59bff, #6f63ff)" },
  { label: "Prototyping",     value: 87, icon: "cursor",  bar: "linear-gradient(90deg, #5ff3e8, #5fb6ff)" },
  { label: "Trend Sense",     value: 91, icon: "star",    bar: "linear-gradient(90deg, #ffd76f, #ff9b5f)" },
  { label: "Communication",   value: 89, icon: "message", bar: "linear-gradient(90deg, #7fe4ff, #5fb6ff)" },
  { label: "Design Strategy", value: 90, icon: "target",  bar: "linear-gradient(90deg, #ff9bb6, #ff5f8f)" },
];

export default function StyleMe() {
  const [currentLook, setCurrentLook] = useState<Look>(LOOKS[0]);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [shuffleKey, setShuffleKey] = useState(0);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  const pickRandom = () => {
    const others = LOOKS.filter((l) => l.id !== currentLook.id && l.image);
    if (!others.length) return;
    const next = others[Math.floor(Math.random() * others.length)];
    setCurrentLook(next);
    setShuffleKey((k) => k + 1);
  };

  const saveLook = async () => {
    if (!currentLook.image) return;
    try {
      const res = await fetch(currentLook.image);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${currentLook.id}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      /* no-op */
    }
  };

  return (
    <main className="sm-shell">
      <BackHomeButton />

      <div className="sm-bg" aria-hidden>
        <div className="sm-bg-clouds c1" />
        <div className="sm-bg-clouds c2" />
        <div className="sm-bg-clouds c3" />
        <div className="sm-bg-balloons">
          <span className="ball b1" />
          <span className="ball b2" />
          <span className="ball b3" />
        </div>
      </div>

      <header className="sm-title-wrap">
        <h1 className="sm-title">
          <span className="sm-crown" aria-hidden>♛</span>
          MINJAE KIM
        </h1>
        <div className="sm-subtitle">Try to <em>Style</em> Me <span aria-hidden>♥</span></div>
      </header>

      <div className="sm-grid">
        {/* LEFT — Designer Odometer */}
        <section className="sm-panel sm-odometer" aria-label="Designer Odometer">
          <h2 className="sm-panel-title">
            <Sparkle /> DESIGNER ODOMETER <Sparkle />
          </h2>
          <ul className="sm-skills">
            {SKILLS.map((s, i) => (
              <SkillRow key={s.label} skill={s} delay={i * 70} reducedMotion={reducedMotion} />
            ))}
          </ul>
        </section>

        {/* CENTER — Avatar stage */}
        <section className="sm-stage-wrap" aria-label="Selected look">
          <div className="sm-arch" aria-hidden>
            <div className="sm-arch-inner" />
            <div className="sm-arch-glow" />
            <span className="sm-plane" aria-hidden>✈</span>
          </div>
          <div className="sm-stage">
            {currentLook.image ? (
              <img
                key={currentLook.id + shuffleKey}
                src={currentLook.image}
                alt={currentLook.name}
                className={`sm-look ${reducedMotion ? "no-anim" : ""}`}
              />
            ) : (
              <div key={currentLook.id + shuffleKey} className="sm-look-placeholder">
                <div className="sm-look-placeholder-text">
                  <strong>{currentLook.name}</strong>
                  <span>coming soon</span>
                </div>
              </div>
            )}
            <div className="sm-podium" aria-hidden>
              <div className="sm-podium-top" />
              <div className="sm-podium-mid" />
              <div className="sm-podium-base" />
            </div>
          </div>
        </section>

        {/* RIGHT — Look gallery */}
        <section className="sm-panel sm-gallery" aria-label="Look gallery">
          <h2 className="sm-panel-title">
            <Sparkle /> LOOK GALLERY <Sparkle />
          </h2>
          <div className="sm-tile-grid">
            {LOOKS.map((look) => {
              const selected = look.id === currentLook.id;
              return (
                <button
                  key={look.id}
                  type="button"
                  className={`sm-tile ${selected ? "is-selected" : ""}`}
                  onClick={() => setCurrentLook(look)}
                  aria-pressed={selected}
                  aria-label={look.name}
                >
                  <div className="sm-tile-img-wrap">
                    {look.image ? (
                      <img src={look.image} alt="" />
                    ) : (
                      <div className="sm-tile-placeholder">soon</div>
                    )}
                    {selected && (
                      <span className="sm-tile-check" aria-hidden>
                        <CheckIcon />
                      </span>
                    )}
                  </div>
                  <span className="sm-tile-name">{look.name}</span>
                </button>
              );
            })}
          </div>
        </section>
      </div>

      {/* Bottom buttons */}
      <div className="sm-actions">
        <button type="button" className="sm-btn sm-btn--side" onClick={pickRandom}>
          <DiceIcon /> RANDOM LOOK
        </button>
        <button type="button" className="sm-btn sm-btn--hero" onClick={pickRandom}>
          <HangerIcon /> SURPRISE ME
          <Sparkle /> <Sparkle />
        </button>
        <button type="button" className="sm-btn sm-btn--side" onClick={saveLook}>
          <DownloadIcon /> SAVE LOOK
        </button>
      </div>

      <style jsx>{styles}</style>
    </main>
  );
}

function SkillRow({
  skill,
  delay,
  reducedMotion,
}: {
  skill: Skill;
  delay: number;
  reducedMotion: boolean;
}) {
  const [value, setValue] = useState(reducedMotion ? skill.value : 0);
  const [displayed, setDisplayed] = useState(reducedMotion ? skill.value : 0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (reducedMotion) {
      setValue(skill.value);
      setDisplayed(skill.value);
      return;
    }
    if (startedRef.current) return;
    startedRef.current = true;

    const startTimer = window.setTimeout(() => {
      setValue(skill.value);
      const dur = 850;
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplayed(Math.round(skill.value * eased));
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay);
    return () => window.clearTimeout(startTimer);
  }, [skill.value, delay, reducedMotion]);

  return (
    <li className="sm-skill">
      <span className="sm-skill-icon" aria-hidden style={{ background: skill.bar }}>
        <SkillIcon name={skill.icon} />
      </span>
      <div className="sm-skill-body">
        <div className="sm-skill-label">{skill.label}</div>
        <div className="sm-skill-track">
          <div
            className="sm-skill-fill"
            style={{ width: `${value}%`, background: skill.bar }}
          />
        </div>
      </div>
      <div className="sm-skill-pct">{displayed}%</div>
    </li>
  );
}

function BackHomeButton() {
  return (
    <Link href="/" className="sm-back" aria-label="Back to Control Center">
      <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden>
        <path
          d="M12.5 4.5 7 10l5.5 5.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>Control Center</span>
      <style jsx>{`
        :global(.sm-back) {
          position: fixed;
          top: 22px;
          left: 22px;
          z-index: 40;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px 10px 12px;
          background: rgba(255, 255, 255, 0.82);
          backdrop-filter: saturate(180%) blur(18px);
          -webkit-backdrop-filter: saturate(180%) blur(18px);
          border: 1px solid rgba(0, 0, 0, 0.06);
          border-radius: 9999px;
          color: #1d1d1f;
          font-family: var(--font-text);
          font-size: 13px;
          font-weight: 600;
          letter-spacing: -0.224px;
          text-decoration: none;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.18);
        }
        :global(.sm-back:hover) { background: #fff; text-decoration: none; }
        @media (max-width: 540px) {
          :global(.sm-back span) { display: none; }
        }
      `}</style>
    </Link>
  );
}

type IconName = "search" | "box" | "brush" | "cursor" | "star" | "message" | "target";

function SkillIcon({ name }: { name: IconName }) {
  const common = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "white",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "search":
      return (
        <svg {...common}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
      );
    case "box":
      return (
        <svg {...common}><path d="M21 8 12 3 3 8v8l9 5 9-5V8z" /><path d="m3 8 9 5 9-5" /><path d="M12 13v8" /></svg>
      );
    case "brush":
      return (
        <svg {...common}><path d="M9 21c0-2 1-3 3-3s3-1 3-3" /><path d="m14 7 3-3 3 3-3 3" /><path d="M14 7 7 14a3 3 0 0 0 0 4 3 3 0 0 0 4 0l7-7" /></svg>
      );
    case "cursor":
      return (
        <svg {...common}><path d="m4 4 6 16 2.5-6.5L19 11z" /></svg>
      );
    case "star":
      return (
        <svg {...common}><path d="m12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.7L12 16.3 6.8 19l1-5.7-4.3-4.1 5.9-.9z" /></svg>
      );
    case "message":
      return (
        <svg {...common}><path d="M21 12a8 8 0 1 1-3.5-6.6L21 4l-1.4 3.5A8 8 0 0 1 21 12z" /></svg>
      );
    case "target":
      return (
        <svg {...common}><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="1" fill="white" /></svg>
      );
  }
}

function Sparkle() {
  return (
    <svg className="sm-sparkle" width="12" height="12" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M12 2 13.5 9.5 21 11l-7.5 1.5L12 20l-1.5-7.5L3 11l7.5-1.5z"
        fill="currentColor"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="m5 12 5 5 9-11" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DiceIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <circle cx="8" cy="8" r="1.2" fill="currentColor" />
      <circle cx="16" cy="8" r="1.2" fill="currentColor" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" />
      <circle cx="8" cy="16" r="1.2" fill="currentColor" />
      <circle cx="16" cy="16" r="1.2" fill="currentColor" />
    </svg>
  );
}

function HangerIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 8a2 2 0 1 1 2-2" />
      <path d="M12 8 3 17h18z" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  );
}

const styles = `
  .sm-shell {
    position: relative;
    width: 100%;
    min-height: 100vh;
    overflow-x: hidden;
    color: #fff;
    font-family: var(--font-text);
    padding: 28px clamp(20px, 4vw, 56px) 36px;
    background:
      radial-gradient(120% 80% at 20% 0%, #ffd1c6 0%, transparent 55%),
      radial-gradient(110% 70% at 90% 5%, #ffb9d6 0%, transparent 50%),
      radial-gradient(140% 90% at 50% 110%, #c1a3ff 0%, transparent 60%),
      linear-gradient(180deg, #f7c9e0 0%, #d9b6ef 50%, #7e6cc4 100%);
  }

  /* --- Background clouds + balloons --- */
  .sm-bg { position: absolute; inset: 0; pointer-events: none; overflow: hidden; z-index: 0; }
  .sm-bg-clouds {
    position: absolute; border-radius: 50%; filter: blur(40px); opacity: 0.55;
  }
  .sm-bg-clouds.c1 { width: 520px; height: 520px; top: -120px; left: -80px; background: radial-gradient(circle, #ffd5e2, transparent 60%); }
  .sm-bg-clouds.c2 { width: 620px; height: 620px; top: 40px; right: -120px; background: radial-gradient(circle, #ffd5b8, transparent 65%); }
  .sm-bg-clouds.c3 { width: 720px; height: 720px; bottom: -260px; left: 30%; background: radial-gradient(circle, #c8b6ff, transparent 65%); opacity: 0.7; }
  .sm-bg-balloons { position: absolute; inset: 0; }
  .ball {
    position: absolute; display: block; border-radius: 50%; opacity: 0.55; filter: blur(0.5px);
    box-shadow: inset -6px -6px 14px rgba(255,255,255,0.5);
  }
  .ball.b1 { width: 26px; height: 32px; top: 42%; left: 8%; background: radial-gradient(circle at 35% 30%, #fff, #ffb1d8); }
  .ball.b2 { width: 22px; height: 28px; top: 56%; left: 14%; background: radial-gradient(circle at 35% 30%, #fff, #b6e0ff); }
  .ball.b3 { width: 30px; height: 36px; top: 38%; right: 14%; background: radial-gradient(circle at 35% 30%, #fff, #ffcb9b); }

  /* --- Title --- */
  .sm-title-wrap {
    position: relative; z-index: 2;
    margin: 8px 0 24px;
    text-align: left;
    padding-left: clamp(0px, 1vw, 12px);
  }
  .sm-title {
    font-family: var(--font-display);
    font-weight: 900;
    font-size: clamp(40px, 6vw, 76px);
    line-height: 0.95;
    letter-spacing: 1px;
    color: #ffd9ef;
    text-shadow:
      0 0 1px #fff,
      0 0 12px rgba(255, 138, 213, 0.95),
      0 0 28px rgba(186, 110, 255, 0.85),
      0 0 60px rgba(186, 110, 255, 0.55);
    display: inline-flex;
    align-items: center;
    gap: 12px;
  }
  .sm-crown {
    color: #d59bff;
    text-shadow: 0 0 12px rgba(213, 155, 255, 0.9);
    font-size: 0.5em;
  }
  .sm-subtitle {
    margin-top: 6px;
    font-family: "Caveat", "Dancing Script", "Snell Roundhand", cursive;
    font-size: clamp(28px, 3.4vw, 44px);
    color: #ffd7a8;
    text-shadow: 0 0 10px rgba(255, 180, 120, 0.8), 0 0 26px rgba(255, 150, 90, 0.6);
    letter-spacing: 0.5px;
  }
  .sm-subtitle em {
    font-style: italic;
    border-bottom: 2px solid rgba(255, 200, 150, 0.7);
    padding-bottom: 2px;
  }

  /* --- Grid --- */
  .sm-grid {
    position: relative; z-index: 2;
    display: grid;
    grid-template-columns: minmax(280px, 1fr) minmax(360px, 1.1fr) minmax(280px, 1fr);
    gap: clamp(16px, 2vw, 28px);
    align-items: stretch;
  }

  /* --- Glass panel --- */
  .sm-panel {
    position: relative;
    background: linear-gradient(180deg, rgba(180, 150, 240, 0.28), rgba(120, 90, 200, 0.22));
    backdrop-filter: blur(22px) saturate(140%);
    -webkit-backdrop-filter: blur(22px) saturate(140%);
    border: 1px solid rgba(255, 255, 255, 0.28);
    border-radius: 26px;
    padding: 22px 22px 24px;
    box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.08) inset,
      0 20px 50px rgba(60, 30, 110, 0.25),
      0 0 40px rgba(190, 140, 255, 0.18);
  }
  .sm-panel-title {
    font-family: var(--font-display);
    font-size: 14px;
    letter-spacing: 3px;
    color: #ffeaff;
    text-align: center;
    margin-bottom: 18px;
    text-shadow: 0 0 10px rgba(255, 180, 230, 0.6);
    display: flex; align-items: center; justify-content: center; gap: 8px;
  }
  .sm-sparkle { color: #ffd5a8; filter: drop-shadow(0 0 4px rgba(255, 200, 150, 0.8)); }

  /* --- Odometer skill rows --- */
  .sm-skills { list-style: none; display: flex; flex-direction: column; gap: 14px; }
  .sm-skill { display: grid; grid-template-columns: 36px 1fr 44px; gap: 10px; align-items: center; }
  .sm-skill-icon {
    width: 32px; height: 32px; border-radius: 50%;
    display: grid; place-items: center;
    box-shadow: 0 0 14px rgba(255, 150, 220, 0.45), inset 0 0 8px rgba(255, 255, 255, 0.25);
    border: 1px solid rgba(255, 255, 255, 0.35);
  }
  .sm-skill-body { min-width: 0; }
  .sm-skill-label {
    font-size: 13px; font-weight: 600; color: #fff;
    letter-spacing: 0.2px; margin-bottom: 5px;
    text-shadow: 0 1px 2px rgba(60, 20, 110, 0.4);
  }
  .sm-skill-track {
    height: 10px; border-radius: 999px;
    background: rgba(40, 20, 70, 0.45);
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.4);
    overflow: hidden;
  }
  .sm-skill-fill {
    height: 100%;
    border-radius: 999px;
    transition: width 850ms cubic-bezier(0.2, 0.8, 0.2, 1);
    box-shadow:
      0 0 8px rgba(255, 110, 200, 0.7),
      0 0 18px rgba(255, 110, 200, 0.45),
      inset 0 0 6px rgba(255, 255, 255, 0.35);
  }
  .sm-skill-pct {
    font-variant-numeric: tabular-nums;
    font-size: 13px; font-weight: 700; text-align: right;
    color: #fff;
    text-shadow: 0 1px 2px rgba(60, 20, 110, 0.4);
  }

  /* --- Center stage --- */
  .sm-stage-wrap {
    position: relative;
    display: flex; align-items: flex-end; justify-content: center;
    min-height: clamp(420px, 60vh, 640px);
  }
  .sm-arch {
    position: absolute;
    top: 0; left: 50%; transform: translateX(-50%);
    width: min(420px, 90%);
    height: 100%;
    pointer-events: none;
  }
  .sm-arch-inner {
    position: absolute;
    inset: 0 0 18% 0;
    border-radius: 50% 50% 18px 18px / 60% 60% 18px 18px;
    background: radial-gradient(120% 70% at 50% 60%, rgba(255, 220, 240, 0.55), rgba(255, 180, 220, 0.08) 60%, transparent 80%);
    border: 2px solid rgba(255, 200, 230, 0.55);
    box-shadow:
      0 0 24px rgba(255, 150, 220, 0.55),
      0 0 60px rgba(190, 140, 255, 0.4),
      inset 0 0 40px rgba(255, 200, 230, 0.35);
  }
  .sm-arch-glow {
    position: absolute;
    inset: 8% 8% 22% 8%;
    border-radius: 50%;
    background: radial-gradient(circle at 50% 50%, rgba(255, 220, 240, 0.6), transparent 70%);
    filter: blur(20px);
  }
  .sm-plane {
    position: absolute;
    top: 12%; left: 18%;
    color: rgba(255, 255, 255, 0.85);
    font-size: 20px;
    transform: rotate(-20deg);
    filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.6));
  }

  .sm-stage {
    position: relative;
    width: min(440px, 88%);
    aspect-ratio: 3 / 4;
    display: flex; align-items: flex-end; justify-content: center;
  }
  .sm-look, .sm-look-placeholder {
    position: absolute;
    bottom: 14%;
    left: 50%;
    transform: translateX(-50%);
    width: 88%;
    height: 82%;
    object-fit: contain;
    animation: sm-look-in 380ms ease;
    filter: drop-shadow(0 18px 18px rgba(60, 20, 110, 0.35));
  }
  .sm-look.no-anim { animation: none; }
  .sm-look-placeholder {
    display: grid; place-items: center;
    border: 2px dashed rgba(255, 255, 255, 0.5);
    border-radius: 18px;
    color: rgba(255, 255, 255, 0.85);
    background: rgba(255, 255, 255, 0.08);
  }
  .sm-look-placeholder-text { display: flex; flex-direction: column; align-items: center; gap: 4px; }
  .sm-look-placeholder-text strong { font-size: 18px; }
  .sm-look-placeholder-text span { font-size: 12px; opacity: 0.8; letter-spacing: 1px; }

  @keyframes sm-look-in {
    from { opacity: 0; transform: translate(-50%, 6px) scale(0.98); }
    to   { opacity: 1; transform: translate(-50%, 0) scale(1); }
  }

  /* Podium */
  .sm-podium {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 92%;
    height: 18%;
    pointer-events: none;
  }
  .sm-podium-top, .sm-podium-mid, .sm-podium-base {
    position: absolute;
    left: 50%; transform: translateX(-50%);
    border-radius: 50%;
  }
  .sm-podium-top {
    bottom: 56%;
    width: 56%;
    height: 14px;
    background: radial-gradient(ellipse at center, #ffd6f0, #c89cff);
    box-shadow: 0 0 24px rgba(255, 170, 230, 0.9), 0 0 50px rgba(190, 140, 255, 0.6);
  }
  .sm-podium-mid {
    bottom: 28%;
    width: 78%;
    height: 22px;
    background: radial-gradient(ellipse at center, rgba(255, 220, 240, 0.6), rgba(190, 140, 255, 0.35));
    filter: blur(2px);
  }
  .sm-podium-base {
    bottom: 0;
    width: 100%;
    height: 36px;
    background: radial-gradient(ellipse at center, rgba(255, 200, 230, 0.55), rgba(120, 80, 200, 0.0) 70%);
    filter: blur(4px);
  }

  /* --- Right gallery --- */
  .sm-tile-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }
  .sm-tile {
    display: flex; flex-direction: column; align-items: stretch;
    padding: 8px 8px 10px;
    background: rgba(255, 255, 255, 0.12);
    border: 1px solid rgba(255, 255, 255, 0.22);
    border-radius: 16px;
    transition: transform 0.18s ease, box-shadow 0.2s ease, border-color 0.2s ease;
    text-align: center;
  }
  .sm-tile:hover { transform: translateY(-2px); background: rgba(255,255,255,0.18); }
  .sm-tile.is-selected {
    border-color: rgba(255, 180, 230, 0.9);
    box-shadow:
      0 0 0 2px rgba(255, 150, 220, 0.55),
      0 0 22px rgba(255, 150, 220, 0.55),
      0 0 50px rgba(190, 140, 255, 0.5);
    background: rgba(255, 230, 245, 0.18);
  }
  .sm-tile-img-wrap {
    position: relative;
    aspect-ratio: 3 / 4;
    border-radius: 12px;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.18);
    display: grid; place-items: center;
  }
  .sm-tile-img-wrap img {
    width: 100%; height: 100%; object-fit: contain;
    filter: drop-shadow(0 4px 6px rgba(60, 20, 110, 0.25));
  }
  .sm-tile-placeholder {
    font-size: 11px; letter-spacing: 2px; opacity: 0.75; text-transform: uppercase;
  }
  .sm-tile-check {
    position: absolute; top: 6px; right: 6px;
    width: 22px; height: 22px;
    border-radius: 50%;
    background: linear-gradient(135deg, #ff6fb6, #b15bff);
    display: grid; place-items: center;
    box-shadow: 0 0 12px rgba(255, 120, 200, 0.9);
  }
  .sm-tile-name {
    margin-top: 6px;
    font-size: 12px;
    font-weight: 600;
    color: #fff;
    letter-spacing: 0.3px;
    text-shadow: 0 1px 2px rgba(60, 20, 110, 0.4);
  }

  /* --- Bottom action buttons --- */
  .sm-actions {
    position: relative; z-index: 2;
    margin-top: clamp(20px, 3vw, 36px);
    display: grid;
    grid-template-columns: 1fr 1.4fr 1fr;
    gap: clamp(14px, 2vw, 28px);
    align-items: center;
  }
  .sm-btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 10px;
    padding: 16px 22px;
    border-radius: 9999px;
    font-family: var(--font-display);
    font-weight: 800;
    letter-spacing: 2px;
    font-size: 16px;
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.35);
    background: linear-gradient(180deg, rgba(180, 150, 240, 0.5), rgba(120, 90, 200, 0.5));
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    box-shadow:
      0 0 20px rgba(190, 140, 255, 0.5),
      0 10px 30px rgba(60, 30, 110, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
    transition: transform 0.15s ease, box-shadow 0.2s ease, filter 0.2s ease;
    text-shadow: 0 1px 2px rgba(60, 20, 110, 0.4), 0 0 10px rgba(255, 200, 240, 0.6);
  }
  .sm-btn:hover { transform: translateY(-2px); filter: brightness(1.08); }
  .sm-btn:active { transform: translateY(0) scale(0.98); }
  .sm-btn--hero {
    padding: 20px 32px;
    font-size: 22px;
    letter-spacing: 4px;
    background:
      linear-gradient(180deg, rgba(255, 180, 220, 0.6), rgba(180, 110, 240, 0.55));
    border-color: rgba(255, 220, 240, 0.7);
    box-shadow:
      0 0 28px rgba(255, 150, 220, 0.7),
      0 0 60px rgba(190, 140, 255, 0.55),
      0 12px 36px rgba(60, 30, 110, 0.35),
      inset 0 1px 0 rgba(255, 255, 255, 0.4);
  }

  /* --- Responsive --- */
  @media (max-width: 980px) {
    .sm-grid {
      grid-template-columns: 1fr;
    }
    .sm-stage-wrap { order: -1; min-height: 480px; }
    .sm-actions { grid-template-columns: 1fr; }
    .sm-btn { width: 100%; }
  }

  @media (max-width: 600px) {
    .sm-title { font-size: 44px; }
    .sm-subtitle { font-size: 28px; }
    .sm-btn { font-size: 14px; padding: 14px 18px; letter-spacing: 1.5px; }
    .sm-btn--hero { font-size: 18px; padding: 16px 22px; letter-spacing: 3px; }
    .sm-tile-grid { grid-template-columns: repeat(2, 1fr); }
  }

  @media (prefers-reduced-motion: reduce) {
    .sm-look { animation: none !important; }
    .sm-skill-fill { transition: none !important; }
    .sm-btn { transition: none !important; }
  }
`;
