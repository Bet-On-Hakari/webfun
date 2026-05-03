"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, Reorder } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sun, Moon, Lock, Unlock, Send, Volume2, Search, ArrowRight, Check, Plus, Star } from "lucide-react";

export function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 bg-zinc-800 px-4 py-3 rounded-full">
      {[0, 1, 2].map((i) => (
        <motion.div 
          key={i}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
          className="w-2 h-2 bg-zinc-400 rounded-full"
        />
      ))}
    </div>
  );
}