"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
  wrap
} from "framer-motion";

const WORDS = [
  "Web Apps", "Mobile", "AI Products", "Design Systems",
  "API Platforms", "MVPs", "Automation", "Cloud",
];

function ParallaxText({ children, baseVelocity = 100 }: { children: React.ReactNode; baseVelocity: number }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });
  const skewX = useTransform(smoothVelocity, [-1000, 1000], [5, -5]);

  // Handle seamless wrapping. The magic number depends on the width of the content.
  // We'll wrap at -50% to 0%. Since we duplicate children 4 times, -50% wraps perfectly.
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    
    // Add velocity to movement
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="flex whitespace-nowrap flex-nowrap overflow-hidden">
      <motion.div className="flex items-center gap-8 whitespace-nowrap flex-nowrap" style={{ x, skewX }}>
        {children}
        {children}
        {children}
        {children}
      </motion.div>
    </div>
  );
}

/** Oversized scrolling word band — the studio's disciplines, loud. */
export default function KineticTicker() {
  const row = [...WORDS, ...WORDS];
  
  return (
    <section className="relative overflow-hidden border-y border-white/[0.06] bg-bg-surface/40 py-8">
      <ParallaxText baseVelocity={-2}>
        <div className="flex items-center gap-8 pr-8">
          {row.map((w, i) => (
            <span key={i} className="flex items-center gap-8">
              <span className="font-display text-4xl font-bold tracking-tight text-text-primary/90 md:text-6xl">
                {w}
              </span>
              <span className="text-3xl text-accent-cyan md:text-5xl">✳</span>
            </span>
          ))}
        </div>
      </ParallaxText>
      
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg-base to-transparent md:w-40 z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg-base to-transparent md:w-40 z-10" />
    </section>
  );
}
