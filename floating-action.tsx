"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, Reorder } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sun, Moon, Lock, Unlock, Send, Volume2, Search, ArrowRight, Check, Plus, Star } from "lucide-react";

export function FloatingAction() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute bottom-14 right-0 flex flex-col gap-2">
            {[1, 2].map((i) => <div key={i} className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center shadow-lg border border-zinc-700"><Star className="w-4 h-4 text-zinc-400" /></div>)}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button onClick={() => setOpen(!open)} animate={{ rotate: open ? 45 : 0 }} whileTap={{ scale: 0.9 }} className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/30 text-white">
        <Plus className="w-6 h-6" />
      </motion.button>
    </div>
  );
}