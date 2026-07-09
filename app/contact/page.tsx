"use client";
import { useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import RevealText from "@/components/ui/RevealText";
import MagneticButton from "@/components/ui/MagneticButton";
import LottieClient from "@/components/ui/LottieClient";
import meetingAnim from "@/components/animations/meeting.json";

const PROJECT_TYPES = ["New Product", "Existing Codebase", "MVP / Prototype", "Design Only", "Other"];
const BUDGETS = ["< $5k", "$5k – $15k", "$15k – $50k", "$50k+", "Let's talk"];

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", type: "", budget: "", message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`New Project Inquiry from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\n` +
        `Email: ${form.email}\n` +
        `Project Type: ${form.type}\n` +
        `Budget: ${form.budget}\n\n` +
        `Message:\n${form.message}`
    );
    window.location.href = `mailto:v4nexustech@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const inputCls =
    "w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 font-body text-sm text-text-primary backdrop-blur-md transition-all placeholder:text-text-muted/50 focus:border-accent-cyan/60 focus:shadow-[0_0_0_3px_rgba(255,138,61,0.10)] focus:outline-none";

  return (
    <div className="pt-24">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left */}
          <div>
            <p className="label-mono-accent mb-4">{"// get in touch"}</p>
            <RevealText
              as="h1"
              text="Let's build something great."
              emphasis={{ great: "solar" }}
              className="display-hero block text-text-primary"
            />
            <ScrollReveal delay={0.1}>
              <p className="mb-10 mt-6 max-w-md font-body text-lg leading-relaxed text-text-muted">
                Fill in the form or grab time directly on our calendar. Either way, you&apos;ll hear back
                within one business day.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div
                data-cursor
                className="surface-card surface-card-hover flex min-h-[200px] flex-col items-center justify-center gap-4 p-8 text-center"
              >
                <div className="-mt-2 h-24 w-24 opacity-90 mix-blend-screen">
                  <LottieClient animationData={meetingAnim} />
                </div>
                <div>
                  <p className="mb-1 font-display font-bold text-text-primary">Book a 30-min call</p>
                  <p className="label-mono">Speak directly with our team</p>
                </div>
                <div data-cursor-label="Call">
                  <MagneticButton href="tel:+918428687001" variant="coral">
                    Book a call
                  </MagneticButton>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2} className="mt-8 flex gap-6">
              {[
                { label: "Phone", value: "+91 8428687001", href: "tel:+918428687001" },
                { label: "Email", value: "v4nexustech@gmail.com", href: "mailto:v4nexustech@gmail.com" },
                { label: "WhatsApp", value: "@v4nexus", href: "https://wa.me/918428687001" },
              ].map(({ label, value, href }) => (
                <div key={label}>
                  <p className="label-mono mb-1">{label}</p>
                  <a
                    href={href}
                    className="font-body text-sm text-text-muted transition-colors hover:text-accent-cyan"
                  >
                    {value}
                  </a>
                </div>
              ))}
            </ScrollReveal>
          </div>

          {/* Right — form */}
          <ScrollReveal delay={0.05} direction="right">
            {sent ? (
              <div className="surface-card flex min-h-[500px] flex-col items-center justify-center gap-6 p-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-cyan/20 text-3xl text-accent-cyan">
                  ✓
                </div>
                <div>
                  <h2 className="mb-2 font-display text-2xl font-bold text-text-primary">Message sent!</h2>
                  <p className="font-body text-text-muted">
                    We&apos;ll get back to you within one business day.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="surface-card space-y-6 p-8 lg:p-10">
                <p className="label-mono mb-2">{"// project brief"}</p>

                <div>
                  <label className="label-mono mb-2 block" htmlFor="name">Name</label>
                  <input
                    id="name" name="name" type="text" required
                    value={form.name} onChange={handleChange}
                    placeholder="Your name"
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className="label-mono mb-2 block" htmlFor="email">Email</label>
                  <input
                    id="email" name="email" type="email" required
                    value={form.email} onChange={handleChange}
                    placeholder="you@company.com"
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className="label-mono mb-2 block" htmlFor="type">Project Type</label>
                  <select
                    id="type" name="type" required
                    value={form.type} onChange={handleChange}
                    className={`${inputCls} appearance-none`}
                  >
                    <option value="" disabled className="bg-bg-base text-text-primary">Select type...</option>
                    {PROJECT_TYPES.map((t) => (
                      <option key={t} value={t} className="bg-bg-base text-text-primary">{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label-mono mb-2 block" htmlFor="budget">Budget Range</label>
                  <select
                    id="budget" name="budget" required
                    value={form.budget} onChange={handleChange}
                    className={`${inputCls} appearance-none`}
                  >
                    <option value="" disabled className="bg-bg-base text-text-primary">Select range...</option>
                    {BUDGETS.map((b) => (
                      <option key={b} value={b} className="bg-bg-base text-text-primary">{b}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label-mono mb-2 block" htmlFor="message">Tell us about the project</label>
                  <textarea
                    id="message" name="message" rows={5} required
                    value={form.message} onChange={handleChange}
                    placeholder="What are you building? What's the timeline?"
                    className={`${inputCls} resize-none`}
                  />
                </div>

                <MagneticButton type="submit" variant="coral" className="w-full justify-center">
                  Send message
                </MagneticButton>
              </form>
            )}
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
