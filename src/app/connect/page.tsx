"use client";

import { useState } from "react";
import connectBg from "../../../public/assets/connect-island.png";
import IslandPage from "@/components/IslandPage";
import PopupShell from "@/components/PopupShell";

type Channel = {
  key: string;
  icon: string;
  iconTint: string;
  label: string;
  value: string;
  blurb: string;
  href: string;
  external: boolean;
};

const CHANNELS: Channel[] = [
  {
    key: "linkedin",
    icon: "in",
    iconTint: "i-sky",
    label: "LinkedIn",
    value: "minjae-kim-",
    blurb: "Let's connect professionally and keep in touch.",
    href: "https://linkedin.com/in/minjae-kim-/",
    external: true,
  },
  {
    key: "email",
    icon: "✉",
    iconTint: "i-rose",
    label: "Email",
    value: "mik019@ucsd.edu",
    blurb: "Best for project inquiries and longer notes.",
    href: "mailto:mik019@ucsd.edu",
    external: false,
  },
  {
    key: "website",
    icon: "◆",
    iconTint: "i-mint",
    label: "Website",
    value: "minjaekim.info",
    blurb: "The full live portfolio and latest work.",
    href: "https://www.minjaekim.info",
    external: true,
  },
  {
    key: "resume",
    icon: "▤",
    iconTint: "i-lemon",
    label: "Resume",
    value: "Download PDF",
    blurb: "A one-page summary of experience and skills.",
    href: "https://www.minjaekim.info",
    external: true,
  },
];

export default function ConnectPage() {
  return (
    <IslandPage
      background={connectBg}
      hotspot={{ x: 45, y: 35, label: "Open the lighthouse" }}
      popupLabel="Connect"
    >
      {(close) => <ConnectPopup close={close} />}
    </IslandPage>
  );
}

