"use client";

import connectBg from "../../../public/assets/connect-island.png";
import IslandPage from "@/components/IslandPage";
import { useState } from "react";

export default function ConnectPage() {
  return (
    <IslandPage
      background={connectBg}
      hotspot={{ x: 45, y: 35, label: "Send a signal" }}
      popupTitle="Contact"
    >
      {(close) => <ConnectPopup close={close} />}
    </IslandPage>
  );
}

function ConnectPopup({ close }: { close: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Hello from ${name || "the control center"}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:hello@example.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <div>
      <div className="t-tagline" style={{ color: "var(--primary)" }}>Connect</div>
      <h2 className="h-display-lg" style={{ marginTop: 6, marginBottom: 16 }}>
        Let&rsquo;s sit down and chat.
      </h2>
      <p className="t-lead" style={{ color: "var(--ink-muted-80)", maxWidth: 700 }}>
        Pick a channel, or drop a note in the form. Replies usually within a couple of days.
      </p>

      <div className="cn-grid">
        <div className="cn-tiles">
          <a className="cn-tile" href="https://linkedin.com/in/yourname" target="_blank" rel="noopener">
            <div className="cn-icon">in</div>
            <div>
              <div className="cn-tile-label">LinkedIn</div>
              <div className="cn-tile-value">/in/yourname</div>
            </div>
            <span className="cn-arrow">↗</span>
          </a>
          <a className="cn-tile" href="/resume.pdf" download>
            <div className="cn-icon">PDF</div>
            <div>
              <div className="cn-tile-label">Resume</div>
              <div className="cn-tile-value">One page. Updated quarterly.</div>
            </div>
            <span className="cn-arrow">↓</span>
          </a>
          <a className="cn-tile" href="mailto:hello@example.com">
            <div className="cn-icon" aria-hidden>
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path d="M2 4h14v10H2z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M2 5l7 5 7-5" fill="none" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </div>
            <div>
              <div className="cn-tile-label">Email</div>
              <div className="cn-tile-value">hello@example.com</div>
            </div>
            <span className="cn-arrow">→</span>
          </a>
          <a className="cn-tile" href="tel:+15555550100">
            <div className="cn-icon" aria-hidden>
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path d="M4 2.5h3l1.5 4-2 1.5a9 9 0 0 0 3.5 3.5l1.5-2 4 1.5v3a1.5 1.5 0 0 1-1.5 1.5C7.5 15.5 2.5 10.5 2.5 4A1.5 1.5 0 0 1 4 2.5z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <div className="cn-tile-label">Phone</div>
              <div className="cn-tile-value">+1 (555) 555-0100</div>
            </div>
            <span className="cn-arrow">→</span>
          </a>
        </div>

        <form className="cn-form" onSubmit={onSubmit}>
          <label className="cn-field">
            <span className="cn-field-label">Your name</span>
            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" />
          </label>
          <label className="cn-field">
            <span className="cn-field-label">Email</span>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@somewhere.com" />
          </label>
          <label className="cn-field">
            <span className="cn-field-label">Note</span>
            <textarea required rows={5} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="What are you working on? Or just say hi." />
          </label>
          <div className="cn-actions">
            <button className="btn btn-primary" type="submit">
              {sent ? "Sent ✓" : "Send message"}
            </button>
            <button className="btn btn-secondary" type="button" onClick={close}>
              Cancel
            </button>
          </div>
          <p className="t-fine" style={{ color: "var(--ink-muted-48)", marginTop: 4 }}>
            Opens in your default mail app.
          </p>
        </form>
      </div>

      <style jsx>{`
        .cn-grid {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 36px;
          margin-top: 36px;
          padding-top: 32px;
          border-top: 1px solid var(--hairline);
          align-items: start;
        }
        @media (max-width: 820px) {
          .cn-grid { grid-template-columns: 1fr; gap: 28px; }
        }

        .cn-tiles {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }
        .cn-tile {
          display: grid;
          grid-template-columns: 56px 1fr auto;
          align-items: center;
          gap: 16px;
          padding: 16px 20px;
          background: var(--canvas);
          border: 1px solid var(--hairline);
          border-radius: var(--r-lg);
          color: var(--ink);
          text-decoration: none;
          transition: border-color 0.18s, transform 0.18s, background 0.18s;
        }
        .cn-tile:hover {
          border-color: var(--primary);
          background: rgba(0, 102, 204, 0.04);
          text-decoration: none;
        }
        .cn-tile:active { transform: scale(0.99); }
        .cn-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: linear-gradient(135deg, rgba(0, 102, 204, 0.12), rgba(0, 102, 204, 0.04));
          color: var(--primary);
          display: grid;
          place-items: center;
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.5px;
        }
        .cn-tile-label {
          font-family: var(--font-text);
          font-size: 17px;
          font-weight: 600;
          letter-spacing: -0.374px;
          color: var(--ink);
        }
        .cn-tile-value {
          font-size: 13px;
          letter-spacing: -0.224px;
          color: var(--ink-muted-80);
          margin-top: 2px;
        }
        .cn-arrow {
          color: var(--primary);
          font-size: 18px;
        }

        .cn-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
          background: var(--canvas-parchment);
          padding: 24px;
          border-radius: var(--r-lg);
        }
        .cn-field { display: flex; flex-direction: column; gap: 6px; }
        .cn-field-label {
          font-size: 14px;
          font-weight: 600;
          letter-spacing: -0.224px;
        }
        .cn-field input,
        .cn-field textarea {
          font-family: var(--font-text);
          font-size: 17px;
          color: var(--ink);
          background: var(--canvas);
          border: 1px solid var(--hairline);
          border-radius: var(--r-md);
          padding: 12px 16px;
          line-height: 1.47;
          letter-spacing: -0.374px;
          transition: border-color 0.18s, box-shadow 0.18s;
          resize: vertical;
        }
        .cn-field input:focus,
        .cn-field textarea:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.18);
        }
        .cn-actions { display: flex; gap: 10px; flex-wrap: wrap; }
      `}</style>
    </div>
  );
}
