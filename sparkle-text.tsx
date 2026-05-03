"use client";
import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function SparkleText({
  text = "Magic",
  className,
}: {
  text?: string;
  className?: string;
}) {
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number; delay: number; size: number }[]>([]);

  useEffect(() => {
    setSparkles(
      Array.from({ length: 6 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2,
        size: 6 + Math.random() * 6,
      }))
    );
  }, []);

  return (
    <span className={cn("relative inline-block", className)}>
      <span className="bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-amber-300 bg-clip-text text-transparent font-bold">
        {text}
      </span>
      {sparkles.map((s) => (
        <motion.svg
          key={s.id}
          aria-hidden
          viewBox="0 0 24 24"
          width={s.size}
          height={s.size}
          className="pointer-events-none absolute text-amber-300"
          style={{ left: `${s.x}%`, top: `${s.y}%` }}
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], rotate: [0, 90, 180] }}
          transition={{ duration: 1.6, repeat: Infinity, delay: s.delay, ease: "easeInOut" }}
        >
          <path
            fill="currentColor"
            d="M12 2 14 10 22 12 14 14 12 22 10 14 2 12 10 10z"
          />
        </motion.svg>
      ))}
    </span>
  );
}
