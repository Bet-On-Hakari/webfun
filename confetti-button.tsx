"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { cn } from "@/lib/utils";

export function ConfettiButton({ className, children = "Celebrate" }: { className?: string; children?: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null);

  const fire = () => {
    const rect = ref.current?.getBoundingClientRect();
    const x = rect ? (rect.left + rect.width / 2) / window.innerWidth : 0.5;
    const y = rect ? (rect.top + rect.height / 2) / window.innerHeight : 0.5;
    confetti({
      particleCount: 80,
      spread: 70,
      startVelocity: 35,
      origin: { x, y },
      colors: ["#6366f1", "#a78bfa", "#f472b6", "#facc15"],
      scalar: 0.9,
    });
  };

  return (
    <motion.button
      ref={ref}
      onClick={fire}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 12 }}
      className={cn(
        "rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30",
        className,
      )}
    >
      {children}
    </motion.button>
  );
}
