"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import MagneticButton from "@/components/ui/MagneticButton";

const PROJECTS = [
  {
    id: 1,
    name: "AI RESUME BUILDER",
    category: "AI / WEB",
    stack: ["REACT", "AI", "VERCEL"],
    result: "Reduces resume creation time from hours to minutes through AI-assisted content suggestions.",
    image: "/images/ai_resume_builder.png",
    link: "https://remix-of-ai-resume-spark-main.vercel.app",
    tagColor: "text-[#43f0d2] bg-[#43f0d2]/10 border-[#43f0d2]/20",
  },
  {
    id: 2,
    name: "DEEPAM ENGINEERING",
    category: "MANUFACTURING",
    stack: ["WEB", "DESIGN"],
    result: "Premium Container & Lorry Cabin Manufacturing in Tamil Nadu.",
    image: "/images/deepam_engineering.png",
    link: "https://share.google/b6IxHxCEeg2Fj3FBf",
    tagColor: "text-[#c7bfff] bg-[#c7bfff]/10 border-[#c7bfff]/20",
  },
  {
    id: 3,
    name: "AI COURSE GENERATOR",
    category: "ED-TECH",
    stack: ["REACT", "AI", "VERCEL"],
    result: "Streamlines course creation for educators by automating content structuring.",
    image: "/images/ai_course_generator.png",
    link: "https://project-six-delta-36.vercel.app",
    tagColor: "text-[#43f0d2] bg-[#43f0d2]/10 border-[#43f0d2]/20",
  },
];

export default function FeaturedWork() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="py-28 px-6 lg:px-8 max-w-7xl mx-auto">
      <ScrollReveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
        <div>
          <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-accent-cyan mb-3">// selected work</p>
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-text-primary leading-tight">
            Real results,<br />
            <span className="bg-gradient-to-r from-accent-violet to-accent-cyan bg-clip-text text-transparent">
              real clients.
            </span>
          </h2>
        </div>
        <MagneticButton href="/work" variant="outline">
          // View All Work
        </MagneticButton>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {PROJECTS.map((project, i) => (
          <ScrollReveal key={project.id} delay={i * 0.1}>
            <Link href={project.link} target="_blank" rel="noopener noreferrer" className="block">
              <div
                className="relative overflow-hidden cursor-pointer group glass-card h-[320px]"
                onMouseEnter={() => setHovered(project.id)}
                onMouseLeave={() => setHovered(null)}
              >
              {/* Image */}
              <Image
                src={project.image}
                alt={project.name}
                fill
                className={`object-cover transition-all duration-700 ${
                  hovered === project.id ? "grayscale-0 scale-100" : "grayscale scale-[1.05]"
                }`}
                sizes="(max-width: 768px) 100vw, 33vw"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#10131a] to-transparent opacity-80 z-10" />

              {/* Category badge */}
              <div className="absolute top-5 left-5 z-20">
                <span className={`font-mono text-[10px] tracking-widest uppercase px-3 py-1 border ${project.tagColor}`}>
                  {project.category}
                </span>
              </div>

              {/* Bottom content */}
              <div className="absolute bottom-5 left-5 right-5 z-20">
                <h3 className="font-display font-bold text-xl text-[#e1e2eb] mb-2 tracking-tight">
                  {project.name}
                </h3>

                {/* Hover reveal */}
                <div
                  className="transition-opacity duration-300"
                  style={{ opacity: hovered === project.id ? 1 : 0 }}
                >
                  <div className="flex flex-wrap gap-2 mb-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[9px] tracking-wider uppercase px-2 py-0.5 border border-white/10 text-[#c8c4d6]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <p className="font-body text-[#43f0d2] text-sm">{project.result}</p>
                </div>
              </div>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
