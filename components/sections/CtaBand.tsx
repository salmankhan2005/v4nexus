"use client";
import ScrollReveal from "@/components/ui/ScrollReveal";
import MagneticButton from "@/components/ui/MagneticButton";

export default function CtaBand() {
  return (
    <section className="py-28 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="section-divider mb-20" />
        <ScrollReveal>
          <div className="relative overflow-hidden surface-card surface-card-hover rounded-2xl p-12 lg:p-20 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 group cursor-default">
            {/* Background decorative glows */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-1/2 -left-1/4 w-[500px] h-[500px] rounded-full opacity-30"
              style={{ background: "radial-gradient(circle, rgba(108,92,224,0.3) 0%, transparent 70%)" }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-1/2 -right-1/4 w-[400px] h-[400px] rounded-full opacity-20"
              style={{ background: "radial-gradient(circle, rgba(51,230,201,0.3) 0%, transparent 70%)" }}
            />

            <div className="relative z-10 max-w-2xl">
              <p className="label-mono-accent mb-4">// ready to build?</p>
              <h2 className="font-display font-bold text-4xl lg:text-6xl text-text-primary leading-tight">
                Your idea deserves<br />
                <span className="text-gradient-vio-cyan">production-grade code.</span>
              </h2>
              <p className="font-body text-text-muted text-lg mt-5 max-w-lg">
                Tell us what you&apos;re building. We&apos;ll scope it, price it, and put a start date on the calendar — all in one call.
              </p>
            </div>

            <div className="relative z-10 flex flex-col gap-4">
              <MagneticButton href="/contact" variant="coral">
                Book a Call
              </MagneticButton>
              <p className="label-mono text-center">No commitment needed.</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
