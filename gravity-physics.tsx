"use client";

import React, { createContext, useContext, useRef, useState, useEffect } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

// --- Context for Gravity System ---
interface GravityContextType {
  wellX: any;
  wellY: any;
  isActive: boolean;
  setIsActive: (active: boolean) => void;
  strength: number;
}

const GravityContext = createContext<GravityContextType | null>(null);

export function GravityProvider({ children }: { children: React.ReactNode }) {
  const wellX = useMotionValue(0);
  const wellY = useMotionValue(0);
  const [isActive, setIsActive] = useState(false);

  return (
    <GravityContext.Provider value={{ wellX, wellY, isActive, setIsActive, strength: 1 }}>
      {children}
    </GravityContext.Provider>
  );
}

export function useGravity() {
  const context = useContext(GravityContext);
  if (!context) throw new Error("useGravity must be used within a GravityProvider");
  return context;
}

// --- The Gravity Well (The "Black Hole") ---
export function GravityWell({ className }: { className?: string }) {
  const { wellX, wellY, setIsActive } = useGravity();
  const [isDragging, setIsDragging] = useState(false);

  return (
    <motion.div
      drag
      dragMomentum={false}
      onDragStart={() => {
        setIsActive(true);
        setIsDragging(true);
      }}
      onDragEnd={() => {
        setIsActive(false);
        setIsDragging(false);
      }}
      onDrag={(e, info) => {
        wellX.set(info.point.x);
        wellY.set(info.point.y);
      }}
      className={cn(
        "fixed z-[10000] cursor-grab active:cursor-grabbing",
        className
      )}
      style={{ left: 0, top: 0 }}
    >
      <div className="relative flex items-center justify-center">
        {/* Core */}
        <motion.div
          animate={{ 
            scale: isDragging ? 1.2 : 1,
            boxShadow: isDragging 
              ? "0 0 40px 10px rgba(99, 102, 241, 0.8)" 
              : "0 0 20px 5px rgba(99, 102, 241, 0.4)"
          }}
          className="h-12 w-12 rounded-full bg-indigo-500 border-2 border-indigo-300"
        />
        
        {/* Pulling Rings */}
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            animate={{ 
              scale: [1, 2],
              opacity: [0.5, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2, 
              delay: i * 0.6,
              ease: "easeOut"
            }}
            className="absolute h-12 w-12 rounded-full border border-indigo-400"
          />
        ))}

        {/* Label */}
        <span className="absolute -bottom-6 text-[10px] font-black uppercase tracking-widest text-indigo-400 whitespace-nowrap">
          Gravity Well
        </span>
      </div>
    </motion.div>
  );
}

// --- The Reactive Element (Pulls towards well) ---
export function GravityElement({ children, className }: { children: React.ReactNode, className?: string }) {
  const { wellX, wellY, isActive } = useGravity();
  const ref = useRef<HTMLDivElement>(null);

  const x = useSpring(0, { stiffness: 100, damping: 20 });
  const y = useSpring(0, { stiffness: 100, damping: 20 });

  useEffect(() => {
    if (!isActive) {
      x.set(0);
      y.set(0);
      return;
    }

    const unsubscribe = wellX.on("change", (latestX) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const elementX = rect.left + rect.width / 2;
      const elementY = rect.top + rect.height / 2;
      
      const latestY = wellY.get();
      
      const dx = latestX - elementX;
      const dy = latestY - elementY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Pull strength based on distance (inverse square law-ish)
      const maxDistance = 400;
      if (distance < maxDistance) {
        const power = (1 - distance / maxDistance) * 40;
        x.set(dx * (power / distance));
        y.set(dy * (power / distance));
      } else {
        x.set(0);
        y.set(0);
      }
    });

    return () => unsubscribe();
  }, [isActive, wellX, wellY, x, y]);

  return (
    <motion.div ref={ref} style={{ x, y }} className={className}>
      {children}
    </motion.div>
  );
}
