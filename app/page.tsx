import HeroSection    from "@/components/hero/HeroSection";
import KineticTicker  from "@/components/sections/KineticTicker";
import BentoGrid      from "@/components/sections/BentoGrid";
import ProcessSteps   from "@/components/sections/ProcessSteps";
import FeaturedWork   from "@/components/sections/FeaturedWork";
import MarqueeStrip   from "@/components/ui/MarqueeStrip";
import CtaBand        from "@/components/sections/CtaBand";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <KineticTicker />
      <BentoGrid />
      <ProcessSteps />

      {/* Trusted-by client marquee */}
      <div className="border-y border-white/[0.05] bg-bg-surface/40 py-4">
        <p className="mb-3 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted">
          trusted by teams that ship
        </p>
        <MarqueeStrip />
      </div>

      <FeaturedWork />
      <CtaBand />
    </>
  );
}
