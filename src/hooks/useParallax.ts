"use client";

import { RefObject, useEffect, useRef } from "react";

/**
 * Cursor-parallax for a panoramic background layer (PROJECT_BRIEF §1).
 * The element is scaled slightly larger than its container so there's slack,
 * then translated opposite the cursor to "reveal" extra image width/height —
 * faking depth from a single flat image. Eased with a lerp; disabled for
 * coarse pointers and reduced-motion.
 */
export function useParallax(
  ref: RefObject<HTMLElement>,
  {
    maxX = 26,
    maxY = 16,
    lerp = 0.06,
    scale = 1.1,
  }: { maxX?: number; maxY?: number; lerp?: number; scale?: number } = {}
) {
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const rafRef = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (reduce || coarse) {
      el.style.transform = "none";
      return;
    }

    el.style.willChange = "transform";
    el.style.transform = `scale(${scale})`;

    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2; // -1..1
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      // move opposite the cursor → reveal the far side of the image
      target.current.x = -nx * maxX;
      target.current.y = -ny * maxY;
    };

    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * lerp;
      current.current.y += (target.current.y - current.current.y) * lerp;
      el.style.transform = `translate3d(${current.current.x.toFixed(2)}px, ${current.current.y.toFixed(2)}px, 0) scale(${scale})`;
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [ref, maxX, maxY, lerp, scale]);
}
