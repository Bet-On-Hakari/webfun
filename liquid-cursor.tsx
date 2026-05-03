"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function LiquidCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredElement, setHoveredElement] = useState<DOMRect | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const size = useSpring(isHovering ? 80 : 20, springConfig);
  const opacity = useSpring(isHovering ? 0.3 : 0.8, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement;
      const isClickable = target.closest("button, a, [role='button'], .magnetic-target");
      
      if (isClickable) {
        setIsHovering(true);
        setHoveredElement(isClickable.getBoundingClientRect());
      } else {
        setIsHovering(false);
        setHoveredElement(null);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* SVG Filter for Liquid/Gooey Effect */}
      <svg className="hidden">
        <defs>
          <filter id="liquid-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <motion.div
        ref={cursorRef}
        style={{
          x: cursorX,
          y: cursorY,
          width: size,
          height: size,
          opacity,
          filter: "url(#liquid-goo)",
        }}
        className="absolute -left-1/2 -top-1/2 flex items-center justify-center"
      >
        <div className="h-full w-full rounded-full bg-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.5)]" />
        
        {/* Dynamic Blobs */}
        <AnimatePresence>
          {!isHovering && [1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, x: 0, y: 0 }}
              animate={{ 
                scale: [0.5, 1, 0.5],
                x: [0, (i % 2 === 0 ? 10 : -10), 0],
                y: [0, (i > 1 ? 10 : -10), 0]
              }}
              exit={{ scale: 0 }}
              transition={{ 
                repeat: Infinity, 
                duration: 2 + i * 0.5,
                ease: "easeInOut"
              }}
              className="absolute h-4 w-4 rounded-full bg-indigo-400/50"
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Trailing Liquid Effect */}
      <motion.div
        style={{
          x: useSpring(mouseX, { stiffness: 50, damping: 15 }),
          y: useSpring(mouseY, { stiffness: 50, damping: 15 }),
          width: 10,
          height: 10,
        }}
        className="absolute -left-[5px] -top-[5px] rounded-full bg-indigo-300/20 blur-sm"
      />
    </div>
  );
}
