"use client";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Heart, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function SwipeCard({ className }: { className?: string }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);
  
  // Using background color transform to show red on left, green on right
  const background = useTransform(
    x,
    [-100, 0, 100],
    ["rgba(239, 68, 68, 0.15)", "rgba(39, 39, 42, 1)", "rgba(16, 185, 129, 0.15)"]
  );
  
  const borderColor = useTransform(
    x,
    [-100, 0, 100],
    ["rgba(239, 68, 68, 0.5)", "rgba(63, 63, 70, 1)", "rgba(16, 185, 129, 0.5)"]
  );

  return (
    <div className={cn("relative flex h-64 w-48 items-center justify-center", className)}>
      {/* Background card (the next one in stack) */}
      <div className="absolute inset-0 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl scale-95 translate-y-3 opacity-50" />
      <div className="absolute inset-0 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl scale-[0.98] translate-y-1.5 opacity-75" />
      
      {/* Foreground card */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        style={{ x, rotate, background, borderColor }}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-2xl border-2 shadow-2xl cursor-grab active:cursor-grabbing backdrop-blur-sm"
        whileDrag={{ scale: 1.05 }}
        dragElastic={0.8}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="absolute top-4 left-4">
          <motion.div 
            style={{ opacity: useTransform(x, [-50, -100], [0, 1]) }}
            className="rounded-full border-2 border-red-500 p-1.5 text-red-500"
          >
            <X className="h-5 w-5" />
          </motion.div>
        </div>
        <div className="absolute top-4 right-4">
          <motion.div 
            style={{ opacity: useTransform(x, [50, 100], [0, 1]) }}
            className="rounded-full border-2 border-emerald-500 p-1.5 text-emerald-500"
          >
            <Heart className="h-5 w-5" />
          </motion.div>
        </div>

        <div className="w-16 h-16 bg-zinc-700/50 rounded-full mb-4 mt-6" />
        <div className="w-24 h-3 bg-zinc-700/50 rounded-full mb-2" />
        <div className="w-16 h-2 bg-zinc-700/50 rounded-full" />
      </motion.div>
    </div>
  );
}
