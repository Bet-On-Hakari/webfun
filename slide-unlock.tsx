"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, Reorder } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sun, Moon, Lock, Unlock, Send, Volume2, Search, ArrowRight, Check, Plus, Star } from "lucide-react";

export function SlideUnlock() {
  const x = useMotionValue(0);
  const bg = useTransform(x, [0, 150], ["#27272a", "#10b981"]);
  return (
    <motion.div style={{ background: bg }} className="relative w-[200px] h-12 rounded-full overflow-hidden flex items-center">
      <span className="absolute w-full text-center text-xs font-medium text-zinc-400 pointer-events-none">Slide to unlock</span>
      <motion.div 
        drag="x" dragConstraints={{ left: 0, right: 152 }} dragSnapToOrigin
        style={{ x }} className="w-10 h-10 bg-white rounded-full ml-1 flex items-center justify-center cursor-grab shadow-lg z-10"
      >
        <ArrowRight className="w-4 h-4 text-zinc-900" />
      </motion.div>
    </motion.div>
  );
}