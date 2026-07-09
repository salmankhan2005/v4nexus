"use client";

import { motion } from "framer-motion";

export default function AmbientMesh() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden bg-bg-base">
      {/* 
        We use very large blur and low opacity to create an ambient, 
        premium "Noomo" or "Linear" style glow in the background.
      */}
      <motion.div
        animate={{
          x: ["-10%", "10%", "-10%"],
          y: ["-10%", "10%", "-10%"],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-[40%] -left-[10%] h-[100%] w-[80%] rounded-full bg-accent-violet mix-blend-screen opacity-[0.06] blur-[140px] will-change-transform"
      />

      <motion.div
        animate={{
          x: ["10%", "-10%", "10%"],
          y: ["10%", "-10%", "10%"],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[20%] right-[0%] h-[80%] w-[60%] rounded-full bg-accent-cyan mix-blend-screen opacity-[0.04] blur-[160px] will-change-transform"
      />
    </div>
  );
}
