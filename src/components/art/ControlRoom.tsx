"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import roomShell from "../../../public/assets/scene/01-room-shell.png";
import console2 from "../../../public/assets/scene/02-console.png";
import props3 from "../../../public/assets/scene/03-props.png";

/**
 * 4-layer 2.5D parallax stage for the landing page.
 *   z1 — room shell (windows, walls, islands)           → near-still
 *   z2 — console desk (transparent PNG)                 → mid drift
 *   z3 — foreground props (transparent PNG)             → strong drift
 *   z4 — character sprite (rendered by ControlCenter)   → cursor-driven
 *
 * Each layer is scaled slightly larger than its container so there is slack
 * to translate into without revealing the edges. Cursor offset is eased
 * with a lerp so movement reads smooth. Disabled for reduced-motion and
 * coarse pointers — the scene falls back to a still composite.
 */
const LAYERS = [
  { src: roomShell, maxX: 6,  maxY: 4,  scale: 1.025, alt: "Control room" },
  { src: console2,  maxX: 22, maxY: 14, scale: 1.04,  alt: "" },
  { src: props3,    maxX: 40, maxY: 26, scale: 1.06,  alt: "" },
] as const;

export default function ControlRoom() {
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (reduce || coarse) return;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const tick = () => {
      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;
      for (let i = 0; i < LAYERS.length; i++) {
        const el = layerRefs.current[i];
        if (!el) continue;
        const { maxX, maxY, scale } = LAYERS[i];
        const tx = -current.x * maxX;
        const ty = -current.y * maxY;
        el.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0) scale(${scale})`;
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
    <div className="control-room" aria-hidden>
      {LAYERS.map((layer, i) => (
        <div
          key={i}
          ref={(el) => { layerRefs.current[i] = el; }}
          className="cr-layer"
          style={{ transform: `scale(${layer.scale})` }}
        >
          <Image
            src={layer.src}
            alt={layer.alt}
            placeholder={i === 0 ? "blur" : "empty"}
            priority={i === 0}
            fill
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
      ))}
      <style jsx>{`
        .control-room {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
        }
        .cr-layer {
          position: absolute;
          inset: 0;
          will-change: transform;
        }
      `}</style>
    </div>
  );
}
