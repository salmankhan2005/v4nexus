import Link from "next/link";
import MagneticButton from "@/components/ui/MagneticButton";

const LINKS = {
  Pages: [
    { label: "Services", href: "/services" },
    { label: "Work",     href: "/work"     },
    { label: "About",   href: "/about"    },
    { label: "Contact", href: "/contact"  },
  ],
  Social: [
    { label: "GitHub",   href: "#" },
    { label: "Twitter",  href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "Dribbble", href: "#" },
  ],
  Contact: [
    { label: "v4nexustech@gmail.com", href: "mailto:v4nexustech@gmail.com" },
    { label: "+91 8428687001", href: "tel:+918428687001" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-16 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="md:col-span-2">
          <p className="font-display font-bold text-xl text-text-primary mb-3">
            V4<span className="text-gradient-vio-cyan">NEXUS</span>
          </p>
          <p className="font-body text-text-muted text-sm leading-relaxed max-w-xs">
            A focused team that ships production-grade web and mobile software. No fluff, no bloat.
          </p>
          <div className="mt-6 inline-block">
            <MagneticButton href="/contact" variant="coral">
              Book a Call →
            </MagneticButton>
          </div>
        </div>

        {/* Links */}
        {Object.entries(LINKS).map(([group, items]) => (
          <div key={group}>
            <p className="label-mono mb-4">{group}</p>
            <ul className="flex flex-col gap-3">
              {items.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="font-body text-text-muted text-sm hover:text-text-primary transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="label-mono">© {new Date().getFullYear()} V4 Nexus. All rights reserved.</p>
        <p className="label-mono">Built with precision.</p>
      </div>
    </footer>
  );
}
