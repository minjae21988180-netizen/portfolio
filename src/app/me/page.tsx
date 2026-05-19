"use client";

import { useState } from "react";
import GlobalNav from "@/components/GlobalNav";
import SubNav from "@/components/SubNav";
import Footer from "@/components/Footer";
import IslandHero from "@/components/IslandHero";
import AboutPopup from "@/components/AboutPopup";
import MeIsland from "@/components/art/MeIsland";

export default function MePage() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <GlobalNav />
      <SubNav
        category="Me Island"
        links={[
          { href: "/work", label: "Work" },
          { href: "/connect", label: "Connect" },
          { href: "/", label: "Control Center" },
        ]}
        cta={{ href: "#about", label: "Read the bio" }}
      />

      <main>
        <IslandHero
          eyebrow="Me Island"
          title="Tap the statue. Meet the person."
          lead="EDM mornings, SoulCycle afternoons, golden-hour everything. A designer who treats interfaces the way good baristas treat regulars."
          primaryCta={{ label: "Read the bio", onClick: () => setOpen(true) }}
          secondaryCta={{ label: "Back to Control Center", href: "/" }}
          art={<MeIsland />}
        />

        <section id="about" className="tile tile-light">
          <div className="t-tagline" style={{ color: "var(--primary)" }}>The short version</div>
          <h2 className="h-display-lg" style={{ maxWidth: 880 }}>
            I design for the moment <em>before</em> a person opens an app.
          </h2>
          <p className="t-lead" style={{ color: "var(--ink-muted-80)", maxWidth: 720 }}>
            The expectation, the small breath of trust, the &ldquo;okay let&rsquo;s do this.&rdquo; If the UI
            keeps that breath intact, my job is done.
          </p>
          <button className="btn btn-primary" onClick={() => setOpen(true)}>Full bio &amp; skills</button>
        </section>

        <section className="tile tile-parchment">
          <div className="t-tagline" style={{ color: "var(--primary)" }}>Interests</div>
          <h2 className="h-display-lg" style={{ maxWidth: 880 }}>Sunlight, sound, and movement.</h2>
          <div className="cards-row">
            <div className="card">
              <div className="t-caption-strong" style={{ color: "var(--ink-muted-48)", textTransform: "uppercase", letterSpacing: 0.4 }}>Sound</div>
              <h3 className="t-body-strong" style={{ marginTop: 4 }}>EDM, Fred Again</h3>
              <p className="t-body" style={{ color: "var(--ink-muted-80)" }}>
                The kind of music that you actually feel finishing a thought.
              </p>
            </div>
            <div className="card">
              <div className="t-caption-strong" style={{ color: "var(--ink-muted-48)", textTransform: "uppercase", letterSpacing: 0.4 }}>Movement</div>
              <h3 className="t-body-strong" style={{ marginTop: 4 }}>SoulCycle &amp; yoga</h3>
              <p className="t-body" style={{ color: "var(--ink-muted-80)" }}>
                Where I do most of my best design thinking. Don&rsquo;t @ me.
              </p>
            </div>
            <div className="card">
              <div className="t-caption-strong" style={{ color: "var(--ink-muted-48)", textTransform: "uppercase", letterSpacing: 0.4 }}>Light</div>
              <h3 className="t-body-strong" style={{ marginTop: 4 }}>Sunlight, especially golden hour</h3>
              <p className="t-body" style={{ color: "var(--ink-muted-80)" }}>
                If a coffee shop has a window seat, it has me.
              </p>
            </div>
          </div>
        </section>

        <section className="tile tile-dark-3">
          <div className="t-tagline" style={{ color: "var(--primary-on-dark)" }}>Where I am</div>
          <h2 className="h-display-lg">California-based. Coast-flexible.</h2>
          <p className="t-lead" style={{ color: "var(--body-muted-on-dark)", maxWidth: 660 }}>
            Working remote with teams everywhere; occasionally found in person in SF, LA, or Oakland.
          </p>
        </section>
      </main>

      <Footer />

      {open && <AboutPopup onClose={() => setOpen(false)} />}

      <style jsx>{`
        .cards-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 22px;
          width: 100%;
          max-width: 1100px;
          margin-top: 16px;
        }
      `}</style>
    </>
  );
}
