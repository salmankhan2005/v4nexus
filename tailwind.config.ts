import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-base":      "#0A0B10",
        "bg-surface":   "#0E1017",
        "bg-raised":    "#141824",
        "accent-violet":"#6E7BFF",
        "accent-cyan":  "#FF8A3D",
        "signal-coral": "#FF7A45",
        "text-primary": "#ECEAE1",
        "text-muted":   "#7B8290",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body:    ["var(--font-body)",    "sans-serif"],
        mono:    ["var(--font-mono)",    "monospace"],
        serif:   ["var(--font-serif)",   "Georgia", "serif"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      animation: {
        "fade-up":   "fadeUp 0.6s ease forwards",
        "fade-in":   "fadeIn 0.5s ease forwards",
        "glow-pulse":"glowPulse 3s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.6" },
          "50%":       { opacity: "1"   },
        },
      },
      backgroundImage: {
        "gradient-vio-cyan": "linear-gradient(105deg, #6E7BFF 0%, #FF8A3D 100%)",
        "gradient-radial":   "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
