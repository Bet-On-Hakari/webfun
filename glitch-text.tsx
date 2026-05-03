"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, Reorder } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sun, Moon, Lock, Unlock, Send, Volume2, Search, ArrowRight, Check, Plus, Star } from "lucide-react";

export function GlitchText() {
  return (
    <motion.div 
      whileHover={{ scale: 1.05, filter: ["hue-rotate(0deg)", "hue-rotate(90deg)", "hue-rotate(0deg)"] }}
      className="text-2xl font-black tracking-tighter uppercase relative group"
    >
      <span className="text-zinc-100 relative z-10">Cyberpunk</span>
      <span className="absolute top-0 left-[2px] -z-10 text-red-500 opacity-0 group-hover:opacity-100 animate-pulse">Cyberpunk</span>
      <span className="absolute top-0 -left-[2px] -z-10 text-blue-500 opacity-0 group-hover:opacity-100 animate-pulse delay-75">Cyberpunk</span>
    </motion.div>
  );
}