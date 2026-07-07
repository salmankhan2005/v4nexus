"use client";
import { motion } from "framer-motion";
import { ElementType, Fragment } from "react";

interface RevealTextProps {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
  /** highlight specific words (by exact match) with a serif-italic accent */
  emphasis?: Record<string, "iris" | "solar">;
}

/**
 * Word-by-word "curtain" reveal — each word rises from behind an
 * overflow mask. The real text stays in the DOM (accessible & SEO-safe).
 */
export default function RevealText({
  text,
  as: Tag = "span",
  className = "",
  delay = 0,
  stagger = 0.045,
  once = true,
  emphasis = {},
}: RevealTextProps) {
  const words = text.split(" ");
  const MotionTag =
    typeof Tag === "string"
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ((motion as any)[Tag] ?? motion.span)
      : motion(Tag);

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-60px" }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      aria-label={text}
    >
      {words.map((word, i) => {
        const clean = word.replace(/[.,!?—]/g, "");
        const em = emphasis[clean];
        return (
          <Fragment key={`${word}-${i}`}>
            <span
              className="reveal-mask"
              style={{ display: "inline-block", verticalAlign: "top" }}
              aria-hidden="true"
            >
              <motion.span
                style={{ display: "inline-block", willChange: "transform" }}
                variants={{
                  hidden: { y: "115%", rotate: 4 },
                  visible: { y: "0%", rotate: 0 },
                }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className={em ? `em ${em === "iris" ? "em-iris" : "em-solar"}` : ""}
              >
                {word}
              </motion.span>
            </span>
            {i < words.length - 1 ? " " : ""}
          </Fragment>
        );
      })}
    </MotionTag>
  );
}
