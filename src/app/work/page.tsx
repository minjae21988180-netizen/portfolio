"use client";

import workBg from "../../../public/assets/work-island.png";
import IslandPage from "@/components/IslandPage";
import { caseStudies, type CaseStudy } from "@/data/caseStudies";
import { useState } from "react";

export default function WorkPage() {
  return (
    <IslandPage
      background={workBg}
      hotspot={{ x: 50, y: 35, label: "Open the case studies" }}
      popupTitle="Case studies"
    >
      {() => <WorkPopupContent />}
    </IslandPage>
  );
}

function WorkPopupContent() {
  const [selected, setSelected] = useState<CaseStudy | null>(null);

  if (selected) {
    return (
      <div>
        <button className="back-link" onClick={() => setSelected(null)}>
          <span aria-hidden>←</span> All case studies
        </button>
        <div className="t-tagline" style={{ color: "var(--primary)", marginTop: 16 }}>
          {selected.category} · {selected.year}
        </div>
        <h2 className="h-display-lg" style={{ marginTop: 6, marginBottom: 16 }}>
          {selected.title}
        </h2>
        <p className="t-lead" style={{ color: "var(--ink-muted-80)", maxWidth: 720 }}>
          {selected.summary}
        </p>

        <div className="cs-meta">
          <Meta label="Role" value={selected.role} />
          <Meta label="Tools" value={selected.tools.join(", ")} />
          <Meta label="Year" value={selected.year} />
        </div>

        <h3 className="h-display-md" style={{ marginTop: 32, marginBottom: 12 }}>Highlights</h3>
        <ul className="cs-highlights">
          {selected.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>

        <div style={{ marginTop: 32, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button className="btn btn-primary" onClick={() => setSelected(null)}>
            Back to gallery
          </button>
          <a className="btn btn-secondary" href="mailto:hello@example.com">
            Ask about this project
          </a>
        </div>

        <style jsx>{`
          .back-link {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            color: var(--primary);
            font-size: 14px;
            letter-spacing: -0.224px;
            padding: 0;
          }
          .back-link:hover { text-decoration: underline; text-underline-offset: 3px; }
          .cs-meta {
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
          .cs-highlights :global(li) {
            padding-left: 22px;
            position: relative;
            font-size: 17px;
            line-height: 1.47;
            letter-spacing: -0.374px;
          }
          .cs-highlights :global(li)::before {
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

  return (
    <div>
      <div className="t-tagline" style={{ color: "var(--primary)" }}>Case studies</div>
      <h2 className="h-display-lg" style={{ marginTop: 6, marginBottom: 10 }}>
        Seven projects, picked for what they taught me.
      </h2>
      <p className="t-body" style={{ color: "var(--ink-muted-80)", maxWidth: 700, marginBottom: 32 }}>
        A mix of shipped work, side projects, and the rare brief that still keeps me up at night.
      </p>

      <div className="cs-grid">
        {caseStudies.map((cs) => (
          <button key={cs.slug} className="cs-card" onClick={() => setSelected(cs)}>
            <div className="cs-thumb" data-slug={cs.slug} />
            <div className="cs-cat">{cs.category} · {cs.year}</div>
            <div className="cs-title">{cs.title}</div>
            <div className="cs-summary">{cs.summary}</div>
            <span className="cs-link">Read case study →</span>
          </button>
        ))}
      </div>

      <style jsx>{`
        .cs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 22px;
        }
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
          cursor: pointer;
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
          font-size: 26px;
          font-weight: 600;
          letter-spacing: 0.4em;
          color: var(--ink-muted-48);
        }
        .cs-cat {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.4px;
          text-transform: uppercase;
          color: var(--ink-muted-48);
        }
        .cs-title {
          font-size: 17px;
          font-weight: 600;
          letter-spacing: -0.374px;
          color: var(--ink);
        }
        .cs-summary {
          font-size: 15px;
          line-height: 1.47;
          color: var(--ink-muted-80);
        }
        .cs-link {
          color: var(--primary);
          font-size: 14px;
          letter-spacing: -0.224px;
          margin-top: 6px;
        }
      `}</style>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.4, color: "var(--ink-muted-48)" }}>
        {label}
      </div>
      <div style={{ marginTop: 4, fontSize: 17, fontWeight: 600, letterSpacing: -0.374 }}>
        {value}
      </div>
    </div>
  );
}
