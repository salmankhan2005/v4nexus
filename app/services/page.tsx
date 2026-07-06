import type { Metadata } from "next";
import ScrollReveal from "@/components/ui/ScrollReveal";
import MagneticButton from "@/components/ui/MagneticButton";
import CtaBand from "@/components/sections/CtaBand";
import LottieClient from "@/components/ui/LottieClient";

import meetingAnim from "@/components/animations/meeting.json";
import vectorAnim from "@/components/animations/vector.json";
import businessAnim from "@/components/animations/business.json";
import analyzeAnim from "@/components/animations/analyze.json";

export const metadata: Metadata = {
  title: "Services — V4 Nexus",
  description: "Web development, mobile apps, product design, and API integrations. See exactly what's included in each service.",
};

const SERVICES = [
  {
    num: "01",
    title: "Web Development",
    subtitle: "From landing page to full SaaS.",
    includes: [
      "Next.js / React frontend architecture",
      "Server-side rendering & static generation",
      "CMS integration (Sanity, Contentful, Notion)",
      "Authentication, payments, and third-party APIs",
      "Lighthouse 90+ performance baseline",
      "CI/CD pipeline and deployment (Vercel / AWS)",
    ],
    accent: "#6C5CE0",
    animationData: businessAnim,
  },
  {
    num: "02",
    title: "Mobile / App Development",
    subtitle: "One codebase. iOS + Android. Production-ready.",
    includes: [
      "React Native + Expo (managed or bare workflow)",
      "Native device APIs (camera, notifications, location)",
      "App Store & Google Play submission support",
      "Offline-first data sync with Supabase / Firebase",
      "Over-the-air updates with EAS Update",
      "Analytics and crash reporting (Sentry, Mixpanel)",
    ],
    accent: "#33E6C9",
    animationData: vectorAnim,
  },
  {
    num: "03",
    title: "Product Design",
    subtitle: "Research-backed. Implementation-ready.",
    includes: [
      "User research synthesis & persona mapping",
      "Information architecture and user flows",
      "High-fidelity Figma prototypes",
      "Design system & component library creation",
      "Handoff-ready specs for developer consumption",
      "Iterative usability testing and refinement",
    ],
    accent: "#6C5CE0",
    animationData: meetingAnim,
  },
  {
    num: "04",
    title: "Systems & API Integration",
    subtitle: "Connect, automate, and scale your data layer.",
    includes: [
      "REST and GraphQL API design & documentation",
      "Webhook pipelines and event-driven architectures",
      "Third-party service integrations (Stripe, Twilio, HubSpot)",
      "Background job queues (BullMQ, Inngest)",
      "Data migration and ETL pipelines",
      "Monitoring, alerting, and uptime SLAs",
    ],
    accent: "#33E6C9",
    animationData: analyzeAnim,
  },
];

export default function ServicesPage() {
  return (
    <div className="pt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <ScrollReveal>
          <p className="label-mono-accent mb-4">// what we do</p>
          <h1 className="font-display font-bold text-5xl lg:text-7xl text-text-primary leading-tight mb-6">
            Services
          </h1>
          <p className="font-body text-text-muted text-xl max-w-xl leading-relaxed">
            Four focused disciplines. Every engagement starts with a free scoping call to find which combination fits your stage and budget.
          </p>
        </ScrollReveal>

        <div className="mt-20 space-y-6">
          {SERVICES.map((svc, i) => (
            <ScrollReveal key={svc.num} delay={i * 0.08}>
              <div className="surface-card surface-card-hover p-8 lg:p-12 group cursor-default">
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-20">
                  {/* Left */}
                  <div className="lg:w-80 flex-shrink-0">
                    <span className="font-mono font-semibold text-5xl text-text-primary/10 block mb-4">{svc.num}</span>
                    <h2 className="font-display font-bold text-2xl lg:text-3xl text-text-primary mb-2">{svc.title}</h2>
                    <p className="font-body text-text-muted text-sm">{svc.subtitle}</p>
                    {svc.animationData && (
                      <div className="mt-8 opacity-80 hover:opacity-100 transition-opacity flex justify-center lg:justify-start">
                        <LottieClient animationData={svc.animationData} className="w-48 h-48 lg:w-56 lg:h-56 mix-blend-screen" />
                      </div>
                    )}
                  </div>

                  {/* Right — included list */}
                  <div className="flex-1">
                    <p className="label-mono mb-5">what&apos;s included</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {svc.includes.map((item) => (
                        <li key={item} className="flex items-start gap-3 font-body text-text-muted text-sm leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-none mt-1.5 flex-shrink-0" style={{ background: svc.accent }} />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8">
                      <MagneticButton href="/contact" variant="ghost">
                        // Start This Service
                      </MagneticButton>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <CtaBand />
    </div>
  );
}
