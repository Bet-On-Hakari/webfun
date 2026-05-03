"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, Reorder } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sun, Moon, Lock, Unlock, Send, Volume2, Search, ArrowRight, Check, Plus, Star } from "lucide-react";

export function RingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => { const t = setInterval(() => setProgress(p => (p >= 100 ? 0 : p + 10)), 1000); return () => clearInterval(t); }, []);
  return (
    <div className="relative w-16 h-16 flex items-center justify-center">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" className="stroke-zinc-800 fill-none stroke-[8]" />
        <motion.circle 
          cx="50" cy="50" r="40" 
          className="stroke-indigo-500 fill-none stroke-[8] stroke-linecap-round"
          initial={{ strokeDasharray: 251, strokeDashoffset: 251 }}
          animate={{ strokeDashoffset: 251 - (251 * progress) / 100 }}
          transition={{ type: "spring", stiffness: 50 }}
        />
      </svg>
      <span className="absolute text-xs font-bold text-zinc-300">{progress}%</span>
    </div>
  );
}