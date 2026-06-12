"use client";

import { ReactNode } from "react";

/**
 * Shared frosted-glass popup shell (Me / Work / Connect).
 * Playful frame, calm content — candy glow ring, springy pop-in,
 * drifting sparkles, ✦ eyebrow + serif title on a rose highlighter swipe,
 * round close button that spins 90° on hover. Optional tab row + body flex.
 */
export default function PopupShell({
  eyebrow,
  title,
  tabs,
  activeTab,
  onTab,
  onClose,
  flush = false,
  children,
}: {
  eyebrow: string;
  title: string;
  tabs?: string[];
  activeTab?: string;
  onTab?: (tab: string) => void;
  onClose: () => void;
  /** remove body padding when content brings its own chrome (case study) */
  flush?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="shell-overlay" role="dialog" aria-modal="true" aria-label={title} onClick={onClose}>
      <div className="shell-panel" onClick={(e) => e.stopPropagation()}>
        <span className="shell-spark" style={{ top: "16%", right: "8%" }}>✦</span>
        <span className="shell-spark" style={{ bottom: "13%", left: "5%", animationDelay: "2s" }}>✧</span>

        {!flush && (
          <>
            <div className="shell-head">
              <div>
                <div className="shell-eyebrow">{eyebrow}</div>
                <div className="shell-title">{title}</div>
              </div>
              <button className="shell-close" onClick={onClose} aria-label="Close">✕</button>
            </div>

            {tabs && tabs.length > 0 && (
              <div className="shell-tabs">
                {tabs.map((t) => (
                  <button
                    key={t}
                    className={`shell-tab ${t === activeTab ? "active" : ""}`}
                    onClick={() => onTab?.(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}
          </>
        )}

        <div className={`shell-body ${flush ? "flush" : ""}`}>{children}</div>

        {flush && (
          <button
            className="shell-close"
            onClick={onClose}
            aria-label="Close"
            style={{ position: "absolute", top: 16, right: 18, zIndex: 6 }}
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
