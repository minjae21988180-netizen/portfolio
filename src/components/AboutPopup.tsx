"use client";

import { useEffect } from "react";

export default function AboutPopup({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div
        className="popup-card"
        role="dialog"
        aria-modal="true"
        aria-label="About"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="popup-close" onClick={onClose} aria-label="Close">×</button>

        <div className="t-tagline" style={{ color: "var(--primary)" }}>Hello</div>
        <h2 className="h-display-lg" style={{ marginTop: 6, marginBottom: 16 }}>
          I&rsquo;m a designer based in California.
        </h2>
        <p className="t-lead" style={{ color: "var(--ink-muted-80)", maxWidth: 720 }}>
          I make interfaces that feel calm, decisive, and a little bit playful — the kind you don&rsquo;t notice
          until you need them, and then they&rsquo;re exactly where you left them.
        </p>

        <div className="about-grid">
          <div>
            <h3 className="h-display-md">Skills</h3>
            <ul className="about-list">
              <li>Product design (web, iOS, macOS)</li>
              <li>Interaction & motion</li>
              <li>Design systems</li>
              <li>Brand & visual identity</li>
              <li>Prototyping in code (SwiftUI, React)</li>
              <li>Workshops & facilitation</li>
            </ul>
          </div>
          <div>
            <h3 className="h-display-md">Values</h3>
            <ul className="about-list">
              <li>Quiet UI, loud product</li>
              <li>Ship the smallest honest version</li>
              <li>Words first, pixels second</li>
              <li>Respect the reader, the user, and the team</li>
            </ul>
          </div>
          <div>
            <h3 className="h-display-md">Outside work</h3>
            <ul className="about-list">
              <li>EDM nights, Fred Again forever</li>
              <li>SoulCycle &amp; long yoga mornings</li>
              <li>Sunlight, the closer the window the better</li>
              <li>Coffee shops with two chairs and a window</li>
            </ul>
          </div>
        </div>

        <div className="quote">
          <span className="t-lead-airy">
            &ldquo;The best portfolios are not catalogues — they&rsquo;re invitations.&rdquo;
          </span>
        </div>

        <style jsx>{`
          .about-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 36px;
            margin-top: 40px;
            padding-top: 32px;
            border-top: 1px solid var(--hairline);
          }
          .about-list {
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-top: 14px;
          }
          .about-list li {
            font-size: 17px;
            line-height: 1.47;
            letter-spacing: -0.374px;
            color: var(--ink-muted-80);
            padding-left: 18px;
            position: relative;
          }
          .about-list li::before {
            content: "";
            position: absolute;
            left: 0;
            top: 11px;
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: var(--primary);
          }
          .quote {
            margin-top: 40px;
            padding: 32px;
            background: var(--canvas-parchment);
            border-radius: var(--r-lg);
            border-left: 3px solid var(--primary);
          }
        `}</style>
      </div>
    </div>
  );
}
