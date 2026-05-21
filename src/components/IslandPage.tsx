"use client";

import Image, { StaticImageData } from "next/image";
import { ReactNode, useEffect, useState } from "react";
import BackButton from "./BackButton";
import Hotspot from "./Hotspot";

/**
 * Full-bleed island page: the PNG is the entire viewport, with a single
 * pulsing hotspot on the monument that opens a Framer-style portal
 * popup (~92vh) when clicked. Esc and click-outside close the popup;
 * the back arrow returns to the Control Center.
 */
export default function IslandPage({
  background,
  hotspot,
  popupTitle,
  children,
}: {
  background: StaticImageData;
  hotspot: { x: number; y: number; label: string };
  popupTitle: string;
  /** popup content */
  children: (close: () => void) => ReactNode;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <main className="ip-shell" data-popup={open ? "true" : "false"}>
      <div className="ip-bg" aria-hidden>
        <Image
          src={background}
          alt=""
          placeholder="blur"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </div>

      <BackButton />

      <Hotspot
        x={hotspot.x}
        y={hotspot.y}
        label={hotspot.label}
        onClick={() => setOpen(true)}
      />

      {open && (
        <div
          className="ip-portal"
          role="dialog"
          aria-modal="true"
          aria-label={popupTitle}
          onClick={() => setOpen(false)}
        >
          <div className="ip-portal-card" onClick={(e) => e.stopPropagation()}>
            <button
              className="ip-portal-close"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
                <path
                  d="M5 5 15 15 M15 5 5 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            {children(() => setOpen(false))}
          </div>
        </div>
      )}

      <style jsx>{`
        .ip-shell {
          position: relative;
          width: 100%;
          min-height: 100vh;
          overflow: hidden;
          background: #1d1024;
        }
        .ip-bg {
          position: fixed;
          inset: 0;
          z-index: 0;
          transition: filter 0.45s ease, transform 0.45s ease;
        }
        .ip-shell[data-popup="true"] .ip-bg {
          filter: brightness(0.62) saturate(0.95) blur(6px);
          transform: scale(1.04);
        }

        .ip-portal {
          position: fixed;
          inset: 0;
          z-index: 30;
          background: rgba(15, 8, 32, 0.35);
          display: grid;
          place-items: center;
          padding: 4vh 4vw;
          animation: ip-fade 0.35s ease;
        }
        .ip-portal-card {
          position: relative;
          width: min(1280px, 100%);
          height: 92vh;
          max-height: 92vh;
          background: var(--canvas);
          color: var(--ink);
          border-radius: 24px;
          padding: clamp(28px, 4vw, 56px);
          overflow-y: auto;
          box-shadow: 0 32px 80px rgba(0, 0, 0, 0.45);
          animation: ip-pop 0.4s cubic-bezier(0.2, 0.9, 0.3, 1.05);
        }
        .ip-portal-close {
          position: absolute;
          top: 18px;
          right: 18px;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(29, 29, 31, 0.06);
          color: var(--ink);
          display: grid;
          place-items: center;
          transition: background 0.2s, transform 0.2s;
          z-index: 4;
        }
        .ip-portal-close:hover { background: rgba(29, 29, 31, 0.12); }
        .ip-portal-close:active { transform: scale(0.94); }

        @keyframes ip-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes ip-pop {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @media (max-width: 640px) {
          .ip-portal { padding: 2vh 2vw; }
          .ip-portal-card { height: 96vh; max-height: 96vh; border-radius: 16px; }
        }
      `}</style>
    </main>
  );
}
