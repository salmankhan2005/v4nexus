"use client";
import ScrollReveal from "@/components/ui/ScrollReveal";
import RevealText from "@/components/ui/RevealText";
import MagneticButton from "@/components/ui/MagneticButton";
import { motion } from "framer-motion";

export default function CtaBand() {
  return (
    <section className="px-6 py-28 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="section-divider mb-20" />
        <ScrollReveal>
          <div
            data-cursor
            className="surface-card blueprint-grid group relative flex flex-col items-start justify-between gap-10 overflow-hidden rounded-2xl p-12 lg:flex-row lg:items-center lg:p-20"
          >
            <motion.div
              aria-hidden
              animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              className="pointer-events-none absolute -left-1/4 -top-1/2 h-[500px] w-[500px] rounded-full opacity-40"
              style={{ background: "radial-gradient(circle, rgba(110,123,255,0.35) 0%, transparent 70%)" }}
            />
            <motion.div
              aria-hidden
              animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
              className="pointer-events-none absolute -bottom-1/2 -right-1/4 h-[420px] w-[420px] rounded-full opacity-30"
              style={{ background: "radial-gradient(circle, rgba(255,138,61,0.35) 0%, transparent 70%)" }}
            />

            <div className="relative z-10 max-w-2xl">
              <p className="label-mono-accent mb-4">{"// ready to build?"}</p>
              <RevealText
                as="h2"
                text="Your idea deserves production-grade code."
                emphasis={{ "production-grade": "solar" }}
                className="display-xl block text-text-primary"
              />
              <p className="mt-5 max-w-lg font-body text-lg text-text-muted">
                Tell us what you&apos;re building. We&apos;ll scope it, price it, and put a start date on
                the calendar — all in one call.
              </p>
            </div>

            <div className="relative z-10 flex flex-col gap-4">
              <span data-cursor-label="Let's talk">
                <MagneticButton href="/contact" variant="coral">
                  Book a call
                </MagneticButton>
              </span>
              <p className="label-mono text-center">No commitment needed.</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
