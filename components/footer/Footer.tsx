import Link from "next/link";
import MagneticButton from "@/components/ui/MagneticButton";

const LINKS = {
  Pages: [
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  Social: [
    { label: "GitHub", href: "#" },
    { label: "Twitter", href: "https://twitter.com/v4nexus" },
    { label: "LinkedIn", href: "#" },
    { label: "WhatsApp", href: "https://wa.me/918428687001" },
  ],
  Contact: [
    { label: "v4nexustech@gmail.com", href: "mailto:v4nexustech@gmail.com" },
    { label: "+91 8428687001", href: "tel:+918428687001" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] px-6 pt-16 lg:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="mb-3 flex items-center gap-2.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-[5px] bg-gradient-to-br from-accent-violet to-accent-cyan">
              <span className="font-mono text-[11px] font-bold text-bg-base">V4</span>
            </span>
            <span className="font-display text-lg font-bold tracking-tight text-text-primary">NEXUS</span>
          </div>
          <p className="max-w-xs font-body text-sm leading-relaxed text-text-muted">
            A focused team that ships production-grade web and mobile software. No fluff, no bloat &mdash;
            just working products.
          </p>
          <div className="mt-6 inline-block" data-cursor-label="Let's talk">
            <MagneticButton href="/contact" variant="coral">
              Book a call &rarr;
            </MagneticButton>
          </div>
        </div>

        {Object.entries(LINKS).map(([group, items]) => (
          <div key={group}>
            <p className="label-mono mb-4">{group}</p>
            <ul className="flex flex-col gap-3">
              {items.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="font-body text-sm text-text-muted transition-colors hover:text-accent-cyan"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-white/[0.04] pt-8 sm:flex-row">
        <p className="label-mono">&copy; {new Date().getFullYear()} V4 Nexus. All rights reserved.</p>
        <p className="label-mono flex items-center gap-2">
          <span className="live-dot" /> building what&apos;s next
        </p>
      </div>

      <div className="pointer-events-none mt-10 select-none text-center">
        <span className="font-display text-[18vw] font-bold leading-none tracking-tighter text-white/[0.025]">
          V4&nbsp;NEXUS
        </span>
      </div>
    </footer>
  );
}
