"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";

// Lazy-load heavy GPU components
const ShaderBackground = dynamic(() => import("./ShaderBackground"), { ssr: false });
const ParticleCanvas   = dynamic(() => import("./ParticleCanvas"),   {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-32 h-32 rounded-full border border-accent-violet/30 animate-pulse" />
    </div>
  ),
});

const EYEBROW  = "// web & app dev studio";
const HEADLINE = ["We build software", "that ships."];
const SUBHEAD  =
  "From zero to production in weeks, not quarters. Your product, done right — design, code, and deployment included.";

export default function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden pt-16">
      {/* ── Stitch Shader Background ──────────────────────────── */}
      <ShaderBackground />

      {/* Overlay to keep text legible over the shader */}
      <div className="absolute inset-0 bg-bg-base/50 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-0 items-center py-20 lg:py-0">

        {/* ── Left 60% — Headline + CTAs ───────────────────────── */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-mono text-[11px] tracking-[0.15em] uppercase text-accent-cyan"
          >
            {EYEBROW}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-text-primary leading-[1.05] tracking-tight"
          >
            {HEADLINE[0]}
            <br />
            <span className="text-gradient-vio-cyan inline-block pb-1">
              {HEADLINE[1]}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="font-body text-text-muted text-lg leading-relaxed max-w-lg"
          >
            {SUBHEAD}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-wrap gap-4 mt-2"
          >
            <MagneticButton href="/contact" variant="coral">
              Book a Call
            </MagneticButton>
            <MagneticButton href="/work" variant="ghost">
              See Our Work
            </MagneticButton>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="flex gap-8 mt-6 pt-6 border-t border-white/[0.06]"
          >
            {[
              { num: "40+",  label: "projects shipped"    },
              { num: "8wk",  label: "avg. time to launch" },
              { num: "100%", label: "client satisfaction" },
            ].map(({ num, label }) => (
              <div key={label}>
                <p className="font-mono font-semibold text-2xl text-text-primary">{num}</p>
                <p className="font-mono text-[10px] tracking-widest uppercase text-text-muted mt-0.5">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right 40% — Stitch Three.js Particle System ─────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.2 }}
          className="lg:col-span-2 h-[380px] lg:h-[580px] lg:-mr-16 xl:-mr-32"
        >
          <ParticleCanvas />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] tracking-widest uppercase text-text-muted">scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-accent-violet to-transparent"
        />
      </motion.div>
    </section>
  );
}
