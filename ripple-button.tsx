"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function RippleButton({ className, children = "Click Me" }: { className?: string, children?: React.ReactNode }) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = { x, y, id: Date.now() };
    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 800);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.85 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      onClick={handleClick}
      className={cn(
        "relative overflow-hidden rounded-xl bg-zinc-200 px-8 py-3 font-bold text-zinc-900 shadow-md",
        className
      )}
    >
      <span className="relative z-10">{children}</span>
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 6, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute rounded-full bg-black/20 pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 50,
              height: 50,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </AnimatePresence>
    </motion.button>
  );
}
