"use client";

import { useState } from "react";
import workBg from "../../../public/assets/work-island.png";
import IslandPage from "@/components/IslandPage";
import PopupShell from "@/components/PopupShell";
import CaseStudyDetail from "@/components/CaseStudyDetail";
import { caseStudies, PRISMS, type CaseStudy, type Prism } from "@/data/caseStudies";

const TABS = ["All", ...PRISMS.map((p) => p.label)];
const LABEL_TO_PRISM: Record<string, Prism> = Object.fromEntries(
  PRISMS.map((p) => [p.label, p.key])
);

export default function WorkPage() {
  return (
    <IslandPage
      background={workBg}
      hotspot={{ x: 50, y: 35, label: "Open the lightbulb" }}
      popupLabel="Selected work"
    >
      {(close) => <WorkPopup close={close} />}
    </IslandPage>
  );
}

function WorkPopup({ close }: { close: () => void }) {
  const [tab, setTab] = useState("All");
  const [selected, setSelected] = useState<CaseStudy | null>(null);

  // Case study replaces the grid in-place inside the same popup.
  if (selected) {
    return (
      <PopupShell eyebrow="" title={selected.title} onClose={close} flush>
        <CaseStudyDetail study={selected} onBack={() => setSelected(null)} />
      </PopupShell>
    );
  }

  const visible =
    tab === "All"
      ? caseStudies
      : caseStudies.filter((c) => c.prism === LABEL_TO_PRISM[tab]);

  const personalActive = tab === "Personal Project";

  return (
    <PopupShell
      eyebrow="Selected Work"
      title="Projects"
      tabs={TABS}
      activeTab={tab}
      onTab={setTab}
      onClose={close}
    >
      <div className="wk-grid">
        {visible.map((c) => (
          <button key={c.slug} className="wk-card" onClick={() => setSelected(c)}>
            <div className={`wk-thumb ${c.tint}`}>{c.title.toUpperCase()}</div>
            <div className="wk-body">
              <h4>{c.title}</h4>
              <div className="wk-teaser">{c.teaser}</div>
              <div className="wk-chips">
                {c.tags.slice(0, 3).map((t) => (
                  <span className="chip" key={t}>{t}</span>
                ))}
              </div>
            </div>
          </button>
        ))}
        {personalActive && visible.length === 0 && (
          <div className="wk-soon">
            <div className="wk-soon-mark">✦</div>
            <h4>Personal Project</h4>
            <p>Coming soon — a self-directed project currently in the works.</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .wk-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        @media (max-width: 680px) {
          .wk-grid { grid-template-columns: 1fr; }
        }
        .wk-card {
          text-align: left;
          background: rgba(255, 255, 255, 0.62);
          border: 2px solid rgba(255, 255, 255, 0.8);
          border-radius: 22px;
          overflow: hidden;
          transition: transform 0.22s cubic-bezier(0.34, 1.56, 0.4, 1), box-shadow 0.22s;
        }
        .wk-card:hover {
          transform: translateY(-6px) rotate(-1deg);
          box-shadow: 0 18px 36px rgba(150, 90, 130, 0.26);
        }
        .wk-thumb {
          height: 130px;
          display: grid;
          place-items: center;
          font-family: var(--font-display);
          font-size: 14px;
          letter-spacing: 0.1em;
          color: rgba(90, 70, 90, 0.7);
          text-align: center;
          padding: 0 12px;
        }
        .t-prod { background: linear-gradient(135deg, #cfe3f7, #e3d4f2); }
        .t-res { background: linear-gradient(135deg, #e3d4f2, #f9c0d6); }
        .t-web { background: linear-gradient(135deg, #bfe6d4, #cfe3f7); }
        .t-brand { background: linear-gradient(135deg, #fbe9b0, #f9c0d6); }
        .wk-body { padding: 15px 17px 19px; }
        .wk-body h4 {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 19px;
          margin-bottom: 6px;
          color: var(--ink);
        }
        .wk-teaser {
          font-size: 13px;
          color: var(--ink-soft);
          line-height: 1.5;
          margin-bottom: 11px;
        }
        .wk-chips { display: flex; gap: 6px; flex-wrap: wrap; }
        .wk-soon {
          grid-column: 1 / -1;
          text-align: center;
          padding: 48px 24px;
          background: rgba(255, 255, 255, 0.45);
          border: 2px dashed rgba(255, 255, 255, 0.85);
          border-radius: 22px;
        }
        .wk-soon-mark { font-size: 28px; color: var(--accent); margin-bottom: 8px; }
        .wk-soon h4 { font-family: var(--font-display); font-weight: 600; font-size: 22px; margin-bottom: 6px; }
        .wk-soon p { font-size: 14px; color: var(--ink-soft); }
      `}</style>
    </PopupShell>
  );
}
