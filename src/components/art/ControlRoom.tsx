"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import * as THREE from "three";
import room from "../../../public/assets/control-room.png";

const COLOR_URL = "/assets/control-room.png";
const DEPTH_URL = "/assets/scene/depth-map.png";

/**
 * Depth-map 2.5D stage for the landing page (Facebook "3D photo" technique).
 * One full-res color image + one grayscale depth map; a fullscreen shader
 * offsets each pixel along the cursor direction proportionally to its depth,
 * so near pixels (desk, props) slide over far ones (windows, sky) with
 * continuous per-pixel parallax — no layer seams, no resolution loss.
 *
 * The plain <Image> renders first as a poster; the canvas fades in on top
 * once both textures are ready. Reduced-motion and coarse pointers keep the
 * still image only. If the depth map is missing the page quietly stays 2D.
 */

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const FRAG = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uColor;
  uniform sampler2D uDepth;
  uniform vec2 uMouse;     // eased cursor, -1..1
  uniform vec2 uCover;     // cover-fit scale of the image inside the viewport
  uniform vec2 uStrength;  // max parallax shift in UV units

  void main() {
    // cover-fit: map viewport uv into image uv without distortion
    vec2 uv = (vUv - 0.5) * uCover + 0.5;

    // sample depth at the (slightly shifted) location to reduce edge tearing
    float d = texture2D(uDepth, uv).r;
    // re-center: ~0.45 keeps the desk plane near-static and pushes the
    // far sky the opposite way, which reads as camera head-movement
    float plane = d - 0.45;
    vec2 shift = uMouse * uStrength * plane;

    gl_FragColor = texture2D(uColor, uv + shift);
  }
`;

export default function ControlRoom() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (reduce || coarse) return;

    const mount = mountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
      renderer.outputColorSpace = THREE.SRGBColorSpace;
    } catch {
      return; // WebGL unavailable → stay on the still image
    }

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const uniforms = {
      uColor: { value: null as THREE.Texture | null },
      uDepth: { value: null as THREE.Texture | null },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uCover: { value: new THREE.Vector2(1, 1) },
      uStrength: { value: new THREE.Vector2(0.016, 0.01) },
    };
    const material = new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms });
    scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material));

    let raf = 0;
    let disposed = false;
    let imgAspect = 2000 / 857;
    const target = new THREE.Vector2(0, 0);

    const resize = () => {
      const w = mount.clientWidth || window.innerWidth;
      const h = mount.clientHeight || window.innerHeight;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(w, h);
      // cover-fit scale (like object-fit: cover)
      const viewAspect = w / h;
      if (viewAspect > imgAspect) {
        uniforms.uCover.value.set(1, imgAspect / viewAspect);
      } else {
        uniforms.uCover.value.set(viewAspect / imgAspect, 1);
      }
    };

    const onMove = (e: MouseEvent) => {
      target.set(
        (e.clientX / window.innerWidth - 0.5) * 2,
        (e.clientY / window.innerHeight - 0.5) * 2
      );
    };

    const tick = () => {
      uniforms.uMouse.value.lerp(target, 0.07);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };

    const loader = new THREE.TextureLoader();
    Promise.all([loader.loadAsync(COLOR_URL), loader.loadAsync(DEPTH_URL)])
      .then(([color, depth]) => {
        if (disposed) return;
        color.colorSpace = THREE.SRGBColorSpace;
        color.minFilter = THREE.LinearFilter;
        depth.minFilter = THREE.LinearFilter;
        imgAspect = color.image.width / color.image.height;
        uniforms.uColor.value = color;
        uniforms.uDepth.value = depth;
        mount.appendChild(renderer.domElement);
        resize();
        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", onMove, { passive: true });
        raf = requestAnimationFrame(tick);
        setLive(true);
      })
      .catch(() => {
        // depth map missing or failed → keep the still image
        renderer.dispose();
      });

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      if (renderer.domElement.parentElement === mount) mount.removeChild(renderer.domElement);
      renderer.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div className="control-room" aria-hidden>
      <Image
        src={room}
        alt=""
        placeholder="blur"
        priority
        fill
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center", opacity: live ? 0 : 1 }}
      />
      <div ref={mountRef} className="cr-canvas" data-live={live} />
      <style jsx>{`
        .control-room {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
        }
        .cr-canvas {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 600ms ease;
        }
        .cr-canvas[data-live="true"] {
          opacity: 1;
        }
        .cr-canvas :global(canvas) {
          width: 100% !important;
          height: 100% !important;
          display: block;
        }
      `}</style>
    </div>
  );
}
