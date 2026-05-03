"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

export function EyeCluster() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative flex flex-wrap gap-8 items-center justify-center p-12">
      {[...Array(6)].map((_, i) => (
        <Eye key={i} mousePos={mousePos} />
      ))}
    </div>
  );
}

function Eye({ mousePos }: { mousePos: { x: number, y: number } }) {
  const eyeRef = useRef<HTMLDivElement>(null);
  const pupilX = useMotionValue(0);
  const pupilY = useMotionValue(0);
  const [isBlinking, setIsBlinking] = useState(false);

  const springConfig = { stiffness: 150, damping: 15 };
  const x = useSpring(pupilX, springConfig);
  const y = useSpring(pupilY, springConfig);

  useEffect(() => {
    if (!eyeRef.current) return;
    const rect = eyeRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = mousePos.x - centerX;
    const dy = mousePos.y - centerY;
    const angle = Math.atan2(dy, dx);
    const distance = Math.min(Math.sqrt(dx * dx + dy * dy) / 10, 15);

    pupilX.set(Math.cos(angle) * distance);
    pupilY.set(Math.sin(angle) * distance);
  }, [mousePos, pupilX, pupilY]);

  // Random blinking
  useEffect(() => {
    const blink = () => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
      setTimeout(blink, Math.random() * 5000 + 2000);
    };
    const timer = setTimeout(blink, Math.random() * 5000 + 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      ref={eyeRef}
      className="relative h-16 w-24 overflow-hidden rounded-full bg-white shadow-inner flex items-center justify-center border-2 border-zinc-200"
    >
      {/* Pupil & Iris */}
      <motion.div
        style={{ x, y }}
        className="relative h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center border-4 border-indigo-900"
      >
        <div className="h-4 w-4 rounded-full bg-black" />
        <div className="absolute top-1 left-2 h-2 w-2 rounded-full bg-white/40" />
      </motion.div>

      {/* Eyelid (Blink) */}
      <motion.div
        animate={{ height: isBlinking ? "100%" : "0%" }}
        transition={{ duration: 0.1 }}
        className="absolute top-0 left-0 w-full bg-zinc-900 z-10"
      />
    </motion.div>
  );
}
