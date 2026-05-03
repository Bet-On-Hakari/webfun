"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function PinInput({ length = 4, className }: { length?: number; className?: string }) {
  const [values, setValues] = useState<string[]>(() => Array(length).fill(""));
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const set = (i: number, v: string) => {
    const digit = v.replace(/\D/g, "").slice(-1);
    setValues((prev) => {
      const next = [...prev];
      next[i] = digit;
      return next;
    });
    if (digit && i < length - 1) refs.current[i + 1]?.focus();
  };

  return (
    <div className={cn("flex gap-2", className)}>
      {values.map((v, i) => (
        <motion.input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          inputMode="numeric"
          maxLength={1}
          value={v}
          onChange={(e) => set(i, e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Backspace" && !v && i > 0) refs.current[i - 1]?.focus();
          }}
          animate={v ? { scale: [1, 1.15, 1] } : { scale: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={cn(
            "h-12 w-10 rounded-lg border-2 bg-zinc-900 text-center text-lg font-semibold text-zinc-100 outline-none transition-colors",
            v ? "border-indigo-500" : "border-zinc-700 focus:border-zinc-500",
          )}
        />
      ))}
    </div>
  );
}
