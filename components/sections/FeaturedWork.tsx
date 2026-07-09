"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import RevealText from "@/components/ui/RevealText";
import MagneticButton from "@/components/ui/MagneticButton";

const PROJECTS = [
  {
    id: 1,
    name: "AI Resume Builder",
    category: "AI / WEB",
    stack: ["REACT", "AI", "VERCEL"],
    result: "Cuts resume creation from hours to minutes with AI-assisted content suggestions.",
    image: "/images/ai_resume_builder.png",
    link: "https://remix-of-ai-resume-spark-main.vercel.app",
  },
  {
    id: 2,
    name: "Deepam Engineering",
    category: "MANUFACTURING",
    stack: ["WEB", "DESIGN"],
    result: "Premium container & lorry-cabin manufacturing brought online for Tamil Nadu.",
    image: "/images/deepam_engineering.png",
    link: "https://share.google/b6IxHxCEeg2Fj3FBf",
  },
  {
    id: 3,
    name: "AI Course Generator",
    category: "ED-TECH",
    stack: ["REACT", "AI", "VERCEL"],
    result: "Automates course structuring so educators publish in a fraction of the time.",
    image: "/images/ai_course_generator.png",
    link: "https://project-six-delta-36.vercel.app",
  },
];

function ProjectCard({ project, index }: { project: (typeof PROJECTS)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <Link
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
      data-cursor-label="Open"
    >
      <div
        ref={ref}
        className="glass-card group relative h-[340px] overflow-hidden"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <motion.div style={{ y }} className="absolute inset-[-8%]">
          <Image
            src={project.image}
            alt={project.name}
            fill
            className={`object-cover transition-all duration-700 ${
              hovered ? "scale-105 grayscale-0" : "scale-100 grayscale"
            }`}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </motion.div>

        <div className="absolute inset-0 z-10 bg-gradient-to-t from-bg-base via-bg-base/40 to-transparent opacity-90" />

        <div className="absolute left-5 top-5 z-20 flex items-center gap-2">
          <span className="live-dot" />
          <span className="border border-white/10 bg-black/30 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-accent-cyan backdrop-blur-sm">
            {project.category}
          </span>
        </div>

        <span className="absolute right-5 top-4 z-20 font-display text-5xl font-bold text-white/10">
          0{index + 1}
        </span>

        <div className="absolute inset-x-5 bottom-5 z-20">
          <h3 className="mb-2 font-display text-xl font-bold tracking-tight text-text-primary">
            {project.name}
          </h3>
          <div
            className="overflow-hidden transition-all duration-500"
            style={{ maxHeight: hovered ? 120 : 0, opacity: hovered ? 1 : 0 }}
          >
            <div className="mb-2 flex flex-wrap gap-2">
              {project.stack.map((t) => (
                <span
                  key={t}
                  className="border border-white/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-text-muted"
                >
                  {t}
                </span>
              ))}
            </div>
            <p className="font-body text-sm leading-relaxed text-accent-cyan">{project.result}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function FeaturedWork() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-28 lg:px-8">
      <ScrollReveal className="mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <p className="label-mono-accent mb-4">{"// selected work"}</p>
          <RevealText
            as="h2"
            text="Real results, real clients."
            emphasis={{ clients: "solar" }}
            className="display-xl block text-text-primary"
          />
        </div>
        <span data-cursor-label="Browse">
          <MagneticButton href="/work" variant="outline">
            View all work
          </MagneticButton>
        </span>
      </ScrollReveal>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {PROJECTS.map((project, i) => (
          <ScrollReveal key={project.id} delay={i * 0.1}>
            <ProjectCard project={project} index={i} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
