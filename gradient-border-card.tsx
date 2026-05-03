"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function GradientBorderCard({
  className,
  children = "Animated Border",
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl p-[1.5px]", className)}>
      <motion.div
        aria-hidden
        className="absolute inset-[-100%]"
        animate={{ rotate: 360 }}
        transition={{ duration: 6, ease: "linear", repeat: Infinity }}
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0%, #6366f1 25%, #a78bfa 50%, #f472b6 75%, transparent 100%)",
        }}
      />
      <div className="relative rounded-[14px] bg-zinc-950 px-6 py-5 text-sm font-medium text-zinc-100">
        {children}
      </div>
    </div>
  );
}
