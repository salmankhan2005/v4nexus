"use client";
import { useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

  return (
    <div className="pt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left — headline */}
          <div>
            <ScrollReveal>
              <p className="label-mono-accent mb-4">// get in touch</p>
              <h1 className="font-display font-bold text-5xl lg:text-6xl xl:text-7xl text-text-primary leading-tight mb-6">
                Let&apos;s build<br />
                <span className="text-gradient-vio-cyan">something great.</span>
              </h1>
              <p className="font-body text-text-muted text-lg leading-relaxed max-w-md mb-10">
                Fill in the form or grab time directly on our calendar. Either way, you&apos;ll hear back within one business day.
              </p>
            </ScrollReveal>

            {/* Calendly placeholder */}
            <ScrollReveal delay={0.1}>
              <div className="surface-card surface-card-hover p-8 flex flex-col items-center justify-center gap-4 text-center min-h-[200px] group cursor-default">
                <div className="w-24 h-24 mix-blend-screen opacity-90 -mt-2">
                  <LottieClient animationData={meetingAnim} />
                </div>
                <div>
                  <p className="font-display font-bold text-text-primary mb-1">Book a 30-min call</p>
                  <p className="label-mono">Speak directly with our team</p>
                </div>
                <MagneticButton href="tel:+918428687001" variant="coral">
                  Book a Call
                </MagneticButton>
              </div>
            </ScrollReveal>

            {/* Direct contact */}
            <ScrollReveal delay={0.15} className="mt-8 flex gap-6">
              {[
                { label: "Phone", value: "+91 8428687001", href: "tel:+918428687001" },
                { label: "Email", value: "v4nexustech@gmail.com", href: "mailto:v4nexustech@gmail.com" },
                { label: "Twitter", value: "@v4nexus", href: "https://twitter.com/v4nexus" },
              ].map(({ label, value, href }) => (
                <div key={label}>
                  <p className="label-mono mb-1">{label}</p>
                  <a href={href} className="font-body text-text-muted hover:text-accent-cyan transition-colors text-sm">{value}</a>
                </div>
              ))}
            </ScrollReveal>
          </div>

          {/* Right — form */}
          <ScrollReveal delay={0.05} direction="right">
            {sent ? (
              <div className="surface-card surface-card-hover p-12 flex flex-col items-center justify-center gap-6 text-center min-h-[500px] group cursor-default">
                <div className="w-16 h-16 rounded-full bg-accent-cyan/20 flex items-center justify-center text-3xl">✓</div>
                <div>
                  <h2 className="font-display font-bold text-2xl text-text-primary mb-2">Message sent!</h2>
                  <p className="font-body text-text-muted">We&apos;ll get back to you within one business day.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="surface-card surface-card-hover p-8 lg:p-10 space-y-6 group">
                <p className="label-mono mb-2">// project brief</p>

                {/* Name */}
                <div>
                  <label className="label-mono block mb-2" htmlFor="name">Name</label>
                  <input
                    id="name" name="name" type="text" required
                    value={form.name} onChange={handleChange}
                    placeholder="[YOUR NAME]"
                    className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg px-4 py-3 font-body text-text-primary text-sm placeholder:text-text-muted/50 focus:outline-none focus:border-accent-cyan/60 focus:shadow-[0_0_0_3px_rgba(51,230,201,0.08)] transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="label-mono block mb-2" htmlFor="email">Email</label>
                  <input
                    id="email" name="email" type="email" required
                    value={form.email} onChange={handleChange}
                    placeholder="you@company.com"
                    className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg px-4 py-3 font-body text-text-primary text-sm placeholder:text-text-muted/50 focus:outline-none focus:border-accent-cyan/60 focus:shadow-[0_0_0_3px_rgba(51,230,201,0.08)] transition-all"
                  />
                </div>

                {/* Project type */}
                <div>
                  <label className="label-mono block mb-2" htmlFor="type">Project Type</label>
                  <select
                    id="type" name="type" required
                    value={form.type} onChange={handleChange}
                    className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-3 font-body text-text-primary text-sm focus:outline-none focus:border-accent-cyan/60 transition-all appearance-none"
                  >
                    <option value="" disabled className="bg-bg-base text-text-primary">Select type...</option>
                    {PROJECT_TYPES.map((t) => <option key={t} value={t} className="bg-bg-base text-text-primary">{t}</option>)}
                  </select>
                </div>

                {/* Budget */}
                <div>
                  <label className="label-mono block mb-2" htmlFor="budget">Budget Range</label>
                  <select
                    id="budget" name="budget" required
                    value={form.budget} onChange={handleChange}
                    className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-3 font-body text-text-primary text-sm focus:outline-none focus:border-accent-cyan/60 transition-all appearance-none"
                  >
                    <option value="" disabled className="bg-bg-base text-text-primary">Select range...</option>
                    {BUDGETS.map((b) => <option key={b} value={b} className="bg-bg-base text-text-primary">{b}</option>)}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="label-mono block mb-2" htmlFor="message">Tell us about the project</label>
                  <textarea
                    id="message" name="message" rows={5} required
                    value={form.message} onChange={handleChange}
                    placeholder="What are you building? What's the timeline?"
                    className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg px-4 py-3 font-body text-text-primary text-sm placeholder:text-text-muted/50 focus:outline-none focus:border-accent-cyan/60 focus:shadow-[0_0_0_3px_rgba(51,230,201,0.08)] transition-all resize-none"
                  />
                </div>

                <MagneticButton type="submit" variant="coral" className="w-full justify-center">
                  Send Message
                </MagneticButton>
              </form>
            )}
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
