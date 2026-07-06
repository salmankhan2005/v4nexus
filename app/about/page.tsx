import type { Metadata } from "next";
import ScrollReveal from "@/components/ui/ScrollReveal";
import MagneticButton from "@/components/ui/MagneticButton";
import LottieClient from "@/components/ui/LottieClient";
import businessIllusAnim from "@/components/animations/business_illus.json";
import financeAnim from "@/components/animations/finance.json";

export const metadata: Metadata = {
  title: "About — V4 Nexus",
  description: "A focused dev studio that ships. Meet the team, the story, and the milestones.",
};

const TEAM = [
  { initials: "[TM]", name: "[TEAM MEMBER]", role: "Founder & Lead Engineer", skill: "Next.js · System Architecture" },
  { initials: "[TM]", name: "[TEAM MEMBER]", role: "Mobile Engineer",          skill: "React Native · Expo" },
  { initials: "[TM]", name: "[TEAM MEMBER]", role: "Product Designer",         skill: "Figma · Design Systems" },
  { initials: "[TM]", name: "[TEAM MEMBER]", role: "Backend Engineer",         skill: "Node.js · PostgreSQL" },
];

const MILESTONES = [
  { year: "2020", event: "Studio founded — first SaaS shipped in 6 weeks." },
  { year: "2021", event: "Expanded to mobile development. 3 apps live on both stores." },
  { year: "2022", event: "First enterprise client. API platform handling 1M+ events/month." },
  { year: "2023", event: "Design practice added. Full product lifecycle capability unlocked." },
  { year: "2024", event: "40+ projects shipped across 12 industries." },
];

export default function AboutPage() {
  return (
    <div className="pt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">

        {/* Story */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24 mb-24">
          <ScrollReveal className="max-w-3xl flex-1">
            <p className="label-mono-accent mb-4">// our story</p>
            <h1 className="font-display font-bold text-5xl lg:text-7xl text-text-primary leading-tight mb-8">
              Built by builders,<br />
              <span className="text-gradient-vio-cyan">for builders.</span>
            </h1>
            <p className="font-body text-text-muted text-xl leading-relaxed mb-4">
              V4 Nexus started as a reaction to agencies that over-promise and under-ship. We&apos;re a lean team of engineers and designers who care about one thing: putting working software in front of real users.
            </p>
            <p className="font-body text-text-muted text-xl leading-relaxed">
              No account managers in the chain. The person who talks to you is the person who writes the code.
            </p>
          </ScrollReveal>
          <div className="flex-1 w-full max-w-sm lg:max-w-md opacity-80 mix-blend-screen hidden lg:block">
            <LottieClient animationData={businessIllusAnim} />
          </div>
        </div>

        <div className="section-divider mb-20" />

        {/* Team */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <ScrollReveal>
            <p className="label-mono-accent mb-3">// the team</p>
            <h2 className="font-display font-bold text-3xl lg:text-4xl text-text-primary">People who ship.</h2>
          </ScrollReveal>
          <div className="w-32 md:w-48 lg:w-56 opacity-80 mix-blend-screen -mb-4 hidden md:block">
            <LottieClient animationData={financeAnim} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-24">
          {TEAM.map((member, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <div className="surface-card surface-card-hover p-6 group cursor-default">
                {/* Avatar */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent-violet/30 to-accent-cyan/20 flex items-center justify-center mb-5 font-mono text-sm text-text-muted">
                  {member.initials}
                </div>
                <h3 className="font-display font-bold text-text-primary mb-1">{member.name}</h3>
                <p className="font-body text-text-muted text-sm mb-3">{member.role}</p>
                <span
                  className="font-mono text-[9px] tracking-wider uppercase px-2 py-1 rounded"
                  style={{ background: "rgba(108,92,224,0.12)", color: "#6C5CE0" }}
                >
                  {member.skill}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="section-divider mb-20" />

        {/* Timeline */}
        <ScrollReveal>
          <p className="label-mono-accent mb-3">// milestones</p>
          <h2 className="font-display font-bold text-3xl lg:text-4xl text-text-primary mb-12">The journey so far.</h2>
        </ScrollReveal>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-16 top-0 bottom-0 w-px bg-gradient-to-b from-accent-violet via-accent-cyan to-transparent" />

          <div className="space-y-8">
            {MILESTONES.map((m, i) => (
              <ScrollReveal key={m.year} delay={i * 0.08} direction="left">
                <div className="flex items-start gap-10 pl-6">
                  <span className="font-mono font-medium text-sm text-accent-cyan w-12 flex-shrink-0 pt-0.5 relative">
                    {m.year}
                    <span className="absolute -right-7 top-2 w-2 h-2 rounded-full bg-accent-violet" />
                  </span>
                  <p className="font-body text-text-muted text-base leading-relaxed pl-6">{m.event}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <div className="mt-20 flex justify-center">
          <MagneticButton href="/contact" variant="coral">
            // Work With Us
          </MagneticButton>
        </div>
      </div>
    </div>
  );
}
