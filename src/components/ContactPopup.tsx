"use client";

import { useEffect, useState } from "react";

export default function ContactPopup({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Hello from ${name || "the control center"}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:hello@example.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div
        className="popup-card"
        role="dialog"
        aria-modal="true"
        aria-label="Contact"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="popup-close" onClick={onClose} aria-label="Close">×</button>

        <div className="t-tagline" style={{ color: "var(--primary)" }}>Connect</div>
        <h2 className="h-display-lg" style={{ marginTop: 6, marginBottom: 16 }}>
          Let&rsquo;s sit down and chat.
        </h2>
        <p className="t-lead" style={{ color: "var(--ink-muted-80)", maxWidth: 700 }}>
          Two-chair café energy. Send a note, drop a link, or grab the resume — whichever feels right.
        </p>

        <div className="contact-grid">
          <form className="contact-form" onSubmit={onSubmit}>
            <label className="field">
              <span className="t-caption-strong">Your name</span>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
              />
            </label>
            <label className="field">
              <span className="t-caption-strong">Email</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@somewhere.com"
              />
            </label>
            <label className="field">
              <span className="t-caption-strong">Note</span>
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What are you working on? Or just say hi."
              />
            </label>
            <button className="btn btn-primary" type="submit">
              {sent ? "Sent ✓" : "Send message"}
            </button>
            <p className="t-fine" style={{ color: "var(--ink-muted-48)", marginTop: 4 }}>
              Opens in your default mail app.
            </p>
          </form>

          <aside className="contact-aside">
            <div className="utility-card">
              <h3 className="t-body-strong">Resume</h3>
              <p className="t-caption" style={{ color: "var(--ink-muted-80)" }}>
                One page. Updated quarterly.
              </p>
              <a href="/resume.pdf" download className="btn btn-primary" style={{ marginTop: 12 }}>
                Download PDF
              </a>
            </div>

            <div className="utility-card">
              <h3 className="t-body-strong">Find me elsewhere</h3>
              <ul className="socials">
                <li><a href="https://linkedin.com" target="_blank" rel="noopener">LinkedIn ↗</a></li>
                <li><a href="https://github.com" target="_blank" rel="noopener">GitHub ↗</a></li>
                <li><a href="https://twitter.com" target="_blank" rel="noopener">Twitter / X ↗</a></li>
                <li><a href="https://dribbble.com" target="_blank" rel="noopener">Dribbble ↗</a></li>
                <li><a href="mailto:hello@example.com">hello@example.com</a></li>
              </ul>
            </div>

            <div className="utility-card cafe-card">
              <div className="t-caption-strong" style={{ color: "var(--ink-muted-48)", textTransform: "uppercase", letterSpacing: 0.4 }}>
                In person
              </div>
              <p className="t-body" style={{ marginTop: 6 }}>
                Based in California. Always up for a coffee in SF, LA, or Oakland.
              </p>
            </div>
          </aside>
        </div>

        <style jsx>{`
          .contact-grid {
            display: grid;
            grid-template-columns: 1.4fr 1fr;
            gap: 32px;
            margin-top: 32px;
            padding-top: 32px;
            border-top: 1px solid var(--hairline);
          }
          @media (max-width: 720px) {
            .contact-grid { grid-template-columns: 1fr; }
          }
          .contact-form {
            display: flex;
            flex-direction: column;
            gap: 16px;
          }
          .field {
            display: flex;
            flex-direction: column;
            gap: 6px;
          }
          .field input,
          .field textarea {
            font-family: var(--font-text);
            font-size: 17px;
            color: var(--ink);
            background: var(--canvas);
            border: 1px solid var(--hairline);
            border-radius: var(--r-md);
            padding: 12px 16px;
            line-height: 1.47;
            letter-spacing: -0.374px;
            transition: border-color 0.2s, box-shadow 0.2s;
            resize: vertical;
          }
          .field input:focus,
          .field textarea:focus {
            outline: none;
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.18);
          }
          .contact-aside {
            display: flex;
            flex-direction: column;
            gap: 16px;
          }
          .utility-card {
            background: var(--canvas);
            border: 1px solid var(--hairline);
            border-radius: var(--r-lg);
            padding: 22px;
          }
          .cafe-card {
            background: var(--canvas-parchment);
          }
          .socials {
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 4px;
            margin-top: 12px;
          }
          .socials li {
            line-height: 2.4;
            font-size: 17px;
          }
          .socials a { color: var(--primary); }
        `}</style>
      </div>
    </div>
  );
}
