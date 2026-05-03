"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function SuccessCheck({ className }: { className?: string }) {
  const [done, setDone] = useState(false);

  return (
    <button
      onClick={() => {
        setDone(false);
        requestAnimationFrame(() => setDone(true));
        setTimeout(() => setDone(false), 1800);
      }}
      className={cn(
        "relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-zinc-700 bg-zinc-900 transition-colors",
        done && "border-emerald-500 bg-emerald-500/10",
        className,
      )}
    >
      <AnimatePresence>
        {done && (
          <motion.svg
            key="check"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#10b981"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-7 w-7"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.path
              d="M4 12.6 9.2 18 20 7"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            />
          </motion.svg>
        )}
      </AnimatePresence>
      {!done && <div className="h-2 w-2 rounded-full bg-zinc-600" />}
    </button>
  );
}
