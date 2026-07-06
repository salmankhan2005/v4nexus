"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

const ShaderBackground = dynamic(() => import("@/components/hero/ShaderBackground"), { ssr: false });

// ── Design system ────────────────────────────────────────────────────────────
const FILTERS = ["ALL PROJECTS", "WEB", "APP", "FULL-STACK"] as const;
type Filter = typeof FILTERS[number];

const PROJECTS = [
  {
    id: 1,
    name: "AI RESUME BUILDER",
    category: "AI / WEB",
    filter: ["ALL PROJECTS", "WEB"] as Filter[],
    stack: ["REACT", "AI", "VERCEL"],
    result: "Reduces resume creation time from hours to minutes through AI-assisted content suggestions.",
    image: "/images/ai_resume_builder.png",
    link: "https://remix-of-ai-resume-spark-main.vercel.app",
    tagColor: "text-[#43f0d2] bg-[#43f0d2]/10 border-[#43f0d2]/20",
    span: "col-span-12 md:col-span-8",
    height: "h-[500px]",
  },
  {
    id: 2,
    name: "AI COURSE GENERATOR",
    category: "ED-TECH",
    filter: ["ALL PROJECTS", "WEB"] as Filter[],
    stack: ["REACT", "AI", "VERCEL"],
    result: "Streamlines course creation for educators by automating content structuring.",
    image: "/images/ai_course_generator.png",
    link: "https://project-six-delta-36.vercel.app",
    tagColor: "text-[#ffb4a3] bg-[#ffb4a3]/10 border-[#ffb4a3]/20",
    span: "col-span-12 md:col-span-4",
    height: "h-[500px]",
  },
  {
    id: 3,
    name: "AI CAREER COACH",
    category: "AI / FULL-STACK",
    filter: ["ALL PROJECTS", "FULL-STACK"] as Filter[],
    stack: ["NEXT.JS", "REACT", "AI"],
    result: "Helps users make informed career decisions through conversational AI guidance.",
    image: "/images/ai_career_coach.png",
    link: "https://ai-career-coach-full-stack.vercel.app",
    tagColor: "text-[#c7bfff] bg-[#c7bfff]/10 border-[#c7bfff]/20",
    span: "col-span-12 md:col-span-5",
    height: "h-[400px]",
  },
  {
    id: 4,
    name: "AI LEARNING PLATFORM",
    category: "ED-TECH",
    filter: ["ALL PROJECTS", "WEB"] as Filter[],
    stack: ["REACT", "AI"],
    result: "Adapts learning paths based on user progress and goals.",
    image: "/images/ai_learning_platform.png",
    link: "https://coure-brown.vercel.app",
    tagColor: "text-[#43f0d2] bg-[#43f0d2]/10 border-[#43f0d2]/20",
    span: "col-span-12 md:col-span-7",
    height: "h-[400px]",
  },
  {
    id: 5,
    name: "AI INTERVIEW COACH",
    category: "AI / WEB",
    filter: ["ALL PROJECTS", "WEB"] as Filter[],
    stack: ["AI", "WEB"],
    result: "Improves interview performance through repeated, low-stakes practice.",
    image: "/images/ai_interview_coach.png",
    link: "https://ai-i-nterview.vercel.app",
    tagColor: "text-[#e1e2eb] bg-[#e1e2eb]/10 border-white/10",
    span: "col-span-12 md:col-span-4",
    height: "h-[400px]",
  },
  {
    id: 6,
    name: "DEEPAM ENGINEERING",
    category: "MANUFACTURING",
    filter: ["ALL PROJECTS", "WEB"] as Filter[],
    stack: ["WEB", "DESIGN"],
    result: "Premium Container & Lorry Cabin Manufacturing in Tamil Nadu.",
    image: "/images/deepam_engineering.png",
    link: "https://share.google/b6IxHxCEeg2Fj3FBf",
    tagColor: "text-[#43f0d2] bg-[#43f0d2]/10 border-[#43f0d2]/20",
    span: "col-span-12 md:col-span-8",
    height: "h-[400px]",
  },
  {
    id: 7,
    name: "SHREE KALYANI FOODS",
    category: "ECOMMERCE",
    filter: ["ALL PROJECTS", "WEB"] as Filter[],
    stack: ["ECOMMERCE", "WEB"],
    result: "Authentic South Indian Foods e-commerce experience.",
    image: "/images/shree_kalyani_foods.png",
    link: "https://share.google/1EavarHXWcR9tjp4g",
    tagColor: "text-[#ffb4a3] bg-[#ffb4a3]/10 border-[#ffb4a3]/20",
    span: "col-span-12 md:col-span-12",
    height: "h-[500px]",
  }
];

