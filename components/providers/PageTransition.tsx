"use client";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Route transition: content fades/rises in while a solid ink panel
 * sweeps up and off the screen. The panel always ends off-screen,
 * so it can never trap the view on a blank frame.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Always start a new route at the top.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
      >
        {children}
      </motion.div>

      <motion.div
        key={`wipe-${pathname}`}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[9996]"
        initial={{ y: "100%" }}
        animate={{ y: "-100%" }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="absolute inset-0 bg-[#0A0B10]" />
        <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-accent-violet via-accent-cyan to-accent-violet" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.4em] text-text-muted">
            V4<span className="text-accent-cyan">NEXUS</span>
          </span>
        </div>
      </motion.div>
    </>
  );
}
