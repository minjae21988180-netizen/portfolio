"use client";

import { ReactNode } from "react";
import Link from "next/link";

/**
 * Apple-chassis hero for an island page: parchment background,
 * tight display headline, single lead paragraph, two pill CTAs,
 * and the SVG island art carrying the system product-shadow.
 */
export default function IslandHero({
  eyebrow,
  title,
  lead,
  art,
  primaryCta,
  secondaryCta,
  variant = "parchment",
}: {
  eyebrow: string;
  title: string;
  lead: string;
  art: ReactNode;
  primaryCta: { label: string; onClick?: () => void; href?: string };
  secondaryCta?: { label: string; href: string };
  variant?: "parchment" | "light";
}) {
  const tileClass = variant === "parchment" ? "tile-parchment" : "tile-light";
  return (
    <section className={`tile ${tileClass} island-hero`}>
      <div className="t-tagline" style={{ color: "var(--primary)" }}>{eyebrow}</div>
      <h1 className="h-hero" style={{ maxWidth: 880 }}>{title}</h1>
      <p className="t-lead" style={{ maxWidth: 720, color: "var(--ink-muted-80)" }}>{lead}</p>
      <div className="ctas">
        {primaryCta.href ? (
          <Link href={primaryCta.href} className="btn btn-primary">{primaryCta.label}</Link>
        ) : (
          <button className="btn btn-primary" onClick={primaryCta.onClick}>{primaryCta.label}</button>
        )}
        {secondaryCta && (
          <Link href={secondaryCta.href} className="btn btn-secondary">{secondaryCta.label}</Link>
        )}
      </div>
      <div className="island-hero-art scene-shadow" aria-hidden>
        {art}
      </div>

      <style jsx>{`
        .island-hero {
          gap: 18px;
        }
        .island-hero-art {
          width: min(720px, 90vw);
          aspect-ratio: 1 / 1;
          margin-top: 24px;
        }
        .island-hero-art :global(svg) {
          width: 100%;
          height: 100%;
          display: block;
          border-radius: var(--r-lg);
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}
