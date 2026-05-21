"use client";

import Link from "next/link";

export default function BackButton({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="back-btn" aria-label="Back to Control Center">
      <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
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
        .back-btn {
          position: fixed;
          top: 22px;
          left: 22px;
          z-index: 20;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px 10px 12px;
          background: rgba(255, 255, 255, 0.78);
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
          transition: transform 0.18s ease, background 0.2s;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }
        .back-btn:hover { background: rgba(255, 255, 255, 0.95); text-decoration: none; }
        .back-btn:active { transform: scale(0.96); }
        .back-btn svg { display: block; }

        @media (max-width: 480px) {
          .back-btn { top: 14px; left: 14px; padding: 8px 14px 8px 10px; font-size: 12px; }
          .back-btn span { display: none; }
        }
      `}</style>
    </Link>
  );
}
