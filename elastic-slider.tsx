"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, Reorder } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sun, Moon, Lock, Unlock, Send, Volume2, Search, ArrowRight, Check, Plus, Star } from "lucide-react";

export function ElasticSlider() {
  const [val, setVal] = useState(50);
  return (
    <div className="w-full px-4 flex items-center gap-3">
      <Volume2 className="w-4 h-4 text-zinc-500" />
      <input 
        type="range" min="0" max="100" value={val} onChange={(e) => setVal(parseInt(e.target.value))}
        className="flex-1 accent-indigo-500 h-1 bg-zinc-800 rounded-full appearance-none outline-none"
      />
    </div>
  );
}