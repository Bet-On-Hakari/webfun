"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, Reorder } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sun, Moon, Lock, Unlock, Send, Volume2, Search, ArrowRight, Check, Plus, Star } from "lucide-react";

export function BouncyRadio() {
  const [active, setActive] = useState(0);
  return (
    <div className="flex gap-4">
      {[0, 1].map((i) => (
        <div key={i} onClick={() => setActive(i)} className="flex items-center gap-2 cursor-pointer">
          <div className="w-5 h-5 rounded-full border-2 border-zinc-600 flex items-center justify-center">
            <AnimatePresence>
              {active === i && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="w-2.5 h-2.5 bg-indigo-500 rounded-full" />
              )}
            </AnimatePresence>
          </div>
          <span className="text-sm text-zinc-400">Opt {i+1}</span>
        </div>
      ))}
    </div>
  );
}