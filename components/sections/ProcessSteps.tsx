"use client";
import ScrollReveal from "@/components/ui/ScrollReveal";
import RevealText from "@/components/ui/RevealText";
import LottieClient from "@/components/ui/LottieClient";
import { motion } from "framer-motion";
import businessPlanAnim from "@/components/animations/business_plan.json";

const STEPS = [
  {
    num: "01",
    title: "Discover",
    desc: "We map your goals, users, and constraints in a structured kickoff — no guesswork, just clarity.",
  },
  {
    num: "02",
    title: "Design",
    desc: "High-fidelity wireframes and interactive prototypes before a single line of code is written.",
  },
  {
    num: "03",
    title: "Build",
    desc: "Iterative sprints with weekly demos. You see real working software, not status updates.",
  },
  {
    num: "04",
    title: "Ship",
    desc: "CI/CD deployment, monitoring set up, docs handed over. You own it completely from day one.",
  },
];

export default function ProcessSteps() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-28 lg:px-8">
      <div className="section-divider mb-20" />

      <div className="mb-16 flex flex-col items-center justify-between gap-8 lg:flex-row">
        <div>
          <p className="label-mono-accent mb-4">{"// how we work"}</p>
          <RevealText
            as="h2"
            text="Predictable from day one."
            emphasis={{ day: "iris", one: "iris" }}
            className="display-xl block max-w-md text-text-primary"
          />
        </div>
        <div className="hidden h-48 w-48 opacity-80 mix-blend-screen lg:block lg:h-60 lg:w-60">
          <LottieClient animationData={businessPlanAnim} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, i) => (
          <ScrollReveal key={step.num} delay={i * 0.1} direction="up">
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              data-cursor
              className="surface-card group relative flex h-full flex-col gap-5 p-6"
            >
              {i < STEPS.length - 1 && (
                <div className="absolute left-full top-9 z-10 hidden h-px w-6 bg-gradient-to-r from-accent-violet to-transparent lg:block" />
              )}

              <div className="flex items-baseline justify-between">
                <span className="select-none font-display text-5xl font-bold leading-none text-accent-violet/25">
                  {step.num}
                </span>
                <span className="live-dot opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              <div>
                <h3 className="mb-2 font-display text-xl font-bold text-text-primary">{step.title}</h3>
                <p className="font-body text-sm leading-relaxed text-text-muted">{step.desc}</p>
              </div>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>

      <div className="section-divider mt-20" />
    </section>
  );
}
