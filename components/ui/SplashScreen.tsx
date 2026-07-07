"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function SplashScreen() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [counter, setCounter] = useState(0);
  const [logoOpacity, setLogoOpacity] = useState(0);
  const [taglineOpacity, setTaglineOpacity] = useState(0);
  const [containerOpacity, setContainerOpacity] = useState(1);
  const [containerScale, setContainerScale] = useState(1);
  const [pulseScale, setPulseScale] = useState(1);
  const [pulseOpacity, setPulseOpacity] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    // Fallback for reduced motion: CSS animations instead of particles
    if (reduced) {
      const startTime = performance.now();
      let rafId: number;
      const animateFallback = (time: number) => {
        rafId = requestAnimationFrame(animateFallback);
        const t = (time - startTime) / 1000;
        
        if (t >= 0.3 && t <= 3.0) {
          const progress = (t - 0.3) / 2.7;
          setLogoOpacity(progress); // Kept for fallback only
        } else if (t > 3.0) {
          setLogoOpacity(1);
        }

        if (t >= 0.3 && t <= 4.3) {
          const count = Math.min(100, Math.floor(((t - 0.3) / 4.0) * 100));
          setCounter(count);
        }

        if (t >= 1.5 && t <= 4.3) {
          setTaglineOpacity(Math.min(1, (t - 1.5) / 1.0)); // Fades in over 1s
        }

        if (t >= 4.3 && t <= 5.0) {
          const exitProgress = (t - 4.3) / 0.7;
          setContainerOpacity(1 - exitProgress);
          setContainerScale(1 - (exitProgress * 0.05));
        }

        if (t > 5.0) {
          setIsVisible(false);
          cancelAnimationFrame(rafId);
        }
      };
      rafId = requestAnimationFrame(animateFallback);
      return () => cancelAnimationFrame(rafId);
    }

    if (!containerRef.current) return;
    const container = containerRef.current;

    let rafId: number;
    let THREE: any = null;

    // Load Image for Pixel Sampling
    const img = new window.Image();
    let validPoints: {x: number, y: number}[] = [];
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, img.width, img.height).data;
      
      const aspect = img.width / img.height;
      
      // Sample pixels (Checking brightness instead of alpha since image has a black bg)
      for (let y = 0; y < img.height; y += 4) {
        for (let x = 0; x < img.width; x += 4) {
          const idx = (y * img.width + x) * 4;
          const r = imgData[idx];
          const g = imgData[idx + 1];
          const b = imgData[idx + 2];
          const brightness = (r + g + b) / 3;
          
          if (brightness > 20) { // If it's not totally black
            // Normalize -1 to 1 based on height, maintaining aspect ratio for x
            const ny = -(y / img.height) * 2 + 1;
            const nx = ((x / img.width) * 2 - 1) * aspect;
            validPoints.push({ x: nx, y: ny });
          }
        }
      }
      
      // Load Three.js after image is processed
      loadThreeJS();
    };
    
    // In case image fails to load, proceed without logo particles
    img.onerror = loadThreeJS;

    img.src = '/logo.png';

    function loadThreeJS() {
      // @ts-expect-error THREE is loaded globally from CDN
      if (window.THREE) {
        // @ts-expect-error
        THREE = window.THREE;
        initScene();
        return;
      }

      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js";
      script.async = true;
      script.onload = () => {
        // @ts-expect-error
        THREE = window.THREE;
        if (!THREE) return;
        initScene();
      };
      document.body.appendChild(script);
    }

    function initScene() {
      container.innerHTML = "";
      
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;
      const aspect = width / height;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      const count = 3000;
      const positions = new Float32Array(count * 3);
      const initialPositions = new Float32Array(count * 3);
      const logoPositions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const sizes = new Float32Array(count);

      const colorViolet = new THREE.Color(0x6E7BFF);
      const colorCyan = new THREE.Color(0xFF8A3D);

      for (let i = 0; i < count; i++) {
        // Initial random positions (drifting)
        const ix = (Math.random() - 0.5) * 15;
        const iy = (Math.random() - 0.5) * 15;
        const iz = (Math.random() - 0.5) * 15;
        
        positions[i * 3] = ix;
        positions[i * 3 + 1] = iy;
        positions[i * 3 + 2] = iz;
        
        initialPositions[i * 3] = ix;
        initialPositions[i * 3 + 1] = iy;
        initialPositions[i * 3 + 2] = iz;

        // Target positions (logo)
        if (validPoints.length > 0) {
          const pt = validPoints[Math.floor(Math.random() * validPoints.length)];
          // Dynamic scale: 1.0 for mobile, 1.5 for tablets, 2.0 for desktop
          const scale = aspect < 0.8 ? 1.0 : (aspect < 1.2 ? 1.5 : 2.0); 
          logoPositions[i * 3] = pt.x * scale;
          logoPositions[i * 3 + 1] = pt.y * scale;
          logoPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.2; // slight depth
        } else {
          logoPositions[i * 3] = 0;
          logoPositions[i * 3 + 1] = 0;
          logoPositions[i * 3 + 2] = 0;
        }

        const mix = Math.random() > 0.5 ? colorViolet : colorCyan;
        colors[i * 3] = mix.r;
        colors[i * 3 + 1] = mix.g;
        colors[i * 3 + 2] = mix.b;

        sizes[i] = Math.random() * 2;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

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

      let startTime = performance.now();
      
      const animate = (time: number) => {
        rafId = requestAnimationFrame(animate);
        const t = (time - startTime) / 1000;

        const posAttr = geometry.attributes.position;
        
        // --- 0.0s - 0.3s : Drifting ---
        if (t < 0.3) {
          for (let i = 0; i < count; i++) {
            // Drift slightly
            posAttr.array[i * 3] += (Math.random() - 0.5) * 0.01;
            posAttr.array[i * 3 + 1] += (Math.random() - 0.5) * 0.01;
            posAttr.array[i * 3 + 2] += (Math.random() - 0.5) * 0.01;
          }
        } 
        // --- 0.3s - 3.0s : Converge to Logo ---
        else if (t >= 0.3 && t < 3.0) {
          const progress = (t - 0.3) / 2.7; 
          // Easing: easeOutCubic
          const ease = 1 - Math.pow(1 - progress, 3);
          
          for (let i = 0; i < count; i++) {
            const currentX = posAttr.array[i * 3];
            const currentY = posAttr.array[i * 3 + 1];
            const currentZ = posAttr.array[i * 3 + 2];
            
            const targetX = logoPositions[i * 3];
            const targetY = logoPositions[i * 3 + 1];
            const targetZ = logoPositions[i * 3 + 2];
            
            // Lerp towards target
            posAttr.array[i * 3] += (targetX - currentX) * 0.06;
            posAttr.array[i * 3 + 1] += (targetY - currentY) * 0.06;
            posAttr.array[i * 3 + 2] += (targetZ - currentZ) * 0.06;
          }
          
        }
        // --- > 3.0s : Hold Logo shape ---
        else {
          setLogoOpacity(1);
          // Very subtle floating for particles while in logo shape
          const floatTime = time * 0.001;
          for (let i = 0; i < count; i++) {
            const tx = logoPositions[i * 3];
            const ty = logoPositions[i * 3 + 1];
            const tz = logoPositions[i * 3 + 2];
            
            posAttr.array[i * 3] += (tx - posAttr.array[i * 3]) * 0.1;
            posAttr.array[i * 3 + 1] += (ty - posAttr.array[i * 3 + 1]) * 0.1;
            posAttr.array[i * 3 + 2] += (tz - posAttr.array[i * 3 + 2]) * 0.1;
          }
        }

        posAttr.needsUpdate = true;

        // Global DOM sync based on time (matches fallback)
        if (t >= 0.3 && t <= 4.3) {
          const cnt = Math.min(100, Math.floor(((t - 0.3) / 4.0) * 100));
          setCounter(cnt);
        } else if (t > 4.3) {
          setCounter(100);
        }

        if (t >= 1.5 && t <= 4.3) {
          setTaglineOpacity(Math.min(1, (t - 1.5) / 1.0));
        }

        if (t >= 3.0 && t <= 3.5) {
          const pulseProgress = (t - 3.0) / 0.5;
          setPulseScale(1 + (pulseProgress * 0.5));
          setPulseOpacity(0.5 * (1 - pulseProgress));
        } else if (t > 3.5) {
          setPulseOpacity(0);
        }

        if (t >= 4.3 && t <= 5.0) {
          const exitProgress = (t - 4.3) / 0.7;
          setContainerOpacity(1 - exitProgress);
          setContainerScale(1 - (exitProgress * 0.05));
          material.opacity = 0.9 * (1 - exitProgress);
        }

        if (t > 5.0) {
          setIsVisible(false);
          cancelAnimationFrame(rafId);
        }

        renderer.render(scene, camera);
      };

      rafId = requestAnimationFrame(animate);

      // --- Resize Handler ---
      const onResize = () => {
        const w = container.clientWidth || window.innerWidth;
        const h = container.clientHeight || window.innerHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", onResize);

      // --- Cleanup ---
      return () => {
        cancelAnimationFrame(rafId);
        window.removeEventListener("resize", onResize);
        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
    }

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [reduced, isVisible]);

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] bg-bg-base overflow-hidden flex flex-col items-center justify-center"
      style={{
        opacity: containerOpacity,
        transform: `scale(${containerScale})`,
        transition: 'opacity 0.1s linear, transform 0.1s linear'
      }}
    >
      {/* 3D Particle Canvas */}
      <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none" />
      
      {/* HTML Overlay Layer */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full pointer-events-none">
        
        <div className="relative w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center">
          {/* Fallback Real Logo Overlay (Only shows if particles are disabled) */}
          {reduced && (
            <div 
              className="absolute inset-0 mix-blend-screen"
              style={{ opacity: logoOpacity, transition: 'opacity 0.1s linear' }}
            >
              <Image 
                src="/logo.png" 
                alt="Logo" 
                fill
                className="object-contain"
                priority
              />
            </div>
          )}
          
          {/* Pulse Effect */}
          <div 
            className="absolute inset-0 rounded-full bg-gradient-to-tr from-accent-violet to-accent-cyan blur-2xl -z-10"
            style={{ 
              opacity: pulseOpacity, 
              transform: `scale(${pulseScale})`,
              transition: 'opacity 0.05s linear, transform 0.05s linear'
            }}
          />
        </div>
        
        {/* Terminal Counter and Tagline */}
        <div className="absolute inset-0 w-full px-6 flex flex-col items-center justify-center gap-3 text-center z-20">
          {/* Counter */}
          <p className="font-mono text-text-muted text-sm tracking-widest opacity-80">
            {`> initializing_studio... ${counter}%`}
          </p>
          
          {/* Tagline */}
          <p 
            className="font-mono text-accent-cyan text-sm tracking-[0.2em] uppercase font-bold"
            style={{ opacity: taglineOpacity, transition: 'opacity 0.1s linear' }}
          >
            BUILDING WHAT'S NEXT
          </p>
        </div>
        
      </div>
    </div>
  );
}
