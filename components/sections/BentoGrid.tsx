"use client";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { motion } from "framer-motion";

const CAPABILITIES = [
  {
    tag: "01 / web",
    title: "Web Development",
    desc: "From marketing sites to complex SaaS products. React, Next.js, performance-first.",
    accent: "accent-violet",
    span: "lg:col-span-2 lg:row-span-2",
    big: true,
  },
  {
    tag: "02 / mobile",
    title: "App Development",
    desc: "Cross-platform iOS & Android. React Native, Expo — one codebase, two stores, zero compromise.",
    accent: "accent-cyan",
    span: "lg:col-span-1",
    big: false,
  },
  {
    tag: "03 / systems",
    title: "API & Integrations",
    desc: "Connect anything. REST, GraphQL, webhooks, and custom backend services.",
    accent: "accent-violet",
    span: "lg:col-span-1",
    big: false,
  },
  {
    tag: "04 / design",
    title: "Product Design",
    desc: "UI/UX that converts. High-fidelity Figma prototypes → pixel-perfect implementation.",
    accent: "accent-cyan",
    span: "lg:col-span-2",
    big: false,
  },
];

export default function BentoGrid() {
  return (
    <section className="py-28 px-6 lg:px-8 max-w-7xl mx-auto">
      <ScrollReveal>
        <p className="label-mono-accent mb-3">// capabilities</p>
        <h2 className="font-display font-bold text-4xl lg:text-5xl text-text-primary mb-14 leading-tight max-w-xl">
          Everything you need,<br />
          <span className="text-gradient-vio-cyan">nothing you don&apos;t.</span>
        </h2>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[220px]">
        {CAPABILITIES.map((cap, i) => (
          <ScrollReveal key={cap.tag} delay={i * 0.08} className={cap.span}>
            <div className="surface-card surface-card-hover gradient-mesh h-full p-6 flex flex-col justify-between group cursor-default">
              <div>
                <span className="label-mono mb-4 block">{cap.tag}</span>
                <h3 className={`font-display font-bold ${cap.big ? "text-3xl lg:text-4xl" : "text-2xl"} text-text-primary mb-3 leading-tight`}>
                  {cap.title}
                </h3>
                <p className="font-body text-text-muted text-sm leading-relaxed">{cap.desc}</p>
              </div>

              <div className={`w-8 h-0.5 ${cap.accent === "accent-violet" ? "bg-accent-violet" : "bg-accent-cyan"} mt-4 group-hover:w-16 transition-all duration-300`} />
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
