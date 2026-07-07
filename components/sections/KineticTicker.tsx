"use client";

const WORDS = [
  "Web Apps", "Mobile", "AI Products", "Design Systems",
  "API Platforms", "MVPs", "Automation", "Cloud",
];

/** Oversized scrolling word band — the studio's disciplines, loud. */
export default function KineticTicker() {
  const row = [...WORDS, ...WORDS, ...WORDS];
  return (
    <section className="relative overflow-hidden border-y border-white/[0.06] bg-bg-surface/40 py-8">
      <div className="ticker-track items-center gap-8 whitespace-nowrap">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="font-display text-4xl font-bold tracking-tight text-text-primary/90 md:text-6xl">
              {w}
            </span>
            <span className="text-3xl text-accent-cyan md:text-5xl">✳</span>
          </span>
        ))}
      </div>
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg-base to-transparent md:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg-base to-transparent md:w-40" />
    </section>
  );
}
