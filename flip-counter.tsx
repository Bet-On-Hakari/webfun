"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

function Digit({ value }: { value: number }) {
  return (
    <div className="relative h-14 w-10 overflow-hidden rounded-md bg-zinc-900 border border-zinc-800">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: "-100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="absolute inset-0 flex items-center justify-center font-mono text-2xl font-semibold text-zinc-100"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export function FlipCounter({ start = 0, className }: { start?: number; className?: string }) {
  const [n, setN] = useState(start);
  useEffect(() => {
    const id = setInterval(() => setN((v) => (v + 1) % 1000), 1500);
    return () => clearInterval(id);
  }, []);

  const digits = String(n).padStart(3, "0").split("").map(Number);
  return (
    <div className={cn("flex gap-1.5", className)}>
      {digits.map((d, i) => (
        <Digit key={i} value={d} />
      ))}
    </div>
  );
}
