"use client";

import { useEffect, useRef } from "react";

/**
 * Magical cursor: a glowing core + a lagging halo + a sparkle trail.
 * - core and halo use mix-blend-mode: screen so they bloom over dark scenes
 * - sparkles are spawned imperatively, animate via CSS, and self-destruct on
 *   animationend so we never re-render React for trail particles
 */
export default function CustomCursor() {
  const coreRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;

    let coreX = window.innerWidth / 2;
    let coreY = window.innerHeight / 2;
    let haloX = coreX;
    let haloY = coreY;
    let lastSpark = 0;
    let lastMove = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      coreX = e.clientX;
      coreY = e.clientY;
      lastMove = performance.now();
    };

    const spawnSparkle = (x: number, y: number) => {
      const trail = trailRef.current;
      if (!trail) return;
      const s = document.createElement("span");
      s.className = "cursor-spark";
      const dx = (Math.random() - 0.5) * 40; // small horizontal drift
      const dy = -20 - Math.random() * 30;   // float up
      const r = (Math.random() - 0.5) * 90;  // small rotation
      s.style.left = `${x + (Math.random() - 0.5) * 14}px`;
      s.style.top = `${y + (Math.random() - 0.5) * 14}px`;
      s.style.setProperty("--dx", `${dx}px`);
      s.style.setProperty("--dy", `${dy}px`);
      s.style.setProperty("--r", `${r}deg`);
      s.style.setProperty("--size", `${5 + Math.random() * 5}px`);
      s.addEventListener("animationend", () => s.remove(), { once: true });
      trail.appendChild(s);
    };

    const tick = () => {
      haloX += (coreX - haloX) * 0.16;
      haloY += (coreY - haloY) * 0.16;

      if (coreRef.current) {
        coreRef.current.style.left = `${coreX}px`;
        coreRef.current.style.top = `${coreY}px`;
      }
      if (haloRef.current) {
        haloRef.current.style.left = `${haloX}px`;
        haloRef.current.style.top = `${haloY}px`;
      }

      // emit sparkles only while the cursor is moving — quiet when idle
      const now = performance.now();
      const moving = now - lastMove < 120;
      if (moving && now - lastSpark > 35) {
        spawnSparkle(coreX, coreY);
        lastSpark = now;
      }

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="cursor-halo" ref={haloRef} aria-hidden />
      <div className="cursor-core" ref={coreRef} aria-hidden />
      <div className="cursor-trail" ref={trailRef} aria-hidden />
    </>
  );
}