export default function WorkPage() {
  const [active, setActive] = useState<Filter>("ALL PROJECTS");

  // Parallax on scroll (matches the Stitch micro-interaction script)
  useEffect(() => {
    const onScroll = () => {
      const imgs = document.querySelectorAll<HTMLElement>(".parallax-img");
      const scrolled = window.pageYOffset;
      imgs.forEach((img) => {
        const yPos = -(scrolled * 0.05);
        img.style.transform = `translateY(${yPos}px) scale(1.1)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filtered = PROJECTS.filter((p) => p.filter.includes(active));

  return (
    <div className="min-h-screen bg-[#10131a] text-[#e1e2eb] overflow-x-hidden selection:bg-[#43f0d2]/30 selection:text-[#43f0d2]">

      {/* ── WebGL Shader Background (fixed, 40% opacity) ───────────────────── */}
      <div className="fixed inset-0 z-[-1] pointer-events-none opacity-40">
        <ShaderBackground />
      </div>

      {/* ── Main ────────────────────────────────────────────────────────────── */}
      <main className="relative pt-[80px] pb-20 px-8 md:px-20 max-w-[1600px] mx-auto">

        {/* ── Hero Header ─────────────────────────────────────────────────── */}
        <header className="mt-12 mb-20 max-w-4xl">
          <div
            className="font-mono text-[#43f0d2] text-[11px] tracking-[0.3em] uppercase mb-3"
          >
            STUDIO PORTFOLIO
          </div>
          <h1
            className="font-display font-bold text-[64px] md:text-[110px] leading-[0.95] tracking-tight text-[#e1e2eb] mb-6"
          >
            Engineered <br />
            <span className="text-[#43f0d2]">Excellence.</span>
          </h1>
          <p className="font-body text-[#8B92A5] text-lg max-w-xl leading-relaxed">
            Synthesizing complex logic into elegant digital architecture. Our work spans from
            high-frequency trading platforms to immersive luxury web experiences.
          </p>
        </header>

        {/* ── Filter Bar ──────────────────────────────────────────────────── */}
        <div className="flex flex-wrap items-center gap-6 mb-12 border-b border-white/5 pb-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`font-mono text-[11px] tracking-widest uppercase pb-2 px-1 transition-all duration-200 ${
                active === f
                  ? "text-[#43f0d2] border-b-2 border-[#43f0d2]"
                  : "text-[#8B92A5] hover:text-[#43f0d2] border-b-2 border-transparent"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* ── Asymmetric 12-col Project Grid ──────────────────────────────── */}
        <div className="grid grid-cols-12 gap-6">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* ── CTA ─────────────────────────────────────────────────────────── */}
        <section className="mt-20 py-20 border-t border-white/5 text-center">
          <h2 className="font-display font-bold text-[56px] leading-[1.1] tracking-tight text-[#e1e2eb] mb-6">
            Ready to start?
          </h2>
          <Link
            href="/contact"
            className="inline-block bg-[#43f0d2] text-[#10131a] font-mono text-xs tracking-widest px-20 py-5 uppercase hover:bg-white hover:text-black transition-all active:scale-95"
            style={{ boxShadow: "0 0 20px rgba(67,240,210,0.1)" }}
          >
            INITIATE PROJECT_00
          </Link>
        </section>
      </main>
    </div>
  );
}

// ── Project Card Component ────────────────────────────────────────────────────
function ProjectCard({ project }: { project: typeof PROJECTS[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={project.link} target="_blank" rel="noopener noreferrer" className={`${project.span} group block`}>
      <div
        className="relative overflow-hidden cursor-pointer glass-card"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className={`relative ${project.height}`}>
          {/* Project image */}
          <Image
            src={project.image}
            alt={project.name}
            fill
            className={`object-cover parallax-img transition-all duration-700 ${
              hovered ? "grayscale-0 scale-100" : "grayscale scale-[1.05]"
            }`}
            sizes="(max-width: 768px) 100vw, 66vw"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#10131a] to-transparent opacity-80 z-10" />

          {/* Category badge */}
          <div className="absolute top-6 left-6 z-20">
            <span className={`font-mono text-[10px] tracking-widest uppercase px-3 py-1 border ${project.tagColor}`}>
              {project.category}
            </span>
          </div>

          {/* Bottom content */}
          <div className="absolute bottom-6 left-6 right-6 z-20">
            <h3 className="font-display font-bold text-[28px] leading-tight tracking-tight text-[#e1e2eb] mb-2">
              {project.name}
            </h3>

            {/* Hover overlay content */}
            <div
              className="transition-opacity duration-300"
              style={{ opacity: hovered ? 1 : 0 }}
            >
              <div className="flex flex-wrap gap-2 mb-3">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[10px] tracking-widest text-[#c8c4d6] border border-white/10 px-3 py-1 uppercase"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <p className="font-body text-[#43f0d2] text-sm leading-relaxed">
                {project.result}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
