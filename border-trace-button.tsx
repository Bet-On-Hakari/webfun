"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function BorderTraceButton({
  className,
  children = "Launch App",
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <button
      className={cn(
        "relative inline-flex h-12 overflow-hidden rounded-full p-[1.5px] focus:outline-none",
        className,
      )}
    >
      <motion.span
        aria-hidden
        className="absolute inset-[-1000%]"
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0%, transparent 60%, #818cf8 75%, #f472b6 88%, #fbbf24 95%, transparent 100%)",
        }}
      />
      <span className="relative inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-zinc-950 px-7 text-sm font-medium text-white backdrop-blur-3xl">
        {children}
      </span>
    </button>
  );
}
