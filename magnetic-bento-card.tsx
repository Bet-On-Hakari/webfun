"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticBentoCardProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export function MagneticBentoCard({
  title = "Interactive Card",
  description = "Move your cursor near me to feel the magnetic pull.",
  icon,
  className,
  children,
}: MagneticBentoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Mouse position relative to card center
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for smooth movement
  const springConfig = { stiffness: 150, damping: 20, mass: 0.1 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // Tilt effects
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  // Glow effect position
  const glowX = useSpring(useTransform(x, [-100, 100], [0, 100]), springConfig);
  const glowY = useSpring(useTransform(y, [-100, 100], [0, 100]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Limit the pull distance
    const maxPull = 40;
    const limitedX = Math.max(Math.min(distanceX * 0.2, maxPull), -maxPull);
    const limitedY = Math.max(Math.min(distanceY * 0.2, maxPull), -maxPull);

    mouseX.set(limitedX);
    mouseY.set(limitedY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div 
      className="perspective-1000 w-full h-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        ref={cardRef}
        style={{
          x,
          y,
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={cn(
          "relative h-full min-h-[200px] w-full overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl transition-colors hover:border-zinc-700",
          className
        )}
      >
        {/* Glow effect */}
        <motion.div
          style={{
            left: useTransform(glowX, (v) => `${v}%`),
            top: useTransform(glowY, (v) => `${v}%`),
          }}
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-blue-500/10 blur-[80px]"
        />

        <div className="relative z-10 flex h-full flex-col justify-between">
          <div>
            {icon && (
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 text-blue-400 border border-zinc-800">
                {icon}
              </div>
            )}
            <h3 className="text-xl font-bold text-zinc-100 tracking-tight">{title}</h3>
            <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{description}</p>
          </div>
          
          <div className="mt-4">
            {children}
          </div>

          <div className="mt-4 flex items-center gap-2">
            <div className="h-1 w-1 rounded-full bg-blue-500" />
            <span className="text-[10px] font-medium uppercase tracking-widest text-zinc-500">Magnetic Module</span>
          </div>
        </div>

        {/* Ambient border glow */}
        <div className="absolute inset-0 rounded-3xl border border-white/5 pointer-events-none" />
      </motion.div>
    </div>
  );
}
