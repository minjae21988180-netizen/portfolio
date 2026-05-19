"use client";

import { useEffect, useState } from "react";
import { caseStudies, type CaseStudy } from "@/data/caseStudies";

export default function CaseStudyGallery({ onClose }: { onClose: () => void }) {
  const [selected, setSelected] = useState<CaseStudy | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (selected) setSelected(null);
        else onClose();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected, onClose]);

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div
        className="popup-card popup-parchment"
        role="dialog"
        aria-modal="true"
        aria-label="Case studies"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="popup-close" onClick={onClose} aria-label="Close">×</button>

        <div className="t-tagline" style={{ color: "var(--primary)" }}>Case studies</div>
        <h2 className="h-display-lg" style={{ marginTop: 6, marginBottom: 10 }}>
          Seven projects, picked for what they taught me.
        </h2>
        <p className="t-body" style={{ color: "var(--ink-muted-80)", maxWidth: 700, marginBottom: 32 }}>
          A mix of shipped work, side projects, and the rare brief that still keeps me up at night.
        </p>

        <div className="card-grid">
          {caseStudies.map((cs) => (
            <button
              key={cs.slug}
              className="cs-card"
              onClick={() => setSelected(cs)}
            >
              <div className="cs-thumb" data-slug={cs.slug} aria-hidden />
              <div className="t-caption-strong" style={{ color: "var(--ink-muted-48)", textTransform: "uppercase", letterSpacing: 0.4 }}>
                {cs.category} · {cs.year}
              </div>
              <div className="t-body-strong">{cs.title}</div>
              <div className="t-body" style={{ color: "var(--ink-muted-80)" }}>{cs.summary}</div>
              <span className="cs-link">Read case study →</span>
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <div className="cs-detail" onClick={() => setSelected(null)}>
          <div className="cs-detail-card" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close" onClick={() => setSelected(null)} aria-label="Close">×</button>
            <div className="t-tagline" style={{ color: "var(--primary)" }}>{selected.category} · {selected.year}</div>
            <h3 className="h-display-lg" style={{ marginTop: 6, marginBottom: 16 }}>{selected.title}</h3>
            <p className="t-lead" style={{ color: "var(--ink-muted-80)", maxWidth: 720 }}>{selected.summary}</p>

            <div className="cs-detail-meta">
              <div>
                <div className="t-caption-strong" style={{ color: "var(--ink-muted-48)", textTransform: "uppercase" }}>Role</div>
                <div className="t-body-strong" style={{ marginTop: 4 }}>{selected.role}</div>
              </div>
              <div>
                <div className="t-caption-strong" style={{ color: "var(--ink-muted-48)", textTransform: "uppercase" }}>Tools</div>
                <div className="t-body-strong" style={{ marginTop: 4 }}>{selected.tools.join(", ")}</div>
              </div>
              <div>
                <div className="t-caption-strong" style={{ color: "var(--ink-muted-48)", textTransform: "uppercase" }}>Year</div>
                <div className="t-body-strong" style={{ marginTop: 4 }}>{selected.year}</div>
              </div>
            </div>

            <h4 className="h-display-md" style={{ marginTop: 32, marginBottom: 12 }}>Highlights</h4>
            <ul className="cs-highlights">
              {selected.highlights.map((h) => (
                <li key={h} className="t-body">{h}</li>
              ))}
            </ul>

            <div style={{ marginTop: 32, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button className="btn btn-primary" onClick={() => setSelected(null)}>Back to gallery</button>
              <a href="mailto:hello@example.com" className="btn btn-secondary">Ask about this project</a>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .cs-card {
          text-align: left;
          background: var(--canvas);
          border: 1px solid var(--hairline);
          border-radius: var(--r-lg);
          padding: var(--space-lg);
          display: flex;
          flex-direction: column;
          gap: 8px;
          transition: border-color 0.2s, transform 0.18s;
        }
        .cs-card:hover { border-color: var(--ink-muted-48); }
        .cs-card:active { transform: scale(0.99); }
        .cs-thumb {
          aspect-ratio: 4 / 3;
          border-radius: var(--r-sm);
          margin-bottom: 8px;
          background: linear-gradient(135deg, #f5f5f7, #e8e8ee);
          position: relative;
          overflow: hidden;
        }
        .cs-thumb::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 30% 30%, rgba(0, 102, 204, 0.12), transparent 60%);
        }
        .cs-thumb[data-slug="atlas"]::after { content: "ATLAS"; }
        .cs-thumb[data-slug="ember"]::after { content: "EMBER"; }
        .cs-thumb[data-slug="sundial"]::after { content: "SUNDIAL"; }
        .cs-thumb[data-slug="north"]::after { content: "NORTH"; }
        .cs-thumb[data-slug="verse"]::after { content: "VERSE"; }
        .cs-thumb[data-slug="loop"]::after { content: "LOOP"; }
        .cs-thumb[data-slug="echo"]::after { content: "ECHO"; }
        .cs-thumb::after {
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
          font-family: var(--font-display);
          font-size: 28px;
          font-weight: 600;
          letter-spacing: 0.4em;
          color: var(--ink-muted-48);
        }
        .cs-link {
          color: var(--primary);
          font-size: 14px;
          letter-spacing: -0.224px;
          margin-top: 6px;
        }

        .cs-detail {
          position: fixed;
          inset: 0;
          z-index: 90;
          background: rgba(29, 29, 31, 0.55);
          backdrop-filter: saturate(180%) blur(14px);
          -webkit-backdrop-filter: saturate(180%) blur(14px);
          display: grid;
          place-items: start center;
          padding: 6vh 4vw;
          overflow-y: auto;
          animation: fadeIn 0.25s ease;
        }
        .cs-detail-card {
          position: relative;
          width: min(900px, 100%);
          background: var(--canvas);
          color: var(--ink);
          padding: clamp(28px, 4vw, 56px);
          border-radius: var(--r-lg);
          animation: popIn 0.3s ease;
        }
        .cs-detail-meta {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 20px;
          margin-top: 28px;
          padding-top: 24px;
          border-top: 1px solid var(--hairline);
        }
        .cs-highlights {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .cs-highlights li {
          padding-left: 22px;
          position: relative;
        }
        .cs-highlights li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 11px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--primary);
        }
      `}</style>
    </div>
  );
}
