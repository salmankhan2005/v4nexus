"use client";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import RevealText from "@/components/ui/RevealText";
import Counter from "@/components/ui/Counter";
import MagneticButton from "@/components/ui/MagneticButton";

const ShaderBackground = dynamic(() => import("@/components/hero/ShaderBackground"), { ssr: false });
const WebGLGallery = dynamic(() => import("@/components/sections/WebGLGallery"), { ssr: false });

const PROJECTS = [
  {
    id: 1,
    name: "AI Resume Builder",
    category: "AI / WEB",
    role: "Full-Stack & UI/UX",
    stack: ["REACT", "AI", "VERCEL"],
    description: "An intelligent platform that dynamically generates tailored resumes by analyzing job descriptions and user history, automating the formatting and content strategy.",
    result: "Cuts resume creation from hours to minutes with AI-assisted content suggestions.",
    image: "/images/ai_resume_builder.png",
    link: "https://remix-of-ai-resume-spark-main.vercel.app",
  },
  {
    id: 2,
    name: "AI Course Generator",
    category: "ED-TECH",
    role: "Lead Developer",
    stack: ["REACT", "AI", "VERCEL"],
    description: "A generative educational tool designed to help teachers create full-length course curricula, lesson plans, and quizzes instantly from a single prompt.",
    result: "Automates course structuring so educators publish in a fraction of the time.",
    image: "/images/ai_course_generator.png",
    link: "https://project-six-delta-36.vercel.app",
  },
  {
    id: 3,
    name: "AI Career Coach",
    category: "AI / FULL-STACK",
    role: "AI Integration & Frontend",
    stack: ["NEXT.JS", "REACT", "AI"],
    description: "A personalized conversational agent that acts as a virtual career counselor, identifying skill gaps and recommending career pivots.",
    result: "Helps users make informed career decisions through conversational AI guidance.",
    image: "/images/ai_career_coach.png",
    link: "https://ai-career-coach-full-stack.vercel.app",
  },
  {
    id: 4,
    name: "AI Learning Platform",
    category: "ED-TECH",
    role: "Full-Stack Engineer",
    stack: ["REACT", "AI"],
    description: "A responsive e-learning environment with integrated AI tutors that adjust problem difficulty dynamically based on real-time student performance.",
    result: "Adapts learning paths in real time based on each user's progress and goals.",
    image: "/images/ai_learning_platform.png",
    link: "https://coure-brown.vercel.app",
  },
  {
    id: 5,
    name: "AI Interview Coach",
    category: "AI / WEB",
    role: "Frontend Developer",
    stack: ["AI", "WEB"],
    description: "A real-time audio and video analysis tool that simulates technical and behavioral interviews, providing instant feedback on tone and content.",
    result: "Improves interview performance through repeated, low-stakes practice sessions.",
    image: "/images/ai_interview_coach.png",
    link: "https://ai-i-nterview.vercel.app",
  },
  {
    id: 6,
    name: "Deepam Engineering",
    category: "MANUFACTURING",
    role: "Web Design & Development",
    stack: ["WEB", "DESIGN"],
    description: "A digital transformation project that established an online footprint for a premium container and lorry-cabin manufacturer, showcasing their engineering portfolio.",
    result: "Premium container & lorry-cabin manufacturing brought online for Tamil Nadu.",
    image: "/images/deepam_engineering.png",
    link: "https://share.google/b6IxHxCEeg2Fj3FBf",
  },
  {
    id: 7,
    name: "Shree Kalyani Foods",
    category: "ECOMMERCE",
    role: "E-Commerce Strategy & Build",
    stack: ["ECOMMERCE", "WEB"],
    description: "A fully custom e-commerce storefront designed to handle high-volume sales of authentic South Indian food products with a streamlined checkout experience.",
    result: "An authentic South Indian foods e-commerce experience, built to convert.",
    image: "/images/shree_kalyani_foods.png",
    link: "https://share.google/1EavarHXWcR9tjp4g",
  },
];

const STATS = [
  { num: "40+", label: "products shipped" },
  { num: "12", label: "industries served" },
  { num: "7", label: "live case studies" },
  { num: "100%", label: "client satisfaction" },
];

