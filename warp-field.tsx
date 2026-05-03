"use client";
import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export function WarpField({
  text = "DISTORTION",
  className,
}: {
  text?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);
  const sx = useSpring(x, { stiffness: 200, damping: 25, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 25, mass: 0.4 });

  const mask = useMotionTemplate`radial-gradient(circle at ${sx}px ${sy}px, black 0%, black 70px, transparent 180px)`;

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  const handleLeave = () => {
    x.set(-9999);
    y.set(-9999);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn("relative h-full w-full overflow-hidden", className)}
    >
      <svg className="pointer-events-none absolute h-0 w-0" aria-hidden>
        <defs>
          <filter id="warp-field-filter" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.02 0.04" numOctaves="2" seed="3">
              <animate
                attributeName="baseFrequency"
                dur="9s"
                values="0.02 0.04;0.05 0.02;0.02 0.04"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" scale="44" />
          </filter>
        </defs>
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <span className="select-none text-5xl md:text-7xl font-black tracking-tight text-zinc-300/30">
          {text}
        </span>
      </div>

      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          filter: "url(#warp-field-filter)",
          maskImage: mask,
          WebkitMaskImage: mask,
        }}
      >
        <span className="select-none bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-amber-300 bg-clip-text text-5xl md:text-7xl font-black tracking-tight text-transparent">
          {text}
        </span>
      </motion.div>
    </div>
  );
}
