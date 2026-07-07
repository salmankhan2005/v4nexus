"use client";
import { motion, useScroll, useSpring } from "framer-motion";

/** Hairline progress bar pinned to the very top of the viewport. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[9997] h-[2px] w-full origin-left bg-gradient-to-r from-accent-violet via-accent-cyan to-accent-violet"
    />
  );
}
