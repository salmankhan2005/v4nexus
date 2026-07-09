"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";

const ShaderBackground = dynamic(() => import("./ShaderBackground"), { ssr: false });
const WebGLInteractiveSphere = dynamic(() => import("./WebGLInteractiveSphere"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-32 w-32 animate-pulse rounded-full border border-accent-violet/30" />
    </div>
  ),
});

const SUBHEAD =
  "A senior product studio for founders in a hurry. Design, engineering, and deployment under one roof — from empty repo to production in weeks, not quarters.";

// Mask-reveal for a single headline line
const line = {
  hidden: { y: "110%", rotate: 3 },
  visible: { y: "0%", rotate: 0 },
};

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden pt-20 blueprint-grid">
      <ShaderBackground />

      {/* legibility + depth grading */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg-base/40 via-bg-base/20 to-bg-base" />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/4 h-[520px] w-[520px] rounded-full opacity-50"
        style={{ background: "radial-gradient(circle, rgba(110,123,255,0.18) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 py-16 lg:grid-cols-12 lg:gap-6 lg:px-8 lg:py-0">
        {/* ── Left — headline ─────────────────────────────── */}
        <div className="flex flex-col gap-7 lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex items-center gap-4"
          >
            <span className="live-dot" />
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-text-muted">
              Software &amp; product studio
            </span>
            <span className="hidden h-px w-10 bg-white/15 sm:block" />
            <span className="hidden font-mono text-[11px] uppercase tracking-[0.22em] text-text-muted sm:block">
              Est. 2020
            </span>
          </motion.div>

          <h1 className="display-hero text-text-primary">
            {["We build", "digital products"].map((l, i) => (
              <span key={l} className="reveal-mask block">
                <motion.span
                  className={`block ${i === 1 ? 'glitch-text glitch-on-load glitch-hover' : ''}`}
                  data-text={l}
                  variants={line}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.35 + i * 0.12 }}
                >
                  {l}
                </motion.span>
              </span>
            ))}
            <span className="reveal-mask block">
              <motion.span
                className="block"
                variants={line}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.59 }}
              >
                that <span className="em em-solar">ship.</span>
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="max-w-xl font-body text-lg leading-relaxed text-text-muted"
          >
            {SUBHEAD}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.95 }}
            className="mt-1 flex flex-wrap gap-4"
          >
            <span data-cursor-label="Let's talk">
              <MagneticButton href="/contact" variant="coral">
                Start a project
              </MagneticButton>
            </span>
            <span data-cursor-label="View">
              <MagneticButton href="/work" variant="ghost">
                See the work
              </MagneticButton>
            </span>
          </motion.div>
        </div>

        {/* ── Right — particle instrument ─────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="relative mt-8 h-[350px] w-full lg:col-span-5 lg:mt-0 lg:h-[560px] lg:-mr-10 xl:-mr-24"
        >
          <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 lg:left-auto lg:right-0 lg:h-[600px] lg:w-[600px] lg:translate-x-0">
            <WebGLInteractiveSphere />
          </div>
          {/* console readout overlay */}
          <div className="pointer-events-none absolute bottom-2 left-2 hidden font-mono text-[10px] uppercase leading-relaxed tracking-widest text-text-muted/70 lg:block">
            <p>&gt; nexus.core — online</p>
            <p>&gt; render 60fps · nodes 3000</p>
            <p className="text-accent-cyan">&gt; status: building_whats_next</p>
          </div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted">scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="h-8 w-px bg-gradient-to-b from-accent-violet to-transparent"
        />
      </motion.div>
    </section>
  );
}
