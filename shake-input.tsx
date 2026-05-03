"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, Reorder } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sun, Moon, Lock, Unlock, Send, Volume2, Search, ArrowRight, Check, Plus, Star } from "lucide-react";

export function ShakeInput() {
  const [shake, setShake] = useState(false);
  const trigger = () => { setShake(true); setTimeout(() => setShake(false), 500); };
  return (
    <div className="flex gap-2">
      <motion.input 
        animate={shake ? { x: [-10, 10, -10, 10, 0], borderColor: "#ef4444" } : { borderColor: "#3f3f46" }}
        transition={{ duration: 0.4 }}
        placeholder="Enter code..."
        className="w-32 bg-zinc-900 border-2 rounded-lg px-3 py-2 text-sm outline-none text-zinc-100"
      />
      <button onClick={trigger} className="bg-zinc-800 px-3 rounded-lg text-sm font-medium hover:bg-zinc-700">Submit</button>
    </div>
  );
}