function ConnectPopup({ close }: { close: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [confirming, setConfirming] = useState<Channel | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Hello from ${name || "your portfolio"}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:mik019@ucsd.edu?subject=${subject}&body=${body}`;
  };

  const go = (c: Channel) => {
    if (c.external) window.open(c.href, "_blank", "noopener");
    else window.location.href = c.href;
    setConfirming(null);
  };

  return (
    <PopupShell eyebrow="Say Hello" title="Let's Connect" onClose={close}>
      <div className="cn-wrap">
        <form className="cn-form" onSubmit={onSubmit}>
          <div className="cn-field">
            <label>Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required />
          </div>
          <div className="cn-field">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" required />
          </div>
          <div className="cn-field">
            <label>Message</label>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Say hi…" required />
          </div>
          <button className="btn btn-primary" type="submit">Send message ✦</button>
          <p className="t-fine" style={{ color: "var(--ink-soft)", marginTop: 2 }}>
            Opens in your default mail app.
          </p>
        </form>

        <div className="cn-channels">
          {CHANNELS.map((c) => (
            <button key={c.key} className="cn-channel" onClick={() => setConfirming(c)}>
              <span className={`cn-ico ${c.iconTint}`}>{c.icon}</span>
              <span className="cn-meta">
                <b>{c.label}</b>
                <span>{c.value}</span>
              </span>
            </button>
          ))}
          <p className="t-fine" style={{ color: "var(--ink-soft)", marginTop: 4 }}>
            Los Angeles, CA
          </p>
        </div>
      </div>

      {/* small confirm card before opening a link */}
      {confirming && (
        <div className="cn-confirm-overlay" onClick={() => setConfirming(null)}>
          <div className="cn-confirm" onClick={(e) => e.stopPropagation()}>
            <span className={`cn-ico ${confirming.iconTint}`} style={{ width: 48, height: 48, fontSize: 20 }}>
              {confirming.icon}
            </span>
            <h4>{confirming.label}</h4>
            <p>{confirming.blurb}</p>
            <div className="cn-confirm-value">{confirming.value}</div>
            <div className="cn-confirm-actions">
              <button className="btn btn-primary" onClick={() => go(confirming)}>
                {confirming.external ? "Open ↗" : "Continue →"}
              </button>
              <button className="btn btn-secondary" onClick={() => setConfirming(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .cn-wrap {
          display: grid;
          grid-template-columns: 1.2fr 0.9fr;
          gap: 32px;
          align-items: start;
        }
        @media (max-width: 720px) {
          .cn-wrap { grid-template-columns: 1fr; gap: 24px; }
        }
        .cn-form { display: flex; flex-direction: column; gap: 14px; }
        .cn-field { display: flex; flex-direction: column; gap: 6px; }
        .cn-field label {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: var(--ink-soft);
        }
        .cn-field input,
        .cn-field textarea {
          width: 100%;
          border: 2px solid rgba(255, 255, 255, 0.95);
          background: rgba(255, 255, 255, 0.65);
          border-radius: 14px;
          padding: 12px 15px;
          font-family: var(--font-text);
          font-weight: 500;
          font-size: 14px;
          color: var(--ink);
          transition: border 0.15s;
        }
        .cn-field textarea { resize: none; height: 98px; }
        .cn-field input:focus,
        .cn-field textarea:focus { outline: none; border-color: var(--accent); }
        .cn-form .btn { align-self: flex-start; margin-top: 4px; }

        .cn-channels { display: flex; flex-direction: column; gap: 11px; }
        .cn-channel {
          display: flex;
          align-items: center;
          gap: 13px;
          padding: 13px 16px;
          background: rgba(255, 255, 255, 0.6);
          border: 2px solid rgba(255, 255, 255, 0.8);
          border-radius: 16px;
          text-align: left;
          transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.4, 1), background 0.2s;
        }
        .cn-channel:hover { transform: translateX(5px) rotate(-1deg); background: #fff; }
        .cn-ico {
          width: 36px;
          height: 36px;
          border-radius: 11px;
          display: grid;
          place-items: center;
          font-size: 15px;
          font-weight: 700;
          flex: none;
          color: var(--ink);
        }
        .i-sky { background: var(--sky); }
        .i-rose { background: var(--accent-soft); }
        .i-mint { background: var(--mint); }
        .i-lemon { background: var(--lemon); }
        .cn-meta b { display: block; font-size: 14px; font-family: var(--font-display); }
        .cn-meta span { font-size: 12px; color: var(--ink-soft); }

        .cn-confirm-overlay {
          position: absolute;
          inset: 0;
          z-index: 8;
          display: grid;
          place-items: center;
          background: rgba(63, 52, 73, 0.28);
          backdrop-filter: blur(4px);
          border-radius: var(--radius);
          animation: cn-fade 0.22s ease;
        }
        @keyframes cn-fade { from { opacity: 0; } to { opacity: 1; } }
        .cn-confirm {
          width: min(330px, 86%);
          background: rgba(255, 255, 255, 0.92);
          border: 2px solid #fff;
          border-radius: 24px;
          padding: 26px 24px;
          text-align: center;
          box-shadow: 0 24px 60px rgba(150, 90, 130, 0.34);
          animation: cn-pop 0.4s cubic-bezier(0.34, 1.56, 0.4, 1) both;
        }
        @keyframes cn-pop { from { opacity: 0; transform: translateY(14px) scale(0.94); } to { opacity: 1; transform: none; } }
        .cn-confirm .cn-ico { margin: 0 auto 12px; }
        .cn-confirm h4 { font-family: var(--font-display); font-weight: 600; font-size: 22px; margin-bottom: 6px; }
        .cn-confirm p { font-size: 13.5px; color: var(--ink-body); line-height: 1.5; margin-bottom: 10px; }
        .cn-confirm-value {
          font-size: 13px;
          font-weight: 600;
          color: var(--accent-deep);
          background: var(--accent-soft);
          border-radius: 999px;
          padding: 6px 14px;
          display: inline-block;
          margin-bottom: 18px;
        }
        .cn-confirm-actions { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }
      `}</style>
    </PopupShell>
  );
}
