import type { Metadata } from "next";
import ScrollReveal from "@/components/ui/ScrollReveal";
import RevealText from "@/components/ui/RevealText";
import MagneticButton from "@/components/ui/MagneticButton";
import CtaBand from "@/components/sections/CtaBand";
import LottieClient from "@/components/ui/LottieClient";

import WebGLServiceIcon from "@/components/ui/WebGLServiceIcon";

export const metadata: Metadata = {
  title: "Services — V4 Nexus",
  description:
    "Web development, mobile apps, product design, and API integrations. See exactly what's included in each service.",
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
    accent: "#6E7BFF",
    iconType: "web",
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
    accent: "#FF8A3D",
    iconType: "mobile",
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
    accent: "#FF7A45",
    iconType: "design",
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
    accent: "#555588",
    iconType: "api",
  },
];

export default function ServicesPage() {
  return (
    <div className="pt-24">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div>
          <p className="label-mono-accent mb-4">{"// what we do"}</p>
          <RevealText
            as="h1"
            text="Four disciplines. One team."
            emphasis={{ One: "solar" }}
            className="display-hero block text-text-primary"
          />
          <ScrollReveal delay={0.1}>
            <p className="mt-6 max-w-xl font-body text-xl leading-relaxed text-text-muted">
              Every engagement starts with a free scoping call to find which combination fits your
              stage and budget.
            </p>
          </ScrollReveal>
        </div>

        <div className="mt-20 space-y-6">
          {SERVICES.map((svc, i) => (
            <ScrollReveal key={svc.num} delay={i * 0.06}>
              <div
                data-cursor
                className="surface-card surface-card-hover group relative overflow-hidden p-8 lg:p-12"
              >
                <span className="pointer-events-none absolute -right-4 -top-10 font-display text-[10rem] font-bold leading-none text-white/[0.02]">
                  {svc.num}
                </span>
                <div className="relative flex flex-col gap-10 lg:flex-row lg:gap-20">
                  <div className="flex-shrink-0 lg:w-80">
                    <span
                      className="mb-4 block font-mono text-sm font-semibold"
                      style={{ color: svc.accent }}
                    >
                      {svc.num} /
                    </span>
                    <h2 className="mb-2 font-display text-2xl font-bold text-text-primary lg:text-3xl">
                      {svc.title}
                    </h2>
                    <p className="font-body text-sm text-text-muted">{svc.subtitle}</p>
                    {svc.iconType && (
                      <div className="mt-8 h-48 w-48 opacity-90 transition-opacity group-hover:opacity-100 lg:h-56 lg:w-56">
                        <WebGLServiceIcon type={svc.iconType} className="h-full w-full" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <p className="label-mono mb-5">what&apos;s included</p>
                    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {svc.includes.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 font-body text-sm leading-relaxed text-text-muted"
                        >
                          <span
                            className="mt-1.5 h-1.5 w-1.5 flex-shrink-0"
                            style={{ background: svc.accent }}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8" data-cursor-label="Start">
                      <MagneticButton href="/contact" variant="ghost">
                        Start this service
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