/* ── Pinned horizontal gallery ──────────────────────────────── */
function HorizontalGallery() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ 
    target: targetRef,
    offset: ["start start", "end end"]
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);

  useEffect(() => {
    const updateRange = () => {
      if (containerRef.current) {
        const scrollWidth = containerRef.current.scrollWidth;
        const viewportWidth = document.documentElement.clientWidth;
        setScrollRange(-(scrollWidth - viewportWidth));
      }
    };
    updateRange();
    window.addEventListener("resize", updateRange);
    return () => window.removeEventListener("resize", updateRange);
  }, []);

  const x = useTransform(scrollYProgress, [0, 1], [0, scrollRange]);
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={targetRef} className="relative hidden h-[420vh] lg:block">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* heading rail */}
        <div className="pointer-events-none absolute left-8 top-24 z-20">
          <p className="label-mono-accent mb-3">{"// selected work — scroll"}</p>
          <h2 className="display-xl max-w-sm text-text-primary">
            The <span className="em em-solar">portfolio.</span>
          </h2>
        </div>

        <motion.div ref={containerRef} style={{ x }} className="flex w-max gap-8 pl-[8vw] pr-[8vw]">
          {PROJECTS.map((p, i) => (
            <GalleryCard key={p.id} project={p} index={i} />
          ))}
        </motion.div>

        {/* progress rail */}
        <div className="absolute bottom-10 left-8 right-8 z-20 h-px bg-white/10">
          <motion.div style={{ width: progress }} className="h-full bg-gradient-to-r from-accent-violet to-accent-cyan" />
        </div>
      </div>
    </section>
  );
}

function GalleryCard({ project, index }: { project: (typeof PROJECTS)[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor-label="Open"
      className="group relative block h-[62vh] w-[70vw] shrink-0 overflow-hidden rounded-2xl xl:w-[52vw]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image
        src={project.image}
        alt={project.name}
        fill
        className={`object-cover transition-all duration-700 ${hovered ? "scale-100 grayscale-0" : "scale-105 grayscale"}`}
        sizes="70vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-bg-base/30 to-transparent" />

      <span className="absolute right-8 top-6 font-display text-7xl font-bold text-white/10">
        0{index + 1}
      </span>

      <div className="absolute left-8 top-7 flex items-center gap-2">
        <span className="live-dot" />
        <span className="border border-white/10 bg-black/30 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-accent-cyan backdrop-blur-sm">
          {project.category}
        </span>
      </div>

      <div className="absolute inset-x-8 bottom-8">
        <h3 className="mb-3 font-display text-3xl font-bold tracking-tight text-text-primary">
          {project.name}
        </h3>
        <div className="mb-3 flex flex-wrap gap-2">
          {project.stack.map((t) => (
            <span key={t} className="border border-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-text-muted">
              {t}
            </span>
          ))}
        </div>
        <p className="max-w-md font-body text-sm leading-relaxed text-text-muted">{project.result}</p>
      </div>
    </Link>
  );
}

/* ── Mobile / fallback stacked grid ─────────────────────────── */
function StackedGrid() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16 lg:hidden">
      <p className="label-mono-accent mb-3">{"// selected work"}</p>
      <h2 className="display-xl mb-10 text-text-primary">The portfolio.</h2>
      <div className="grid grid-cols-1 gap-5">
        {PROJECTS.map((p, i) => (
          <Link
            key={p.id}
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card relative block h-[300px] overflow-hidden"
          >
            <Image src={p.image} alt={p.name} fill className="object-cover" sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-bg-base/40 to-transparent" />
            <span className="absolute right-4 top-3 font-display text-4xl font-bold text-white/10">0{i + 1}</span>
            <div className="absolute inset-x-5 bottom-5">
              <span className="mb-2 inline-block border border-white/10 bg-black/30 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-accent-cyan">
                {p.category}
              </span>
              <h3 className="font-display text-xl font-bold text-text-primary">{p.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function WorkPage() {
  return (
    <div className="overflow-clip pt-16">
      <div className="fixed inset-0 z-[-1] opacity-30">
        <ShaderBackground />
      </div>

      {/* header */}
      <header className="mx-auto max-w-7xl px-6 pb-10 pt-20 lg:px-8">
        <p className="label-mono-accent mb-4">{"// studio portfolio"}</p>
        <RevealText
          as="h1"
          text="Engineered excellence."
          emphasis={{ "excellence.": "solar" }}
          className="display-hero block text-text-primary"
        />
        <p className="mt-6 max-w-xl font-body text-lg leading-relaxed text-text-muted">
          Real products for real clients — from AI tools to manufacturing and commerce. Every project
          below is live. Click through and see for yourself.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-6 border-t border-white/[0.07] pt-8 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="font-display text-4xl font-bold text-text-primary">
                <Counter value={s.num} />
              </p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </header>

      <WebGLGallery projects={PROJECTS} />
      <StackedGrid />

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-24 text-center lg:px-8">
        <div className="section-divider mb-16" />
        <RevealText
          as="h2"
          text="Ready to start yours?"
          emphasis={{ yours: "solar" }}
          className="display-xl mb-8 block text-text-primary"
        />
        <div className="flex justify-center" data-cursor-label="Let's talk">
          <MagneticButton href="/contact" variant="coral">
            Initiate a project
          </MagneticButton>
        </div>
      </section>
    </div>
  );
}
