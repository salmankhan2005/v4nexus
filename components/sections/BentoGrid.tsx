"use client";
import ScrollReveal from "@/components/ui/ScrollReveal";
import RevealText from "@/components/ui/RevealText";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";

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

function BentoCard({ cap, index }: { cap: typeof CAPABILITIES[0]; index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;
    mouseX.set(x);
    mouseY.set(y);
  }

  // Tilt effect
  const xSpring = useSpring(mouseX, { stiffness: 300, damping: 20 });
  const ySpring = useSpring(mouseY, { stiffness: 300, damping: 20 });
  
  // Create rotation values based on mouse position relative to center
  const rotateX = useTransform(ySpring, [0, 400], [4, -4]);
  const rotateY = useTransform(xSpring, [0, 600], [-4, 4]);

  // Spotlight effect
  const background = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.06), transparent 80%)`;

  return (
    <ScrollReveal delay={index * 0.08} className={cap.span}>
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          mouseX.set(200);
          mouseY.set(200);
        }}
        style={{ rotateX, rotateY, transformPerspective: 1000 }}
        data-cursor
        className="surface-card gradient-mesh group relative flex h-full flex-col justify-between overflow-hidden p-7 shadow-2xl transition-shadow hover:shadow-accent-violet/10"
      >
        {/* Spotlight overlay */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background }}
        />

        <span className="pointer-events-none absolute -right-2 -top-6 z-10 font-display text-[7rem] font-bold leading-none text-white/[0.03]">
          0{index + 1}
        </span>

        <div className="relative z-10">
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
          className={`relative z-10 mt-4 h-0.5 w-8 transition-all duration-500 group-hover:w-20 ${
            cap.accent === "iris" ? "bg-accent-violet" : "bg-accent-cyan"
          }`}
        />
      </motion.div>
    </ScrollReveal>
  );
}

export default function BentoGrid() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-28 lg:px-8">
      <div className="mb-14">
        <p className="label-mono-accent mb-4">{"// capabilities"}</p>
        <RevealText
          as="h2"
          text="Everything you need, nothing you don't."
          emphasis={{ nothing: "solar" }}
          className="display-xl block max-w-2xl text-text-primary"
        />
      </div>

      <div className="grid auto-rows-[220px] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3" style={{ perspective: 1200 }}>
        {CAPABILITIES.map((cap, i) => (
          <BentoCard key={cap.tag} cap={cap} index={i} />
        ))}
      </div>
    </section>
  );
}
