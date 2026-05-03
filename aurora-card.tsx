"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const blobs = [
  { color: "rgb(99,102,241)", x: [0, 240, 80, 0], y: [0, 130, 60, 0], d: 14 },
  { color: "rgb(236,72,153)", x: [340, 80, 260, 340], y: [40, 180, 100, 40], d: 16 },
  { color: "rgb(16,185,129)", x: [200, 40, 180, 200], y: [170, 20, 100, 170], d: 18 },
  { color: "rgb(168,85,247)", x: [120, 290, 40, 120], y: [80, 150, 30, 80], d: 20 },
];

export function AuroraCard({
  className,
  children = "Aurora",
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative h-56 w-full overflow-hidden rounded-2xl border border-white/5 bg-zinc-950",
        className,
      )}
    >
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className="absolute h-72 w-72 rounded-full opacity-60 blur-3xl"
          style={{ background: b.color, top: 0, left: 0 }}
          animate={{ x: b.x, y: b.y }}
          transition={{ duration: b.d, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <div
        className="absolute inset-0 opacity-[0.18] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <div className="relative flex h-full items-center justify-center">
        <h3 className="bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
          {children}
        </h3>
      </div>
    </div>
  );
}
