"use client";

const LOGOS = [
  "Startup Co.", "BuildFast", "MobileFirst", "Scale.io",
  "FounderStack", "DevCore", "NexaLabs", "Shipyard Inc.",
];

export default function MarqueeStrip() {
  const doubled = [...LOGOS, ...LOGOS];
  return (
    <div className="overflow-hidden py-4">
      <div className="marquee-track">
        {doubled.map((name, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-6 px-8 font-mono text-xs tracking-widest text-text-muted uppercase whitespace-nowrap"
          >
            <span className="w-1 h-1 rounded-full bg-accent-cyan inline-block" />
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
