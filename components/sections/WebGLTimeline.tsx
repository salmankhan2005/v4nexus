"use client";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Html, Line, PerspectiveCamera } from "@react-three/drei";
import { useScroll, useInView } from "framer-motion";
import * as THREE from "three";

interface Milestone {
  year: string;
  event: string;
}

function TimelineScene({ milestones, scrollYProgress }: { milestones: Milestone[]; scrollYProgress: any }) {
  const cameraGroup = useRef<THREE.Group>(null);
  const pathLength = milestones.length * 4;

  // Generate a winding 3D path for the line
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= milestones.length; i++) {
      const z = -i * 4;
      const x = Math.sin(i * 1.5) * 2;
      const y = Math.cos(i * 1.5) * 1.5;
      pts.push(new THREE.Vector3(x, y, z));
    }
    // Interpolate for smooth curve
    const curve = new THREE.CatmullRomCurve3(pts);
    return curve.getPoints(100);
  }, [milestones.length]);

  useFrame(() => {
    if (!cameraGroup.current) return;
    const progress = scrollYProgress.get(); // 0 to 1
    // Move camera along Z axis based on scroll
    const targetZ = -progress * (pathLength - 2);
    cameraGroup.current.position.z = THREE.MathUtils.lerp(cameraGroup.current.position.z, targetZ, 0.1);
  });

  return (
    <>
      <group ref={cameraGroup}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />
      </group>

      {/* The glowing path */}
      <Line points={points} color="#6E7BFF" lineWidth={3} dashed={false} />

      {/* The milestone nodes */}
      {milestones.map((m, i) => {
        const z = -i * 4;
        const x = Math.sin(i * 1.5) * 2;
        const y = Math.cos(i * 1.5) * 1.5;

        return (
          <group key={m.year} position={[x, y, z]}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
              <mesh>
                <icosahedronGeometry args={[0.3, 0]} />
                <meshPhysicalMaterial
                  color="#FF8A3D"
                  metalness={0.5}
                  roughness={0.1}
                  transmission={0.8}
                  ior={1.5}
                  emissive="#FF8A3D"
                  emissiveIntensity={0.5}
                />
              </mesh>
            </Float>
            <Html position={[0.5, 0.5, 0]} center className="pointer-events-none w-64">
              <div className="rounded-lg border border-white/10 bg-black/50 p-4 backdrop-blur-md">
                <span className="font-mono text-lg font-bold text-accent-cyan">{m.year}</span>
                <p className="mt-1 font-body text-sm text-white/80">{m.event}</p>
              </div>
            </Html>
          </group>
        );
      })}
    </>
  );
}

export default function WebGLTimeline({ milestones }: { milestones: Milestone[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "200px" });
  const [mounted, setMounted] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"],
  });

  useEffect(() => {
    if (isInView && !mounted) setMounted(true);
  }, [isInView, mounted]);

  return (
    <div ref={containerRef} className="relative h-[150vh] w-full">
      <div className="sticky top-0 h-[60vh] w-full overflow-hidden rounded-xl border border-white/[0.05] bg-bg-surface/30">
        {mounted ? (
          <Canvas dpr={[1, 1.5]} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
            <ambientLight intensity={0.5} color="#4455aa" />
            <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
            <Environment preset="night" />
            <TimelineScene milestones={milestones} scrollYProgress={scrollYProgress} />
          </Canvas>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <div className="h-12 w-12 animate-pulse rounded-full border border-white/20" />
          </div>
        )}
      </div>
    </div>
  );
}
