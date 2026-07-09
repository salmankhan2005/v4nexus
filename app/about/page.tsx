import type { Metadata } from "next";
import ScrollReveal from "@/components/ui/ScrollReveal";
import RevealText from "@/components/ui/RevealText";
import MagneticButton from "@/components/ui/MagneticButton";
import LottieClient from "@/components/ui/LottieClient";
import Counter from "@/components/ui/Counter";
import businessIllusAnim from "@/components/animations/business_illus.json";
import WebGLTimeline from "@/components/sections/WebGLTimeline";

export const metadata: Metadata = {
  title: "About — V4 Nexus",
  description: "A focused dev studio that ships. Meet the team, the story, and the milestones.",
};

const PRINCIPLES = [
  { k: "No middlemen", v: "The person who talks to you is the person who writes the code." },
  { k: "Ship weekly", v: "You see working software every week, not status decks." },
  { k: "Own your stack", v: "Full handover — code, infra, docs. No lock-in, ever." },
];

const MILESTONES = [
  { year: "2020", event: "Studio founded — first SaaS shipped in 6 weeks." },
  { year: "2021", event: "Expanded to mobile development. 3 apps live on both stores." },
  { year: "2022", event: "First enterprise client. API platform handling 1M+ events/month." },
  { year: "2023", event: "Design practice added. Full product lifecycle capability unlocked." },
  { year: "2024", event: "40+ projects shipped across 12 industries." },
];

const STATS = [
  { num: "40+", label: "projects shipped" },
  { num: "12", label: "industries" },
  { num: "4", label: "years shipping" },
];

export default function AboutPage() {
  return (
    <div className="pt-24">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {/* Story */}
        <div className="mb-24 flex flex-col items-center gap-12 lg:flex-row lg:gap-24">
          <div className="max-w-3xl flex-1">
            <p className="label-mono-accent mb-4">{"// our story"}</p>
            <RevealText
              as="h1"
              text="Built by builders, for builders."
              emphasis={{ builders: "solar" }}
              className="display-hero block text-text-primary"
            />
            <ScrollReveal delay={0.1}>
              <p className="mb-4 mt-8 font-body text-xl leading-relaxed text-text-muted">
                V4 Nexus started as a reaction to agencies that over-promise and under-ship. We&apos;re a
                lean team of engineers and designers who care about one thing: putting working software
                in front of real users.
              </p>
              <p className="font-body text-xl leading-relaxed text-text-muted">
                No account managers in the chain. No hand-offs to junior teams. Just senior builders,
                start to finish.
              </p>
            </ScrollReveal>

            <div className="mt-10 flex gap-10 border-t border-white/[0.07] pt-8">
              {STATS.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-3xl font-bold text-text-primary">
                    <Counter value={s.num} />
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-text-muted">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden w-full max-w-sm flex-1 opacity-80 mix-blend-screen lg:block lg:max-w-md">
            <LottieClient animationData={businessIllusAnim} />
          </div>
        </div>

        {/* Principles */}
        <div className="mb-24 grid grid-cols-1 gap-4 md:grid-cols-3">
          {PRINCIPLES.map((p, i) => (
            <ScrollReveal key={p.k} delay={i * 0.08}>
              <div data-cursor className="surface-card surface-card-hover h-full p-8">
                <span className="mb-4 block font-display text-2xl font-bold text-accent-cyan">
                  0{i + 1}
                </span>
                <h3 className="mb-2 font-display text-xl font-bold text-text-primary">{p.k}</h3>
                <p className="font-body text-sm leading-relaxed text-text-muted">{p.v}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="section-divider mb-20" />

        {/* Timeline */}
        <div className="mb-12">
          <p className="label-mono-accent mb-3">{"// milestones"}</p>
          <RevealText
            as="h2"
            text="The journey so far."
            emphasis={{ "far.": "solar" }}
            className="display-xl block text-text-primary"
          />
        </div>

        <WebGLTimeline milestones={MILESTONES} />

        <div className="mt-20 flex justify-center" data-cursor-label="Let's talk">
          <MagneticButton href="/contact" variant="coral">
            Work with us
          </MagneticButton>
        </div>
      </div>
    </div>
  );
}
