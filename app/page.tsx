import HeroSection   from "@/components/hero/HeroSection";
import BentoGrid     from "@/components/sections/BentoGrid";
import ProcessSteps  from "@/components/sections/ProcessSteps";
import FeaturedWork  from "@/components/sections/FeaturedWork";
import MarqueeStrip  from "@/components/ui/MarqueeStrip";
import CtaBand       from "@/components/sections/CtaBand";

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Client logo marquee */}
      <div className="border-y border-white/[0.04] bg-bg-surface/40 py-2">
        <MarqueeStrip />
      </div>

      <BentoGrid />
      <ProcessSteps />
      <FeaturedWork />
      <CtaBand />
    </>
  );
}
