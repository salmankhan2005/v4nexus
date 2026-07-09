"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";

const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastPath = useRef(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (lastPath.current !== pathname) {
      lastPath.current = pathname;
      setMenuOpen((open) => (open ? false : open));
    }
  }, [pathname]);

  return (
    <>
      <nav
        className={`fixed inset-x-4 top-4 z-[60] mx-auto max-w-7xl transition-all duration-500 rounded-full ${
          scrolled
            ? "border border-white/10 bg-bg-base/70 backdrop-blur-3xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            : "border border-transparent bg-transparent"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-6 lg:px-8">
          <Link href="/" className="group flex items-center gap-2.5" data-cursor-label="Home">
            <span className="relative flex h-6 w-6 items-center justify-center">
              <span className="absolute inset-0 rounded-[5px] bg-gradient-to-br from-accent-violet to-accent-cyan opacity-90 transition-transform duration-500 group-hover:rotate-90" />
              <span className="relative font-mono text-[11px] font-bold text-bg-base">V4</span>
            </span>
            <span className="font-display text-lg font-bold tracking-tight text-text-primary">
              NEXUS
            </span>
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map(({ label, href }) => {
              const active = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    data-cursor
                    className={`relative font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-200 ${
                      active ? "text-accent-cyan" : "text-text-muted hover:text-text-primary"
                    }`}
                  >
                    {label}
                    {active ? (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute -bottom-1.5 left-0 h-px w-full bg-accent-cyan"
                      />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden md:block" data-cursor-label="Let's talk">
            <MagneticButton href="/contact" variant="coral">
              Book a call
            </MagneticButton>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="flex flex-col gap-1.5 p-2 md:hidden"
          >
            <span className={`block h-px w-6 bg-text-primary transition-all duration-300 ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`block h-px w-6 bg-text-primary transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-px w-6 bg-text-primary transition-all duration-300 ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-bg-base/95 backdrop-blur-xl md:hidden"
          >
            {NAV_LINKS.map(({ label, href }, i) => (
              <motion.div
                key={href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.07 }}
              >
                <Link
                  href={href}
                  className="font-display text-4xl font-bold text-text-primary transition-colors hover:text-accent-cyan"
                >
                  {label}
                </Link>
              </motion.div>
            ))}
            <MagneticButton href="/contact" variant="coral">
              Book a call
            </MagneticButton>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
