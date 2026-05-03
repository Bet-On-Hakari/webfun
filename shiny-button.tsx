"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function ShinyButton({ text = "Shiny Button", className }: { text?: string; className?: string }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.85 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className={cn(
        "relative overflow-hidden rounded-xl bg-zinc-900 px-6 py-3 font-medium text-zinc-100 shadow-[0_0_40px_-10px_rgba(255,255,255,0.2)] border border-zinc-700",
        className
      )}
    >
      <span className="relative z-10">{text}</span>
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "200%" }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", repeatDelay: 1 }}
        className="absolute inset-0 z-0 w-1/3 skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />
    </motion.button>
  );
}
