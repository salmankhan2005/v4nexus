"use client";
import ScrollReveal from "@/components/ui/ScrollReveal";
import RevealText from "@/components/ui/RevealText";
import { motion } from "framer-motion";

const CAPABILITIES = [
  {
    tag: "web",
    title: "Web Development",
    desc: "Marketing sites to complex SaaS. React, Next.js, and a performance-first mindset baked in from line one.",
    span: "lg:col-span-2 lg:row-span-2",
    big: true,
    accent: "iris",
  },
  {
    tag: "mobile",
    title: "App Development",
    desc: "Cross-platform iOS & Android with React Native. One codebase, two stores, zero compromise.",
    span: "lg:col-span-1",
    big: false,
    accent: "solar",
  },
  {
    tag: "systems",
    title: "API & Integrations",
    desc: "Connect anything. REST, GraphQL, webhooks, and custom backend services.",
    span: "lg:col-span-1",
    big: false,
    accent: "iris",
  },
  {
    tag: "design",
    title: "Product Design",
    desc: "UI/UX that converts. High-fidelity Figma prototypes turned into pixel-perfect implementation.",
    span: "lg:col-span-2",
    big: false,
    accent: "solar",
  },
];

export default function BentoGrid() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-28 lg:px-8">
      <div className="mb-14">
        <p className="label-mono-accent mb-4">// capabilities</p>
        <RevealText
          as="h2"
          text="Everything you need, nothing you don't."
          emphasis={{ nothing: "solar" }}
          className="display-xl block max-w-2xl text-text-primary"
        />
      </div>

      <div className="grid auto-rows-[220px] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {CAPABILITIES.map((cap, i) => (
          <ScrollReveal key={cap.tag} delay={i * 0.08} className={cap.span}>
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              data-cursor
              className="surface-card gradient-mesh group relative flex h-full flex-col justify-between overflow-hidden p-7"
            >
              {/* index watermark */}
              <span className="pointer-events-none absolute -right-2 -top-6 font-display text-[7rem] font-bold leading-none text-white/[0.03]">
                0{i + 1}
              </span>

              <div className="relative">
                <span className="label-mono mb-4 block">/{cap.tag}</span>
                <h3
                  className={`mb-3 font-display font-bold leading-tight text-text-primary ${
                    cap.big ? "text-3xl lg:text-4xl" : "text-2xl"
                  }`}
                >
                  {cap.title}
                </h3>
                <p className="max-w-md font-body text-sm leading-relaxed text-text-muted">
                  {cap.desc}
                </p>
              </div>

              <div
                className={`mt-4 h-0.5 w-8 transition-all duration-500 group-hover:w-20 ${
                  cap.accent === "iris" ? "bg-accent-violet" : "bg-accent-cyan"
                }`}
              />
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
