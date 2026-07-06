"use client";
import ScrollReveal from "@/components/ui/ScrollReveal";

import LottieClient from "@/components/ui/LottieClient";
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
    <section className="py-28 px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="section-divider mb-20" />

      <ScrollReveal>
        <div className="flex flex-col lg:flex-row items-center justify-between mb-16 gap-8">
          <div>
            <p className="label-mono-accent mb-3">// our process</p>
            <h2 className="font-display font-bold text-4xl lg:text-5xl text-text-primary max-w-md leading-tight">
              Predictable<br />from day one.
            </h2>
          </div>
          <div className="w-48 h-48 lg:w-64 lg:h-64 opacity-80 mix-blend-screen hidden lg:block">
            <LottieClient animationData={businessPlanAnim} />
          </div>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STEPS.map((step, i) => (
          <ScrollReveal key={step.num} delay={i * 0.1} direction="up">
            <div className="relative flex flex-col gap-5 p-6 surface-card surface-card-hover h-full group cursor-default">
              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-9 left-full w-6 h-px bg-gradient-to-r from-accent-violet to-transparent z-10" />
              )}

              <span className="font-mono font-medium text-5xl text-accent-violet/20 leading-none select-none">
                {step.num}
              </span>

              <div>
                <h3 className="font-display font-bold text-xl text-text-primary mb-2">{step.title}</h3>
                <p className="font-body text-text-muted text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <div className="section-divider mt-20" />
    </section>
  );
}
