"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, Reorder } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sun, Moon, Lock, Unlock, Send, Volume2, Search, ArrowRight, Check, Plus, Star } from "lucide-react";

export function SendButton() {
  const [sent, setSent] = useState(false);
  return (
    <motion.button onClick={() => { setSent(true); setTimeout(() => setSent(false), 2000); }} whileTap={{ scale: 0.95 }} className={cn("relative overflow-hidden w-32 h-10 rounded-lg font-medium flex items-center justify-center transition-colors", sent ? "bg-emerald-500 text-white" : "bg-indigo-500 text-white")}>
      <AnimatePresence mode="wait">
        {sent ? <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }}><Check className="w-5 h-5" /></motion.div> : <motion.div key="send" className="flex items-center gap-2">Send <Send className="w-4 h-4" /></motion.div>}
      </AnimatePresence>
    </motion.button>
  );
}