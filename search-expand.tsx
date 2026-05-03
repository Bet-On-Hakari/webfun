"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, Reorder } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sun, Moon, Lock, Unlock, Send, Volume2, Search, ArrowRight, Check, Plus, Star } from "lucide-react";

export function SearchExpand() {
  const [open, setOpen] = useState(false);
  return (
    <motion.div animate={{ width: open ? 200 : 40 }} className="h-10 bg-zinc-900 rounded-full border border-zinc-700 flex items-center px-2 overflow-hidden">
      <Search className="w-5 h-5 text-zinc-400 cursor-pointer shrink-0" onClick={() => setOpen(!open)} />
      <input type="text" placeholder="Search..." className="bg-transparent text-sm text-white ml-2 outline-none w-full" />
    </motion.div>
  );
}