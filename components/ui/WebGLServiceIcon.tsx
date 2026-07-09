"use client";
import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, RoundedBox } from "@react-three/drei";
import { useInView } from "framer-motion";
import * as THREE from "three";

// ── 1. Web Development (Laptop) ──────────────
function WebIcon() {
  const group = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (group.current) {
      group.current.rotation.y = s.clock.elapsedTime * 0.4;
      group.current.position.y = Math.sin(s.clock.elapsedTime) * 0.1;
    }
  });
  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={group} scale={0.8} rotation={[0.2, -0.5, 0]}>
        {/* Base */}
        <RoundedBox args={[3, 0.15, 2]} radius={0.05} smoothness={4} position={[0, -0.075, 0]}>
          <meshPhysicalMaterial color="#c0c0c0" metalness={0.8} roughness={0.2} clearcoat={1} />
        </RoundedBox>
        {/* Keyboard area (dark inset) */}
        <mesh position={[0, 0.01, -0.2]}>
          <boxGeometry args={[2.6, 0.01, 1.2]} />
          <meshBasicMaterial color="#111" />
        </mesh>
        {/* Trackpad */}
        <mesh position={[0, 0.01, 0.6]}>
          <boxGeometry args={[0.8, 0.01, 0.5]} />
          <meshBasicMaterial color="#333" />
        </mesh>
        {/* Screen (hinged at the back) */}
        <group position={[0, 0, -0.9]} rotation={[-0.3, 0, 0]}>
          {/* Lid */}
          <RoundedBox args={[3, 2, 0.1]} radius={0.05} smoothness={4} position={[0, 1, -0.05]}>
            <meshPhysicalMaterial color="#c0c0c0" metalness={0.8} roughness={0.2} clearcoat={1} />
          </RoundedBox>
          {/* Screen glow */}
          <mesh position={[0, 1, 0.01]}>
            <planeGeometry args={[2.8, 1.8]} />
            <meshBasicMaterial color="#6E7BFF" />
          </mesh>
        </group>
      </group>
    </Float>
  );
}

// ── 2. Mobile Development (Smartphone) ──────────────
function MobileIcon() {
  const group = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (group.current) {
      group.current.rotation.y = s.clock.elapsedTime * 0.5;
      group.current.rotation.z = Math.sin(s.clock.elapsedTime * 0.8) * 0.1;
    }
  });
  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={group} scale={1.2}>
        {/* Body */}
        <RoundedBox args={[1.5, 3, 0.15]} radius={0.15} smoothness={4}>
          <meshPhysicalMaterial color="#333" metalness={0.9} roughness={0.1} clearcoat={1} />
        </RoundedBox>
        {/* Screen */}
        <mesh position={[0, 0, 0.08]}>
          <planeGeometry args={[1.35, 2.8]} />
          <meshBasicMaterial color="#FF8A3D" />
        </mesh>
        {/* Camera notch */}
        <RoundedBox args={[0.4, 0.1, 0.01]} radius={0.05} position={[0, 1.3, 0.085]}>
          <meshBasicMaterial color="#000" />
        </RoundedBox>
      </group>
    </Float>
  );
}

// ── 3. Product Design (Tablet / Pencil / Palette) ──────────────
function DesignIcon() {
  const group = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (group.current) {
      group.current.rotation.y = s.clock.elapsedTime * 0.4;
      group.current.rotation.x = 0.5 + Math.sin(s.clock.elapsedTime) * 0.1;
    }
  });
  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={group} scale={0.9} rotation={[0.5, 0, 0]}>
        {/* Drawing Tablet */}
        <RoundedBox args={[3.2, 2.2, 0.15]} radius={0.1} smoothness={4} position={[0, 0, 0]}>
          <meshPhysicalMaterial color="#444" metalness={0.6} roughness={0.4} />
        </RoundedBox>
        {/* Tablet Screen */}
        <mesh position={[0, 0, 0.08]}>
          <planeGeometry args={[2.8, 1.8]} />
          <meshBasicMaterial color="#FF7A45" />
        </mesh>
        {/* Stylus Pencil */}
        <group position={[0.5, -0.2, 0.3]} rotation={[0.2, 0, -0.5]}>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 1.8, 16]} />
            <meshPhysicalMaterial color="#e0e0e0" metalness={0.5} roughness={0.2} />
          </mesh>
          <mesh position={[0, -1.0, 0]}>
            <coneGeometry args={[0.05, 0.2, 16]} />
            <meshPhysicalMaterial color="#222" />
          </mesh>
        </group>
      </group>
    </Float>
  );
}

// ── 4. API Integration (Server Stack) ──────────────
function ApiIcon() {
  const group = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (group.current) {
      group.current.rotation.y = s.clock.elapsedTime * 0.4;
    }
  });
  
  const ServerUnit = ({ y, color }: { y: number, color: string }) => (
    <group position={[0, y, 0]}>
      {/* Chassis */}
      <RoundedBox args={[2, 0.4, 2]} radius={0.05} smoothness={2}>
        <meshPhysicalMaterial color="#222" metalness={0.7} roughness={0.3} clearcoat={0.5} />
      </RoundedBox>
      {/* Front panel details */}
      <mesh position={[-0.8, 0, 1.01]}>
        <planeGeometry args={[0.1, 0.1]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh position={[-0.6, 0, 1.01]}>
        <planeGeometry args={[0.1, 0.1]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh position={[0, 0, 1.01]}>
        <boxGeometry args={[1, 0.1, 0.01]} />
        <meshBasicMaterial color="#444" />
      </mesh>
    </group>
  );

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={group} scale={1.1} rotation={[0.2, -0.5, 0]}>
        <ServerUnit y={0.6} color="#6E7BFF" />
        <ServerUnit y={0} color="#FF8A3D" />
        <ServerUnit y={-0.6} color="#6E7BFF" />
      </group>
    </Float>
  );
}

export default function WebGLServiceIcon({ type, className }: { type: string; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "200px" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isInView && !mounted) setMounted(true);
  }, [isInView, mounted]);

  return (
    <div ref={containerRef} className={className}>
      {mounted ? (
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        >
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 10, 5]} intensity={2} />
          <directionalLight position={[-5, -5, -5]} intensity={0.5} color="#FF8A3D" />
          <Environment preset="night" />
          {type === "web" && <WebIcon />}
          {type === "mobile" && <MobileIcon />}
          {type === "design" && <DesignIcon />}
          {type === "api" && <ApiIcon />}
        </Canvas>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <div className="h-12 w-12 animate-pulse rounded-full border border-white/20" />
        </div>
      )}
    </div>
  );
}
