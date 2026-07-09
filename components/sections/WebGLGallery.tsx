"use client";

import { useRef, useState, useEffect, useMemo, Suspense, useCallback } from "react";
import Link from "next/link";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { Environment, Float, OrbitControls, MeshTransmissionMaterial } from "@react-three/drei";
import { motion, useScroll, useInView, AnimatePresence } from "framer-motion";
import * as THREE from "three";

/* ─── Starfield background particles ──────────────────────────── */
function Starfield({ count = 300 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40 - 8;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime * 0.03;
    mesh.current.rotation.y = t;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} />
      </bufferGeometry>
      <pointsMaterial size={0.06} color="#8888ff" transparent opacity={0.7} sizeAttenuation depthWrite={false} />
    </points>
  );
}

/* ─── Small orbiting crystal shards ───────────────────────────── */
function FloatingShards({ count = 12 }: { count?: number }) {
  const groupRef = useRef<THREE.Group>(null);

  const shards = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 10 - 3,
      ] as [number, number, number],
      scale: Math.random() * 0.25 + 0.08,
      speed: Math.random() * 0.3 + 0.1,
      rotAxis: new THREE.Vector3(Math.random(), Math.random(), Math.random()).normalize(),
    }));
  }, [count]);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    groupRef.current.children.forEach((child, i) => {
      const s = shards[i];
      if (s) {
        child.rotation.x += s.speed * 0.01;
        child.rotation.z += s.speed * 0.008;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {shards.map((s, i) => (
        <mesh key={i} position={s.position} scale={s.scale}>
          <icosahedronGeometry args={[1, 0]} />
          <meshPhysicalMaterial
            color="#6068cc"
            metalness={0.3}
            roughness={0.1}
            transmission={0.7}
            thickness={0.5}
            ior={1.5}
            envMapIntensity={2}
            transparent
            opacity={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ─── Sparkle/glitter particles orbiting the crystal ──────────── */
function Sparkles({ count = 40 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const r = 3 + Math.random() * 2;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.15;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
    // Pulse opacity for glitter effect
    const mat = ref.current.material as THREE.PointsMaterial;
    mat.opacity = 0.5 + Math.sin(state.clock.elapsedTime * 3) * 0.3;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} />
      </bufferGeometry>
      <pointsMaterial size={0.08} color="#ffffff" transparent opacity={0.7} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

/* ─── Backflash glow behind the crystal ───────────────────────── */
function BackFlash() {
  const meshRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  // Create a radial gradient texture for the glow
  const glowTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;
    
    // Radial gradient: bright center → transparent edges
    const grad = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
    grad.addColorStop(0, "rgba(100, 120, 255, 0.8)");
    grad.addColorStop(0.2, "rgba(80, 100, 255, 0.5)");
    grad.addColorStop(0.5, "rgba(60, 60, 200, 0.2)");
    grad.addColorStop(0.8, "rgba(30, 30, 150, 0.05)");
    grad.addColorStop(1, "rgba(0, 0, 80, 0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);

    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  }, []);

  useFrame((state) => {
    if (!meshRef.current || !lightRef.current) return;
    // Gentle pulse
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.15;
    meshRef.current.scale.setScalar(pulse);
    lightRef.current.intensity = 2 + Math.sin(state.clock.elapsedTime * 1.5) * 0.8;
  });

  return (
    <group>
      {/* Glow plane behind crystal */}
      <mesh ref={meshRef} position={[0, 0, -2]} scale={1}>
        <planeGeometry args={[12, 12]} />
        <meshBasicMaterial
          map={glowTexture}
          transparent
          opacity={0.9}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Point light behind crystal for rim lighting */}
      <pointLight
        ref={lightRef}
        position={[0, 0, -3]}
        color="#6678ff"
        intensity={2.5}
        distance={15}
        decay={2}
      />

      {/* Secondary warm accent glow */}
      <pointLight
        position={[0, 2, -2]}
        color="#9966ff"
        intensity={1}
        distance={10}
        decay={2}
      />
    </group>
  );
}

/* ─── Main crystal with project image inside it ───────────────── */
function Crystal({
  activeIndex,
  imageUrls,
}: {
  activeIndex: number;
  imageUrls: string[];
}) {
  const groupRef = useRef<THREE.Group>(null);
  const targetY = useRef(0);
  const targetX = useRef(0);

  // Load textures manually (safer than useTexture with CDN Three.js conflict)
  const [textures, setTextures] = useState<THREE.Texture[]>([]);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    let cancelled = false;
    
    Promise.all(
      imageUrls.map(
        (url) =>
          new Promise<THREE.Texture>((resolve) => {
            loader.load(
              url,
              (tex) => {
                tex.colorSpace = THREE.SRGBColorSpace;
                resolve(tex);
              },
              undefined,
              () => {
                const canvas = document.createElement("canvas");
                canvas.width = 512;
                canvas.height = 512;
                const ctx = canvas.getContext("2d")!;
                const grad = ctx.createLinearGradient(0, 0, 512, 512);
                grad.addColorStop(0, "#1a1a3e");
                grad.addColorStop(1, "#0a0a2e");
                ctx.fillStyle = grad;
                ctx.fillRect(0, 0, 512, 512);
                ctx.fillStyle = "#ffffff20";
                ctx.font = "bold 40px sans-serif";
                ctx.textAlign = "center";
                ctx.fillText("Loading...", 256, 270);
                resolve(new THREE.CanvasTexture(canvas));
              }
            );
          })
      )
    ).then((results) => {
      if (!cancelled) setTextures(results);
    });

    return () => { cancelled = true; };
  }, [imageUrls]);

  useEffect(() => {
    targetY.current = activeIndex * (Math.PI / 1.8);
    targetX.current = activeIndex * 0.15;
  }, [activeIndex]);

  useFrame((_s, delta) => {
    if (!groupRef.current) return;
    const r = groupRef.current.rotation;
    r.y = THREE.MathUtils.damp(r.y, targetY.current, 3, delta);
    r.x = THREE.MathUtils.damp(r.x, targetX.current, 3, delta);
    r.y += delta * 0.12;
    r.z += delta * 0.04;
  });

  const currentTexture = textures[activeIndex % textures.length];

  return (
    <group>
      {/* ── BACKFLASH GLOW behind the crystal ── */}
      <BackFlash />

      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={1.5}>
        <group ref={groupRef}>
          
          {/* ── INNER MESH: the project image painted on faces ── */}
          <mesh scale={0.95}>
            <dodecahedronGeometry args={[2.8, 0]} />
            <meshBasicMaterial
              map={currentTexture || null}
              color={currentTexture ? "#ffffff" : "#1a1a3e"}
              side={THREE.FrontSide}
            />
          </mesh>

          {/* ── OUTER MESH: glass shell with high refraction ── */}
          <mesh>
            <dodecahedronGeometry args={[2.8, 0]} />
            <MeshTransmissionMaterial
              backside
              samples={typeof window !== 'undefined' && window.innerWidth < 1024 ? 2 : 4}
              resolution={typeof window !== 'undefined' && window.innerWidth < 1024 ? 128 : 256}
              thickness={typeof window !== 'undefined' && window.innerWidth < 1024 ? 1.5 : 2.5}
              roughness={0}
              transmission={1}
              ior={1.45}
              chromaticAberration={0.06}
              anisotropy={0.3}
              color="#ffffff"
              envMapIntensity={4}
              clearcoat={1}
              clearcoatRoughness={0}
            />
          </mesh>

          {/* ── EDGE WIREFRAME: visible crystal edges ── */}
          <mesh>
            <dodecahedronGeometry args={[2.82, 0]} />
            <meshBasicMaterial
              color="#8899ff"
              wireframe
              transparent
              opacity={0.15}
            />
          </mesh>

        </group>
      </Float>

      {/* Sparkle particles around the crystal */}
      <Sparkles count={typeof window !== 'undefined' && window.innerWidth < 1024 ? 20 : 50} />
    </group>
  );
}

/* ─── Scene ──────────────────────────────────────────────────── */
function Scene({
  projects,
  activeIndex,
}: {
  projects: any[];
  activeIndex: number;
}) {
  const { size } = useThree();
  const isMobile = size.width < 1024;
  const groupScale = isMobile ? 0.6 : 1;
  const groupPosition = isMobile ? new THREE.Vector3(0, 1.5, 0) : new THREE.Vector3(0, 0, 0);

  return (
    <group scale={groupScale} position={groupPosition}>
      {/* Dramatic lighting */}
      <ambientLight intensity={0.1} color="#4444aa" />
      <directionalLight position={[5, 8, 5]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[-8, -3, -5]} intensity={0.4} color="#6E7BFF" />
      <spotLight position={[0, 12, 5]} angle={0.25} penumbra={1} intensity={1.5} color="#aabbff" />
      <pointLight position={[0, -5, 3]} intensity={0.3} color="#4444ff" />

      {/* Dark space HDR */}
      <Environment preset="night" />

      {/* Deep space starfield */}
      <Starfield count={isMobile ? 150 : 400} />

      {/* Small floating crystal shards */}
      <FloatingShards count={isMobile ? 8 : 15} />

      {/* Main crystal with project image */}
      <Crystal
        activeIndex={activeIndex}
        imageUrls={projects.map((p) => p.image)}
      />

      {/* Drag-to-rotate only on desktop so mobile can scroll freely */}
      {!isMobile && (
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          dampingFactor={0.05}
          rotateSpeed={0.4}
        />
      )}
    </group>
  );
}

/* ─── Main exported component ─────────────────────────────────── */
export default function WebGLGallery({ projects }: { projects: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-50px" });
  const [canvasReady, setCanvasReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const i = Math.floor(v * (projects.length - 0.01));
      setActiveIndex(Math.min(Math.max(i, 0), projects.length - 1));
    });
  }, [scrollYProgress, projects.length]);

  useEffect(() => {
    if (isInView && !canvasReady) {
      const timer = setTimeout(() => setCanvasReady(true), 400);
      return () => clearTimeout(timer);
    }
  }, [isInView, canvasReady]);

  return (
    <section
      ref={containerRef}
      className="relative block"
      style={{ height: `${projects.length * 100}vh` }}
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden" style={{ background: "linear-gradient(180deg, #06061a 0%, #0a0a2e 50%, #060618 100%)" }}>

        {/* 3D Canvas */}
        <div className="absolute inset-0 z-0 pointer-events-none lg:pointer-events-auto">
          {canvasReady ? (
            <Canvas
              camera={{ position: [0, 0, 9], fov: 42 }}
              dpr={[1, 1.5]}
              gl={{
                antialias: true,
                alpha: false,
                powerPreference: "high-performance",
                failIfMajorPerformanceCaveat: false,
              }}
              onCreated={({ gl }) => {
                gl.setClearColor(new THREE.Color("#06061a"), 1);
                gl.toneMapping = THREE.ACESFilmicToneMapping;
                gl.toneMappingExposure = 1.2;
              }}
            >
              <Suspense fallback={null}>
                <Scene projects={projects} activeIndex={activeIndex} />
              </Suspense>
            </Canvas>
          ) : (
            <div className="flex h-full w-full items-center justify-center" style={{ background: "#06061a" }}>
              <div className="h-20 w-20 animate-pulse rounded-full border border-indigo-500/20" />
            </div>
          )}
        </div>

        {/* HTML overlay — bottom layout like Noomo */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 px-[5vw] pb-8 lg:pb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-12"
            >
              {/* Left: Project name, Role + CTA */}
              <div className="flex flex-col gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                  {projects[activeIndex].category} <span className="mx-2 opacity-50">/</span> {projects[activeIndex].role}
                </span>
                <h3 className="font-display text-4xl font-bold tracking-tight text-white">
                  {projects[activeIndex].name}
                </h3>
                <div className="pointer-events-auto mt-4 w-max">
                  <Link
                    href={projects[activeIndex].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 rounded-full border border-indigo-400/40 bg-indigo-500/10 px-6 py-3 font-mono text-[11px] uppercase tracking-widest text-indigo-300 transition-all hover:border-indigo-400 hover:bg-indigo-500/20"
                  >
                    View Case Study
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>

              {/* Right: Description, Result + tags */}
              <div className="flex max-w-lg flex-col gap-4 text-right">
                <p className="font-body text-sm leading-relaxed text-white/70">
                  {projects[activeIndex].description}
                </p>
                <p className="font-body text-[13px] italic text-indigo-300">
                  &ldquo;{projects[activeIndex].result}&rdquo;
                </p>
                <div className="flex flex-wrap justify-end gap-2 mt-2">
                  {projects[activeIndex].stack.map((t: string) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/15 px-3 py-1 font-mono text-[9px] uppercase tracking-wider text-white/40"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide counter */}
        <div className="absolute right-[5vw] top-1/2 z-10 -translate-y-1/2">
          <div className="flex flex-col items-center gap-2">
            {projects.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex ? "scale-150 bg-indigo-400" : "bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 z-20 h-[2px] bg-white/5">
          <motion.div
            style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
            className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400"
          />
        </div>
      </div>
    </section>
  );
}
