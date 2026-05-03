"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function BreathingCard({
  title = "Inhale...",
  subtitle = "Exhale.",
  className,
}: {
  title?: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <motion.div
      animate={{
        scale: [1, 1.04, 1],
        boxShadow: [
          "0 0 0 0 rgba(99,102,241,0)",
          "0 0 40px 8px rgba(99,102,241,0.25)",
          "0 0 0 0 rgba(99,102,241,0)",
        ],
      }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className={cn(
        "relative flex h-40 w-40 flex-col items-center justify-center rounded-full bg-zinc-900 border border-indigo-500/30",
        className,
      )}
    >
      <span className="text-sm font-medium text-zinc-200">{title}</span>
      <span className="text-xs text-zinc-500">{subtitle}</span>
    </motion.div>
  );
}
