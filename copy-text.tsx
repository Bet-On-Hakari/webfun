"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, Reorder } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sun, Moon, Lock, Unlock, Send, Volume2, Search, ArrowRight, Check, Plus, Star } from "lucide-react";

export function CopyText() {
  const [copied, setCopied] = useState(false);
  return (
    <div onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg cursor-pointer flex items-center gap-3">
      <code className="text-zinc-300 text-sm">npm i framer-motion</code>
      <motion.div animate={{ scale: copied ? [1, 1.2, 1] : 1 }}>{copied ? <Check className="w-4 h-4 text-emerald-400" /> : <span className="text-xs text-zinc-500">Copy</span>}</motion.div>
    </div>
  );
}