"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function GooeyOrbit({
  blobs = 6,
  className,
}: {
  blobs?: number;
  className?: string;
}) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={cn("relative flex h-44 w-44 items-center justify-center", className)}
    >
      <svg className="pointer-events-none absolute h-0 w-0" aria-hidden>
        <defs>
          <filter id="goo-orbit-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -11"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
      <div className="relative h-full w-full" style={{ filter: "url(#goo-orbit-filter)" }}>
        <motion.div
          animate={{ scale: hover ? 1.1 : 1, rotate: hover ? 360 : 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.6)]"
        />
        {Array.from({ length: blobs }).map((_, i) => {
          const angle = (i * Math.PI * 2) / blobs;
          const r = hover ? 60 : 0;
          return (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2 -ml-5 -mt-5 h-10 w-10 rounded-full bg-fuchsia-500"
              animate={{
                x: Math.cos(angle) * r,
                y: Math.sin(angle) * r,
                scale: hover ? 1 : 0.5,
              }}
              transition={{ type: "spring", stiffness: 220, damping: 14, delay: i * 0.04 }}
            />
          );
        })}
      </div>
    </div>
  );
}
