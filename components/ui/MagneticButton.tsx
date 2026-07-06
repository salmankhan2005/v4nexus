"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "coral" | "ghost" | "outline";
  className?: string;
  type?: "button" | "submit";
}

export default function MagneticButton({
  href,
  onClick,
  children,
  variant = "coral",
  className = "",
  type = "button",
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
    setPos({ x, y });
  };

  const handleMouseLeave = () => setPos({ x: 0, y: 0 });

  const baseClasses =
    "relative inline-flex items-center justify-center px-5 py-2.5 rounded-full font-mono text-[11px] tracking-[0.12em] uppercase font-medium transition-all duration-200 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan";

  const variants = {
    coral:   "bg-signal-coral text-bg-base hover:brightness-110",
    ghost:   "bg-transparent border border-accent-violet text-text-primary hover:bg-accent-violet/10",
    outline: "bg-transparent border border-white/10 text-text-primary hover:border-accent-cyan hover:text-accent-cyan",
  };

  const inner = (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-flex"
    >
      <motion.span
        animate={{ x: pos.x, y: pos.y }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`${baseClasses} ${variants[variant]} ${className}`}
      >
        {children}
      </motion.span>
    </div>
  );

  if (href) {
    return <Link href={href} className="inline-flex">{inner}</Link>;
  }

  return (
    <button type={type} onClick={onClick} className="inline-flex">
      {inner}
    </button>
  );
}
