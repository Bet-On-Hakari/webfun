"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export function LiquidSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Bulge physics
  const bulgeX = useSpring(0, { stiffness: 300, damping: 30 });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // If mouse is near the left edge, start bulging
      if (e.clientX < 100 && !isOpen) {
        bulgeX.set((100 - e.clientX) * 0.5);
      } else if (!isOpen) {
        bulgeX.set(0);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isOpen, mouseX, mouseY, bulgeX]);

  const path = useTransform(bulgeX, (b) => {
    // Generate an SVG path that bulges out at the mouseY position
    const y = mouseY.get();
    const height = mounted ? window.innerHeight : 0;
    const bValue = isOpen ? 280 : b;

    return `M 0 0 L 0 ${height} L ${bValue} ${height} Q ${bValue + b * 2} ${y} ${bValue} 0 Z`;
  });

  return (
    <>
      <div 
        className="fixed inset-y-0 left-0 w-4 z-[100] cursor-pointer"
        onMouseEnter={() => setIsOpen(true)}
      />
      
      <div 
        className={cn(
          "fixed inset-0 z-[90] pointer-events-none transition-opacity duration-500",
          isOpen ? "bg-black/40 opacity-100 pointer-events-auto" : "opacity-0"
        )}
        onMouseEnter={() => setIsOpen(false)}
      />

      <motion.div 
        className="fixed inset-y-0 left-0 z-[100] pointer-events-none"
        onMouseLeave={() => setIsOpen(false)}
      >
        {mounted && (
          <svg className="h-full w-[400px] pointer-events-auto">
            <motion.path
              d={path}
              fill="#09090b"
              stroke="#27272a"
              strokeWidth="1"
            />
          </svg>
        )}

        <motion.div 
          animate={{ x: isOpen ? 0 : -300, opacity: isOpen ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 25, delay: isOpen ? 0.1 : 0 }}
          className="absolute inset-y-0 left-0 w-64 p-8 flex flex-col gap-6 pointer-events-auto"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Navigation</h2>
          {["Dashboard", "Projects", "Analytics", "Settings"].map((item, i) => (
            <motion.div
              key={item}
              whileHover={{ x: 10, color: "#6366f1" }}
              className="text-zinc-400 font-medium cursor-pointer flex items-center gap-3"
            >
              <div className="h-2 w-2 rounded-full bg-indigo-500" />
              {item}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </>
  );
}
