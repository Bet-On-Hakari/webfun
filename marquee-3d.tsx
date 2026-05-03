"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const items = [
  "◆ Linear",
  "✺ Stripe",
  "❖ Vercel",
  "✦ Arc",
  "✷ Figma",
  "❄ Notion",
  "◇ Raycast",
  "✸ Framer",
];

export function Marquee3D({ className }: { className?: string }) {
  const doubled = [...items, ...items];
  return (
    <div
      className={cn("relative h-28 w-full overflow-hidden", className)}
      style={{ perspective: "700px" }}
    >
      <motion.div
        className="absolute inset-0 flex items-center gap-6 whitespace-nowrap"
        style={{ transform: "rotateX(18deg) rotateY(-12deg)", transformStyle: "preserve-3d" }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="rounded-full border border-white/10 bg-gradient-to-b from-zinc-800 to-zinc-950 px-6 py-3 text-base font-semibold text-white shadow-[0_10px_30px_-10px_rgba(99,102,241,0.4)]"
          >
            {item}
          </span>
        ))}
      </motion.div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-zinc-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-zinc-950 to-transparent" />
    </div>
  );
}
