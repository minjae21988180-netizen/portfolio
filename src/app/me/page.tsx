"use client";

import meBg from "../../../public/assets/me-island.png";
import IslandPage from "@/components/IslandPage";

export default function MePage() {
  return (
    <IslandPage
      background={meBg}
      hotspot={{ x: 49, y: 38, label: "Meet the person" }}
      popupTitle="About"
    >
      {() => (
        <div>
          <div className="t-tagline" style={{ color: "var(--primary)" }}>Hello</div>
          <h2 className="h-display-lg" style={{ marginTop: 6, marginBottom: 16 }}>
            I&rsquo;m a designer based in California.
          </h2>
          <p className="t-lead" style={{ color: "var(--ink-muted-80)", maxWidth: 720 }}>
            I make interfaces that feel calm, decisive, and a little bit playful &mdash; the kind
            you don&rsquo;t notice until you need them, and then they&rsquo;re exactly where you
            left them.
          </p>

          <div className="me-grid">
            <Column heading="Skills" items={[
              "Product design (web, iOS, macOS)",
              "Interaction & motion",
              "Design systems",
              "Brand & visual identity",
              "Prototyping in code (SwiftUI, React)",
              "Workshops & facilitation",
            ]} />
            <Column heading="Values" items={[
              "Quiet UI, loud product",
              "Ship the smallest honest version",
              "Words first, pixels second",
              "Respect the reader, the user, and the team",
            ]} />
            <Column heading="Outside work" items={[
              "EDM nights, Fred Again forever",
              "SoulCycle & long yoga mornings",
              "Sunlight, the closer the window the better",
              "Coffee shops with two chairs and a window",
            ]} />
          </div>

          <div className="me-quote">
            <span className="t-lead-airy">
              &ldquo;The best portfolios are not catalogues &mdash; they&rsquo;re invitations.&rdquo;
            </span>
          </div>

          <style jsx>{`
            .me-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
              gap: 36px;
              margin-top: 40px;
              padding-top: 32px;
              border-top: 1px solid var(--hairline);
            }
            .me-quote {
              margin-top: 40px;
              padding: 32px;
              background: var(--canvas-parchment);
              border-radius: var(--r-lg);
              border-left: 3px solid var(--primary);
            }
          `}</style>
        </div>
      )}
    </IslandPage>
  );
}

function Column({ heading, items }: { heading: string; items: string[] }) {
  return (
    <div>
      <h3 className="h-display-md">{heading}</h3>
      <ul className="col-list">
        {items.map((i) => <li key={i}>{i}</li>)}
      </ul>
      <style jsx>{`
        .col-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 14px;
        }
        .col-list :global(li) {
          font-size: 17px;
          line-height: 1.47;
          letter-spacing: -0.374px;
          color: var(--ink-muted-80);
          padding-left: 18px;
          position: relative;
        }
        .col-list :global(li)::before {
          content: "";
          position: absolute;
          left: 0;
          top: 11px;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--primary);
        }
      `}</style>
    </div>
  );
}
