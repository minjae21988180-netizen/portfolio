"use client";

import { useState } from "react";
import GlobalNav from "@/components/GlobalNav";
import SubNav from "@/components/SubNav";
import Footer from "@/components/Footer";
import IslandHero from "@/components/IslandHero";
import ContactPopup from "@/components/ContactPopup";
import ConnectIsland from "@/components/art/ConnectIsland";

export default function ConnectPage() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <GlobalNav />
      <SubNav
        category="Connect Island"
        links={[
          { href: "/work", label: "Work" },
          { href: "/me", label: "Me" },
          { href: "/", label: "Control Center" },
        ]}
        cta={{ href: "#say-hi", label: "Say hi" }}
      />

      <main>
        <IslandHero
          eyebrow="Connect Island"
          title="Tap the lighthouse. Send a signal."
          lead="Two chairs, one café, infinite Wi-Fi. Drop a message, grab the resume, or follow me on the obvious places."
          primaryCta={{ label: "Open contact", onClick: () => setOpen(true) }}
          secondaryCta={{ label: "Back to Control Center", href: "/" }}
          art={<ConnectIsland />}
        />

        <section id="say-hi" className="tile tile-parchment">
          <div className="t-tagline" style={{ color: "var(--primary)" }}>Get in touch</div>
          <h2 className="h-display-lg" style={{ maxWidth: 860 }}>
            The fastest way is a short, honest note.
          </h2>
          <p className="t-lead" style={{ color: "var(--ink-muted-80)", maxWidth: 720 }}>
            Tell me what you&rsquo;re working on and what would help. I reply within a couple of days,
            occasionally faster — depends on the espresso.
          </p>
          <div className="ctas">
            <button className="btn btn-primary" onClick={() => setOpen(true)}>Send a message</button>
            <a className="btn btn-secondary" href="/resume.pdf" download>Download resume</a>
          </div>
        </section>

        <section className="tile tile-dark">
          <div className="t-tagline" style={{ color: "var(--primary-on-dark)" }}>Elsewhere</div>
          <h2 className="h-display-lg">Five places I actually show up.</h2>
          <div className="links-row">
            <a className="link-tile" href="https://linkedin.com" target="_blank" rel="noopener">
              <span>LinkedIn</span><span className="arrow">↗</span>
            </a>
            <a className="link-tile" href="https://github.com" target="_blank" rel="noopener">
              <span>GitHub</span><span className="arrow">↗</span>
            </a>
            <a className="link-tile" href="https://dribbble.com" target="_blank" rel="noopener">
              <span>Dribbble</span><span className="arrow">↗</span>
            </a>
            <a className="link-tile" href="https://twitter.com" target="_blank" rel="noopener">
              <span>Twitter / X</span><span className="arrow">↗</span>
            </a>
            <a className="link-tile" href="mailto:hello@example.com">
              <span>Email</span><span className="arrow">→</span>
            </a>
          </div>
        </section>
      </main>

      <Footer />

      {open && <ContactPopup onClose={() => setOpen(false)} />}

      <style jsx>{`
        .links-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 14px;
          max-width: 1100px;
          width: 100%;
          margin-top: 20px;
        }
        .link-tile {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 22px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--r-md);
          color: var(--primary-on-dark);
          font-size: 17px;
          font-weight: 600;
          letter-spacing: -0.374px;
          transition: background 0.2s, border-color 0.2s, transform 0.18s;
        }
        .link-tile:hover {
          background: rgba(41, 151, 255, 0.08);
          border-color: rgba(41, 151, 255, 0.3);
          text-decoration: none;
        }
        .link-tile:active { transform: scale(0.98); }
        .link-tile .arrow {
          color: var(--primary-on-dark);
          margin-left: 12px;
        }
      `}</style>
    </>
  );
}
