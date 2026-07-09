"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, MeshDistortMaterial, Sphere, Float } from "@react-three/drei";
import { useInView } from "framer-motion";
import * as THREE from "three";

function LiquidSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  const { size } = useThree();
  const isMobile = size.width < 1024;
  const sphereScale = isMobile ? 1.5 : 2.5;

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;
    
    // Slow continuous rotation
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;

    // React to mouse
    const pointer = state.pointer; // normalized coordinates -1 to +1
    meshRef.current.rotation.y += pointer.x * 0.05;
    meshRef.current.rotation.x += -pointer.y * 0.05;
    
    // Pulse distortion
    materialRef.current.distort = THREE.MathUtils.lerp(
      materialRef.current.distort,
      0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.1,
      0.1
    );
  });

  const segments = isMobile ? 32 : 64;

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, segments, segments]} scale={sphereScale}>
        <MeshDistortMaterial
          ref={materialRef}
          color="#1a1a4a"
          envMapIntensity={3}
          clearcoat={1}
          clearcoatRoughness={0}
          metalness={0.9}
          roughness={0.1}
          distort={0.4}
          speed={2}
          emissive="#000033"
        />
      </Sphere>
      
      {/* Surrounding floating particles */}
      <FloatingParticles count={isMobile ? 20 : 60} />
    </Float>
  );
}

function FloatingParticles({ count = 60 }: { count?: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
      ],
      speed: 0.1 + Math.random() * 0.5,
      factor: Math.random() * Math.PI,
    }));
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    particles.forEach((particle, i) => {
      const t = state.clock.elapsedTime * particle.speed;
      dummy.position.set(
        particle.position[0] + Math.sin(t + particle.factor) * 0.5,
        particle.position[1] + Math.cos(t + particle.factor) * 0.5,
        particle.position[2] + Math.sin(t * 0.5 + particle.factor) * 0.5
      );
      dummy.scale.setScalar(0.05);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.05;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshPhysicalMaterial 
        color="#8899ff"
        emissive="#4444ff"
        emissiveIntensity={1}
        transparent
        opacity={0.6}
      />
    </instancedMesh>
  );
}

export default function WebGLInteractiveSphere() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "0px 0px 500px 0px" });

  return (
    <div ref={ref} className="absolute inset-0 z-0">
      {isInView && (
        <Canvas
          camera={{ position: [0, 0, 8], fov: 45 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        >
          <ambientLight intensity={0.5} color="#4455aa" />
          <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
          <directionalLight position={[-10, -10, -5]} intensity={1} color="#FF8A3D" />
          
          <Environment preset="night" />
          <LiquidSphere />
        </Canvas>
      )}
    </div>
  );
}
