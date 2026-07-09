"use client";
import { useEffect, useRef, useState } from "react";

export default function ParticleCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [reduced] = useState(() =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    if (reduced || !containerRef.current) return;
    const container = containerRef.current;

    // ── Load Three.js from CDN then run the Stitch animation ───────────────
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js";
    script.async = true;
    script.onload = () => {
      // @ts-expect-error THREE is loaded globally from CDN
      const THREE = window.THREE;
      if (!THREE) return;
      
      // Prevent duplicate canvases in React Strict Mode
      container.innerHTML = "";

      const width  = container.clientWidth  || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;

      const scene    = new THREE.Scene();
      const camera   = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      // ── 3 000 particles — violet + cyan mix ───────────────────────────────
      const count     = 3000;
      const positions = new Float32Array(count * 3);
      const colors    = new Float32Array(count * 3);
      const sizes     = new Float32Array(count);

      const colorViolet = new THREE.Color(0x6E7BFF);
      const colorCyan   = new THREE.Color(0xFF8A3D);

      for (let i = 0; i < count; i++) {
        positions[i * 3]     = (Math.random() - 0.5) * 10;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

        const mix = Math.random() > 0.5 ? colorViolet : colorCyan;
        colors[i * 3]     = mix.r;
        colors[i * 3 + 1] = mix.g;
        colors[i * 3 + 2] = mix.b;

        sizes[i] = Math.random() * 2;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color",    new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute("size",     new THREE.BufferAttribute(sizes, 1));

      const material = new THREE.PointsMaterial({
        size: 0.015,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
      });

      const particles = new THREE.Points(geometry, material);
      scene.add(particles);
      camera.position.z = 5;

      // ── Shape targets (matches Stitch exactly) ────────────────────────────
      let currentShape = 0;
      const shapes = ["sphere"] as const;

      const getTarget = (index: number, shape: string) => {
        if (shape === "sphere") {
          const aspect = camera.aspect;
          const radius = aspect < 0.8 ? 1.5 : (aspect < 1.2 ? 2.2 : 2.8);
          const phi   = Math.acos(-1 + (2 * index) / count);
          const theta = Math.sqrt(count * Math.PI) * phi;
          return new THREE.Vector3(
            radius * Math.cos(theta) * Math.sin(phi),
            radius * Math.sin(theta) * Math.sin(phi),
            radius * Math.cos(phi),
          );
        } else if (shape === "cube") {
          return new THREE.Vector3(
            (Math.random() - 0.5) * 4,
            (Math.random() - 0.5) * 4,
            (Math.random() - 0.5) * 4,
          );
        } else if (shape === "plane") {
          return new THREE.Vector3(
            (Math.random() - 0.5) * 6,
            (Math.random() - 0.5) * 6,
            0,
          );
        }
        return new THREE.Vector3(
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
        );
      };

      let lastChange = 0;
      const mouse = new THREE.Vector2(0, 0);

      const onMouse = (e: MouseEvent) => {
        mouse.x = (e.clientX / window.innerWidth)  *  2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) *  2 + 1;
      };
      window.addEventListener("mousemove", onMouse);

      // ── Animation loop ────────────────────────────────────────────────────
      let rafId: number;
      const animate = (time: number) => {
        rafId = requestAnimationFrame(animate);
        const elapsed = time * 0.001;

        if (time - lastChange > 5000) {
          currentShape = (currentShape + 1) % shapes.length;
          lastChange = time;
        }

        const posAttr = geometry.attributes.position;
        for (let i = 0; i < count; i++) {
          const target = getTarget(i, shapes[currentShape]);
          posAttr.array[i * 3]     += (target.x - posAttr.array[i * 3])     * 0.02;
          posAttr.array[i * 3 + 1] += (target.y - posAttr.array[i * 3 + 1]) * 0.02;
          posAttr.array[i * 3 + 2] += (target.z - posAttr.array[i * 3 + 2]) * 0.02;

          // Mouse repulsion
          const dx   = posAttr.array[i * 3]     - mouse.x * 5;
          const dy   = posAttr.array[i * 3 + 1] - mouse.y * 5;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 1.0) {
            posAttr.array[i * 3]     += dx * 0.05;
            posAttr.array[i * 3 + 1] += dy * 0.05;
          }
        }
        posAttr.needsUpdate = true;

        particles.rotation.y = elapsed * 0.1;
        particles.rotation.x = elapsed * 0.05;

        renderer.render(scene, camera);
      };
      animate(0);

      // ── Resize ────────────────────────────────────────────────────────────
      const onResize = () => {
        const w = container.clientWidth  || window.innerWidth;
        const h = container.clientHeight || window.innerHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", onResize);

      // Cleanup
      return () => {
        cancelAnimationFrame(rafId);
        window.removeEventListener("mousemove", onMouse);
        window.removeEventListener("resize", onResize);
        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [reduced]);

  if (reduced) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-48 h-48 rounded-full bg-accent-violet/10 border border-accent-violet/30 flex items-center justify-center">
          <span className="font-mono text-xs tracking-widest uppercase text-accent-cyan">V4 NEXUS</span>
        </div>
      </div>
    );
  }

  return <div ref={containerRef} className="w-full h-full" />;
}
