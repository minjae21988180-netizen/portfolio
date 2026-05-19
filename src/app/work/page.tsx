"use client";

import { useState } from "react";
import GlobalNav from "@/components/GlobalNav";
import SubNav from "@/components/SubNav";
import Footer from "@/components/Footer";
import IslandHero from "@/components/IslandHero";
import CaseStudyGallery from "@/components/CaseStudyGallery";
import WorkIsland from "@/components/art/WorkIsland";

export default function WorkPage() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <GlobalNav />
      <SubNav
        category="Work Island"
        links={[
          { href: "/me", label: "Me" },
          { href: "/connect", label: "Connect" },
          { href: "/", label: "Control Center" },
        ]}
        cta={{ href: "#cases", label: "Open the case studies" }}
      />

      <main>
        <IslandHero
          eyebrow="Work Island"
          title="Tap the lightbulb. Seven projects light up."
          lead="Each one taught me something I couldn't have learned without shipping it — bank apps that breathe, music tools you can capture in 11 seconds, an admin console a CISO trusted on first review."
          primaryCta={{ label: "Open the case studies", onClick: () => setOpen(true) }}
          secondaryCta={{ label: "Back to Control Center", href: "/" }}
          art={<WorkIsland />}
        />

        <section id="cases" className="tile tile-light">
          <div className="t-tagline" style={{ color: "var(--primary)" }}>How I work</div>
          <h2 className="h-display-lg" style={{ maxWidth: 880 }}>
            Decisive design, made out loud.
          </h2>
          <p className="t-lead" style={{ color: "var(--ink-muted-80)", maxWidth: 720 }}>
            I write before I draw, prototype before I argue, and ship the smallest honest version
            so the team can disagree with something real.
          </p>
          <div className="ctas">
            <button className="btn btn-primary" onClick={() => setOpen(true)}>See seven case studies</button>
            <a className="btn btn-secondary" href="mailto:hello@example.com">Ask me anything</a>
          </div>
        </section>

        <section className="tile tile-dark">
          <div className="t-tagline" style={{ color: "var(--primary-on-dark)" }}>Selected clients</div>
          <h2 className="h-display-lg">From indie cafés to fintech, music to security.</h2>
          <p className="t-lead" style={{ color: "var(--body-muted-on-dark)", maxWidth: 720 }}>
            Eight years, two coasts, and a notebook full of products that left their mark.
          </p>
          <div className="logos">
            {["Ember Bank", "Atlas", "Sundial", "North", "Verse", "Loop", "Echo"].map((n) => (
              <div key={n} className="logo">{n}</div>
            ))}
          </div>
        </section>
      </main>

      <Footer />

      {open && <CaseStudyGallery onClose={() => setOpen(false)} />}

      <style jsx>{`
        .logos {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 24px;
          margin-top: 24px;
          max-width: 1100px;
          width: 100%;
        }
        .logo {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 600;
          letter-spacing: -0.224px;
          color: rgba(255, 255, 255, 0.7);
          text-align: center;
          padding: 14px 8px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--r-md);
        }
      `}</style>
    </>
  );
}
