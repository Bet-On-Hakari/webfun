"use client";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { cn } from "@/lib/utils";

export function HolographicCard({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const spring = { stiffness: 200, damping: 18, mass: 0.6 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), spring);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-14, 14]), spring);

  const px = useTransform(x, [-0.5, 0.5], [0, 100]);
  const py = useTransform(y, [-0.5, 0.5], [0, 100]);

  const holo = useMotionTemplate`conic-gradient(from 90deg at ${px}% ${py}%, #ff00aa, #ff7700, #ffea00, #00ff95, #00b3ff, #aa00ff, #ff00aa)`;
  const sheen = useMotionTemplate`radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.45), transparent 55%)`;

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
      className={cn(
        "relative h-56 w-80 cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black shadow-[0_25px_60px_-15px_rgba(99,102,241,0.55)]",
        className,
      )}
    >
      <motion.div className="absolute inset-0 mix-blend-color-dodge opacity-60" style={{ background: holo }} />
      <motion.div className="absolute inset-0 mix-blend-overlay" style={{ background: sheen }} />
      <div className="relative flex h-full flex-col justify-between p-6 text-white">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/80">
            UI · Magic
          </span>
          <div className="h-9 w-12 rounded-md bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 shadow-inner" />
        </div>
        <div>
          <p className="font-mono text-base tracking-[0.3em] text-white/95">4242 8888 0000 1234</p>
          <div className="mt-3 flex justify-between text-[10px] uppercase tracking-widest text-white/60">
            <span>Holographic</span>
            <span>12 / 28</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
