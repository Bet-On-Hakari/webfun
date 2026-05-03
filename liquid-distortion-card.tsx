"use client";

import React, { useRef, useState } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface LiquidDistortionCardProps {
  title?: string;
  subtitle?: string;
  image?: string;
  className?: string;
}

export function LiquidDistortionCard({
  title = "Liquid Distortion",
  subtitle = "Interactive Warp Effect",
  image = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
  className,
}: LiquidDistortionCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 100, damping: 30 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Warp parameters
  const scale = useTransform(x, [-100, 100], [1.05, 0.95]);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  return (
    <div
      className="perspective-1000 group relative h-[400px] w-full overflow-hidden rounded-3xl"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        ref={cardRef}
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: "preserve-3d",
        }}
        className={cn(
          "relative h-full w-full bg-zinc-900 border border-zinc-800 transition-shadow hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]",
          className
        )}
      >
        {/* Background Image with Liquid Distortion Filter */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          <motion.img
            src={image}
            alt={title}
            style={{
              x: useTransform(x, (v) => v * -0.1),
              y: useTransform(y, (v) => v * -0.1),
              scale: 1.2,
            }}
            className="h-full w-full object-cover opacity-60 mix-blend-luminosity grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
          />
          
          {/* Liquid Overlay Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col justify-end p-8" style={{ transform: "translateZ(50px)" }}>
          <motion.h3 
            style={{ x: useTransform(x, (v) => v * 0.1), y: useTransform(y, (v) => v * 0.1) }}
            className="text-3xl font-bold text-white tracking-tighter"
          >
            {title}
          </motion.h3>
          <motion.p 
            style={{ x: useTransform(x, (v) => v * 0.05), y: useTransform(y, (v) => v * 0.05) }}
            className="mt-2 text-zinc-400 font-medium"
          >
            {subtitle}
          </motion.p>
          
          <div className="mt-6 flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-white text-zinc-950 rounded-full font-bold text-sm"
            >
              Explore
            </motion.button>
            <div className="h-10 w-10 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md">
              <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
            </div>
          </div>
        </div>

        {/* Glossy Reflection */}
        <motion.div
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%)",
            x: useTransform(x, (v) => v * 0.5),
            y: useTransform(y, (v) => v * 0.5),
          }}
          className="pointer-events-none absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
      </motion.div>
    </div>
  );
}
