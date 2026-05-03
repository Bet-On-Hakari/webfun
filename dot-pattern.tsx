"use client";
import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export function DotPattern({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 300 });
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 300 });

  const bgPosX = useTransform(smoothX, [-1, 1], [-40, 40]);
  const bgPosY = useTransform(smoothY, [-1, 1], [-40, 40]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPosition({ x, y });
    
    mouseX.set((x / rect.width) * 2 - 1);
    mouseY.set((y / rect.height) * 2 - 1);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsClicked(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseDown={() => setIsClicked(true)}
      onMouseUp={() => setIsClicked(false)}
      className={cn("relative w-full h-full overflow-hidden bg-zinc-950 rounded-2xl border border-zinc-800 cursor-pointer", className)}
    >
      {/* Base dim pattern */}
      <motion.div 
        className="absolute -inset-[100px] opacity-20"
        style={{
          x: bgPosX,
          y: bgPosY,
          backgroundImage: "radial-gradient(#52525b 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }}
      />
      
      {/* Highlighted pattern following cursor */}
      <motion.div 
        className="absolute -inset-[100px]"
        animate={{ 
          opacity: isHovered ? 1 : 0,
          scale: isClicked ? 0.9 : 1 
        }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        style={{
          x: bgPosX,
          y: bgPosY,
          transformOrigin: `calc(${position.x}px + 100px) calc(${position.y}px + 100px)`,
          backgroundImage: "radial-gradient(#818cf8 2px, transparent 2px)",
          backgroundSize: "24px 24px",
          maskImage: `radial-gradient(200px circle at calc(${position.x}px + 100px) calc(${position.y}px + 100px), black, transparent)`,
          WebkitMaskImage: `radial-gradient(200px circle at calc(${position.x}px + 100px) calc(${position.y}px + 100px), black, transparent)`,
        }}
      />
      
      {/* Inner text overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="bg-zinc-950/50 backdrop-blur-sm px-6 py-3 rounded-full border border-zinc-800/80">
          <span className="text-zinc-300 font-mono text-sm tracking-widest uppercase">Interactive Grid</span>
        </div>
      </div>
    </div>
  );
}
