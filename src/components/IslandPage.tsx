"use client";

import Image, { StaticImageData } from "next/image";
import { ReactNode, useEffect, useRef, useState } from "react";
import BackButton from "./BackButton";
import Hotspot from "./Hotspot";
import { useParallax } from "@/hooks/useParallax";

/**
 * Full-bleed island page: the panorama fills the viewport with a single
 * pulsing hotspot on the monument. Clicking it dims the scene and renders
 * the page-supplied popup (a candy PopupShell). Esc closes; the back arrow
 * returns to the Control Center.
 */
export default function IslandPage({
  background,
  hotspot,
  popupLabel,
  children,
}: {
  background: StaticImageData;
  hotspot: { x: number; y: number; label: string };
  popupLabel: string;
  /** returns the popup (PopupShell) to render when open */
  children: (close: () => void) => ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const sceneRef = useRef<HTMLDivElement>(null);
  useParallax(sceneRef);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <main className="ip-shell" data-popup={open ? "true" : "false"}>
      {/* parallax scene layer — image + hotspot ride together so the
          hotspot stays glued to the monument as the scene shifts */}
      <div className="ip-scene" ref={sceneRef}>
        <Image
          src={background}
          alt=""
          aria-hidden
          placeholder="blur"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <Hotspot x={hotspot.x} y={hotspot.y} label={hotspot.label} onClick={() => setOpen(true)} />
      </div>

      <BackButton />

      {open && children(() => setOpen(false))}

      <style jsx>{`
        .ip-shell {
          position: relative;
          width: 100%;
          min-height: 100vh;
          overflow: hidden;
          background: #1d1024;
        }
        .ip-scene {
          position: fixed;
          inset: 0;
          z-index: 0;
          transition: filter 0.45s ease;
        }
        .ip-shell[data-popup="true"] .ip-scene {
          filter: brightness(0.7) saturate(1) blur(5px);
        }
      `}</style>
    </main>
  );
}
