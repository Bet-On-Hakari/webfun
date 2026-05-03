"use client";
import { useId, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function FloatingLabelInput({
  label = "Email",
  className,
}: {
  label?: string;
  className?: string;
}) {
  const id = useId();
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;

  return (
    <div className={cn("relative w-56", className)}>
      <input
        id={id}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={cn(
          "peer w-full rounded-lg border-2 border-zinc-700 bg-zinc-900 px-3 pt-5 pb-2 text-sm text-zinc-100 outline-none transition-colors",
          focused && "border-indigo-500",
        )}
      />
      <motion.label
        htmlFor={id}
        animate={{
          y: lifted ? -10 : 6,
          scale: lifted ? 0.8 : 1,
          color: focused ? "#818cf8" : "#a1a1aa",
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="pointer-events-none absolute left-3 top-2 origin-left text-sm"
      >
        {label}
      </motion.label>
    </div>
  );
}
