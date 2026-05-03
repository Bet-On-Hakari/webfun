"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, Reorder } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sun, Moon, Lock, Unlock, Send, Volume2, Search, ArrowRight, Check, Plus, Star } from "lucide-react";

export function CountUp() {
  const [count, setCount] = useState(0);
  return (
    <motion.button onClick={() => setCount(c => c + 1)} whileTap={{ scale: 0.9 }} className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center text-2xl font-bold text-indigo-400 border border-zinc-800 shadow-lg relative overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.span key={count} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>{count}</motion.span>
      </AnimatePresence>
    </motion.button>
  );
}