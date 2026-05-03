"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const cards = [
  { title: "Stripe", grad: "from-violet-500 to-indigo-600" },
  { title: "Linear", grad: "from-pink-500 to-rose-600" },
  { title: "Vercel", grad: "from-emerald-400 to-cyan-600" },
  { title: "Arc", grad: "from-amber-400 to-orange-600" },
  { title: "Figma", grad: "from-fuchsia-500 to-purple-700" },
  { title: "Notion", grad: "from-zinc-300 to-zinc-500" },
  { title: "Raycast", grad: "from-red-500 to-rose-700" },
  { title: "Framer", grad: "from-sky-400 to-blue-700" },
  { title: "Apple", grad: "from-zinc-100 to-zinc-400" },
  { title: "OpenAI", grad: "from-teal-300 to-emerald-700" },
  { title: "Anthropic", grad: "from-orange-300 to-amber-600" },
  { title: "Stitch", grad: "from-indigo-400 to-fuchsia-700" },
];

export function Cylinder3D({ className }: { className?: string }) {
  const radius = 240;
  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center",
        className,
      )}
      style={{ perspective: "1200px" }}
    >
      <motion.div
        className="relative h-44 w-32"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {cards.map((card, i) => {
          const angle = (i / cards.length) * 360;
          return (
            <div
              key={i}
              className={cn(
                "absolute inset-0 flex items-center justify-center rounded-2xl bg-gradient-to-br border border-white/20 text-white font-bold text-lg shadow-[0_10px_40px_-10px_rgba(99,102,241,0.5)]",
                card.grad,
              )}
              style={{
                transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                backfaceVisibility: "hidden",
              }}
            >
              {card.title}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
