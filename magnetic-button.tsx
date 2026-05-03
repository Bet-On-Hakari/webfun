"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

export function MagneticButton({ children = "Magnetic", className }: { children?: React.ReactNode, className?: string }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;
  
  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.5 }}
      className={cn("relative rounded-full bg-zinc-900 px-10 py-4 font-bold text-white shadow-md border border-zinc-800 hover:bg-zinc-800 transition-colors", className)}
    >
      <motion.span 
        animate={{ x: x * 0.3, y: y * 0.3 }} 
        transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.5 }}
        className="inline-block pointer-events-none tracking-wide"
      >
        {children}
      </motion.span>
    </motion.button>
  );
}
