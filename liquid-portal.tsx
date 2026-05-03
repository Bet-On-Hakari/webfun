"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring, useMotionValue, useMotionTemplate } from "framer-motion";
import { cn } from "@/lib/utils";

export function LiquidPortal({ children, className }: { children: React.ReactNode, className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Physics values for distortion
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const velocity = useMotionValue(0);
  const distortionScale = useSpring(0, { stiffness: 100, damping: 30 });
  const baseFrequency = useSpring(0.01, { stiffness: 50, damping: 20 });

  useEffect(() => {
    let lastX = 0;
    let lastY = 0;
    let lastTime = Date.now();

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      mouseX.set(x);
      mouseY.set(y);

      // Calculate velocity
      const now = Date.now();
      const dt = now - lastTime;
      const dist = Math.sqrt(Math.pow(x - lastX, 2) + Math.pow(y - lastY, 2));
      const v = dist / (dt || 1);
      
      velocity.set(v);
      distortionScale.set(Math.min(v * 2, 20));
      baseFrequency.set(0.01 + v * 0.005);

      lastX = x;
      lastY = y;
      lastTime = now;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, velocity, distortionScale, baseFrequency]);

  // Reset distortion when mouse stops
  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() - 100 > 100) { // Simple idle check
        distortionScale.set(0);
        baseFrequency.set(0.01);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [distortionScale, baseFrequency]);

  return (
    <div ref={containerRef} className={cn("relative group overflow-hidden rounded-3xl bg-zinc-950 border border-zinc-800", className)}>
      {/* The Liquid Filter */}
      <svg className="absolute w-0 h-0 invisible">
        <defs>
          <filter id="liquid-warp-filter">
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.01 0.01" 
              numOctaves="1" 
              result="noise" 
            >
              <animate 
                attributeName="baseFrequency" 
                values="0.01; 0.015; 0.01" 
                dur="10s" 
                repeatCount="indefinite" 
              />
            </feTurbulence>
            <feDisplacementMap 
              in="SourceGraphic" 
              in2="noise" 
              scale="20" 
              xChannelSelector="R" 
              yChannelSelector="G" 
              className="distortion-map"
            />
          </filter>
        </defs>
      </svg>

      <motion.div 
        className="relative z-10 w-full h-full p-8"
        style={{
          filter: "url(#liquid-warp-filter)",
        }}
      >
        {children}
      </motion.div>

      {/* Decorative Glow that follows mouse */}
      <motion.div
        style={{
          left: mouseX,
          top: mouseY,
          x: "-50%",
          y: "-50%",
        }}
        className="pointer-events-none absolute z-20 h-64 w-64 rounded-full bg-indigo-500/20 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />
    </div>
  );
}
