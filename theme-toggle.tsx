"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, Reorder } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sun, Moon, Lock, Unlock, Send, Volume2, Search, ArrowRight, Check, Plus, Star } from "lucide-react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);
  return (
    <motion.button 
      onClick={() => setIsDark(!isDark)}
      className="relative w-20 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center px-1 overflow-hidden"
      whileTap={{ scale: 0.9 }}
    >
      <motion.div 
        layout 
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={cn("w-8 h-8 rounded-full flex items-center justify-center shadow-lg", isDark ? "bg-zinc-950 text-indigo-400" : "bg-amber-400 text-amber-900 ml-auto")}
      >
        {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
      </motion.div>
    </motion.button>
  );
}