"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CHARS = "!@#$%^&*()_+{}:\"<>?|[];',./`~";

export function TextScramble({ text, className }: { text: string, className?: string }) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!isHovering) {
      setDisplayText(text);
      return;
    }

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) =>
        prev
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [isHovering, text]);

  return (
    <motion.span
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={className}
    >
      {displayText}
    </motion.span>
  );
}
