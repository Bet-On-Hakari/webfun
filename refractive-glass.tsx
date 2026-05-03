"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring, useMotionValue, useTransform, useMotionTemplate } from "framer-motion";
import { cn } from "@/lib/utils";

export function RefractiveGlass({ children, className }: { children: React.ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Physics for smooth rotation and refraction
  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);
  
  // Refraction offsets
  const shiftX = useTransform(mouseX, [-0.5, 0.5], [-20, 20]);
  const shiftY = useTransform(mouseY, [-0.5, 0.5], [-20, 20]);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className="perspective-1000 py-12">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={cn(
          "relative group h-96 w-[500px] rounded-[2rem] p-1 shadow-2xl transition-all duration-500",
          className
        )}
      >
        {/* The Outer Frame */}
        <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/20 via-transparent to-black/40 border border-white/10" />
        
        {/* The Refractive Layer (The "Glass") */}
        <motion.div 
          className="absolute inset-2 rounded-[1.8rem] overflow-hidden bg-white/5 backdrop-blur-2xl border border-white/20 shadow-inner"
          style={{
            transform: "translateZ(50px)",
          }}
        >
          {/* Refractive Light Catchers */}
          <motion.div 
            className="absolute -inset-[100%] bg-gradient-to-tr from-transparent via-white/10 to-transparent"
            style={{
              x: useTransform(mouseX, [-0.5, 0.5], ["-50%", "50%"]),
              y: useTransform(mouseY, [-0.5, 0.5], ["-50%", "50%"]),
              rotate: 45,
            }}
          />
          
          {/* Rainbow Edge Refraction (Chromatic Aberration-ish) */}
          <div className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none">
             <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-green-500/10 to-blue-500/10" />
          </div>

          <div className="relative z-10 h-full w-full p-10 flex flex-col justify-between">
            {children}
          </div>
        </motion.div>

        {/* Content behind the glass (Refracted) */}
        <motion.div 
          className="absolute inset-8 rounded-2xl bg-zinc-900/50 flex items-center justify-center overflow-hidden"
          style={{
            x: shiftX,
            y: shiftY,
            transform: "translateZ(-20px)",
          }}
        >
          <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2670&auto=format&fit=crop')] bg-cover" />
          <div className="h-32 w-32 rounded-full bg-indigo-500/30 blur-3xl animate-pulse" />
        </motion.div>

        {/* Floating Accents */}
        <motion.div 
          className="absolute -top-4 -right-4 h-20 w-20 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 shadow-lg flex items-center justify-center text-black font-black"
          style={{
            transform: "translateZ(80px)",
          }}
        >
          3D
        </motion.div>
      </motion.div>
    </div>
  );
}
