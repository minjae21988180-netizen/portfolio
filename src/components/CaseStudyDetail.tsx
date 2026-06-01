"use client";

import { useEffect, useRef, useState } from "react";
import type { Block, CaseStudy } from "@/data/caseStudies";

/** Render a single typed content block as a designed graphic component. */
function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "prose":
      return <p dangerouslySetInnerHTML={{ __html: block.text }} />;

    case "list":
      return (
        <ul className="cs-list">
          {block.items.map((it, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: it }} />
          ))}
        </ul>
      );

    case "metrics":
      return (
        <div className="cs-metrics">
          {block.items.map((m, i) => (
            <div className="cs-metric" key={i}>
              <div className="num">{m.num}</div>
              <div className="lbl">{m.lbl}</div>
            </div>
          ))}
        </div>
      );

    case "bars":
      return (
        <div className="cs-bars">
          {block.groups.map((g, gi) => (
            <div className="cs-bargroup" key={gi}>
              {g.label && <div className="cs-bargroup-label">{g.label}</div>}
              {g.bars.map((b, bi) => {
                const max = b.max ?? 5;
                const pct = Math.max(0, Math.min(100, (b.value / max) * 100));
                return (
                  <div className="cs-bar" key={bi}>
                    <div className="cs-bar-top">
                      <span className="cs-bar-name">{b.name}</span>
                      <span className="cs-bar-val">{b.value.toFixed(1)}</span>
                    </div>
                    <div className="cs-bar-track">
                      <div className="cs-bar-fill" data-fill data-pct={pct} />
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
          {block.note && (
            <p className="t-fine" style={{ color: "var(--ink-soft)", marginTop: 6 }}>
              {block.note}
            </p>
          )}
        </div>
      );

    case "themes":
      return (
        <div className="cs-themes">
          {block.rows.map((r, i) => (
            <div className="cs-theme" key={i}>
              <div className="cs-theme-main">
                <div className="cs-theme-name">{r.theme}</div>
                <div className="cs-theme-find">{r.finding}</div>
              </div>
              <div className="cs-theme-quote">
                <span>{r.quote}</span>
              </div>
            </div>
          ))}
        </div>
      );

    case "pairs":
      return (
        <div className="cs-pairs">
          {block.items.map((p, i) => (
            <div className="cs-pair" key={i}>
              <div className="cs-pair-problem">
                <div className="cs-pair-tag">Pain point</div>
                <p>{p.problem}</p>
              </div>
              <div className="cs-pair-arrow" aria-hidden>→</div>
              <div className="cs-pair-fix">
                <div className="cs-pair-tag">Fix</div>
                <p>{p.fix}</p>
              </div>
            </div>
          ))}
        </div>
      );

    case "timeline":
      return (
        <div className="cs-timeline">
          {block.steps.map((s, i) => (
            <div className="cs-step" key={i}>
              <div className="cs-step-node">{i + 1}</div>
              <div className="cs-step-body">
                <div className="cs-step-label">{s.label}</div>
                <div className="cs-step-meta" dangerouslySetInnerHTML={{ __html: s.meta }} />
              </div>
            </div>
          ))}
        </div>
      );

    case "principles":
      return (
        <div className="cs-principles">
          {block.items.map((p, i) => (
            <div className="cs-principle" key={i}>
              <div className="cs-principle-ico">{p.icon}</div>
              <h4>{p.title}</h4>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
      );

    case "gallery":
      return (
        <div className="cs-gallery">
          {block.items.map((g, i) => (
            <div className="cs-gallery-tile" key={i}>{g}</div>
          ))}
        </div>
      );

    case "shot":
      return <div className="cs-shot">{block.label}</div>;

    case "pullquote":
      return <div className="cs-pullquote">{block.text}</div>;

    default:
      return null;
  }
}

export default function CaseStudyDetail({
  study,
  onBack,
}: {
  study: CaseStudy;
  onBack: () => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const progRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(study.sections[0]?.id ?? "");

  // reading progress + active anchor tracking
  useEffect(() => {
    const scroll = scrollRef.current;
    if (!scroll) return;
    const sectionEls = study.sections
      .map((s) => document.getElementById(`sec-${study.slug}-${s.id}`))
      .filter(Boolean) as HTMLElement[];

    const onScroll = () => {
      const max = scroll.scrollHeight - scroll.clientHeight;
      if (progRef.current) {
        progRef.current.style.width = max > 0 ? `${(scroll.scrollTop / max) * 100}%` : "0%";
      }
      let current = sectionEls[0]?.id ?? "";
      sectionEls.forEach((el) => {
        if (el.offsetTop - scroll.scrollTop <= 150) current = el.id;
      });
      const id = current.replace(`sec-${study.slug}-`, "");
      setActive((prev) => (prev === id ? prev : id));
    };
    scroll.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => scroll.removeEventListener("scroll", onScroll);
  }, [study]);

  // animate score bars on scroll-into-view
  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;
    const fills = Array.from(root.querySelectorAll<HTMLElement>("[data-fill]"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            el.style.width = `${el.dataset.pct}%`;
            io.unobserve(el);
          }
        });
      },
      { root, threshold: 0.4 }
    );
    fills.forEach((f) => io.observe(f));
    return () => io.disconnect();
  }, [study]);

  const jump = (id: string) => {
    const el = document.getElementById(`sec-${study.slug}-${id}`);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column" }}>
      {/* top bar */}
      <div className="cs-topbar">
        <button className="cs-back" onClick={onBack}>
          <span aria-hidden>←</span> Back
        </button>
        <div className="cs-crumb">
          Work · <b>{study.category}</b> · {study.title}
        </div>
        <div className="cs-progress-wrap">
          <div className="cs-progress" ref={progRef} />
        </div>
      </div>

      {/* anchors */}
      <div className="cs-anchors">
        {study.sections.map((s) => (
          <button
            key={s.id}
            className={`cs-anchor ${active === s.id ? "active" : ""}`}
            onClick={() => jump(s.id)}
          >
            {s.anchor}
          </button>
        ))}
      </div>

      {/* scroll body */}
      <div className="cs-scroll" ref={scrollRef}>
        {/* hero */}
        <div className="cs-hero" id={`sec-${study.slug}-${study.sections[0]?.id}`}>
          <div className="t-tagline">{study.tagline}</div>
          <div className="cs-htitle">{study.title}</div>
          <div className="cs-hsub">{study.sub}</div>
          <div className="cs-meta">
            <div>
              <span>Role</span>
              <b>{study.role}</b>
            </div>
            <div>
              <span>Duration</span>
              <b>{study.duration}</b>
            </div>
            <div>
              <span>Tools</span>
              <b>{study.tools}</b>
            </div>
          </div>
          <div className="cs-tag-row tag-row">
            {study.tags.map((t) => (
              <span className="chip" key={t}>{t}</span>
            ))}
          </div>
        </div>

        {/* sections (first section id reused on hero, so skip its wrapper anchor but still render content) */}
        {study.sections.map((s, idx) => (
          <section
            className="cs-section"
            id={idx === 0 ? undefined : `sec-${study.slug}-${s.id}`}
            key={s.id}
          >
            <div className="cs-kicker">{s.kicker}</div>
            <h2>{s.heading}</h2>
            {s.blocks.map((b, i) => (
              <BlockView block={b} key={i} />
            ))}
          </section>
        ))}
        <div className="cs-end" />
      </div>
    </div>
  );
}
