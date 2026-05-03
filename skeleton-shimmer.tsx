"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, Reorder } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sun, Moon, Lock, Unlock, Send, Volume2, Search, ArrowRight, Check, Plus, Star } from "lucide-react";

export function SkeletonShimmer() {
  return (
    <div className="w-full max-w-[200px] space-y-3">
      <div className="h-10 w-10 rounded-full bg-zinc-800 relative overflow-hidden">
        <motion.div animate={{ x: ["-100%", "200%"] }} transition={{ repeat: Infinity, duration: 1.5 }} className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
      </div>
      <div className="h-4 w-full rounded bg-zinc-800 relative overflow-hidden">
        <motion.div animate={{ x: ["-100%", "200%"] }} transition={{ repeat: Infinity, duration: 1.5 }} className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
      </div>
    </div>
  );
}