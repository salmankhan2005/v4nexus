"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

/**
 * Bespoke two-part cursor: a precise center dot + a lagging ring that
 * expands over interactive elements. Desktop / fine-pointer only.
 */
export default function Cursor() {
  const [isMounted, setIsMounted] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      setEnabled(
        window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    }
  }, []);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [down, setDown] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 32, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 350, damping: 32, mass: 0.6 });

  useEffect(() => {
    if (!enabled) return;
    document.body.classList.add("has-cursor");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);

      const el = (e.target as HTMLElement)?.closest(
        "a, button, [data-cursor], input, textarea, select, label"
      ) as HTMLElement | null;
      if (el) {
        setHovering(true);
        setLabel(el.getAttribute("data-cursor-label"));
      } else {
        setHovering(false);
        setLabel(null);
      }
    };
    const leave = () => setVisible(false);
    const dn = () => setDown(true);
    const up = () => setDown(false);

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", leave);
    window.addEventListener("mousedown", dn);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      window.removeEventListener("mousedown", dn);
      window.removeEventListener("mouseup", up);
      document.body.classList.remove("has-cursor");
    };
  }, [x, y, enabled]);

  if (!isMounted || !enabled) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] hidden md:block mix-blend-difference"
      style={{ opacity: visible ? 1 : 0, transition: "opacity .25s" }}
    >
      {/* Lagging ring */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="absolute top-0 left-0"
      >
        <motion.div
          animate={{
            width: hovering ? 64 : 36,
            height: hovering ? 64 : 36,
            borderColor: hovering ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.5)",
            backgroundColor: hovering ? "rgba(255,255,255,1)" : "rgba(255,255,255,0)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border-2"
          style={{ scale: down ? 0.82 : 1 }}
        >
          <AnimatePresence>
            {label && (
              <motion.span
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[10px] font-bold uppercase tracking-widest text-black"
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Precise dot */}
      <motion.div
        style={{ x, y }}
        className="absolute top-0 left-0"
      >
        <div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-white transition-transform"
          style={{
            width: 8,
            height: 8,
            transform: `translate(-50%,-50%) scale(${hovering ? 0 : 1})`,
          }}
        />
      </motion.div>
    </div>
  );
}
