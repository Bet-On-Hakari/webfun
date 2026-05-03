"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, Reorder } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sun, Moon, Lock, Unlock, Send, Volume2, Search, ArrowRight, Check, Plus, Star } from "lucide-react";

export function StarRating() {
  const [rating, setRating] = useState(3);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <motion.button key={i} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} onClick={() => setRating(i)}>
          <Star className={cn("w-6 h-6 transition-colors", i <= rating ? "fill-amber-400 text-amber-400" : "text-zinc-700")} />
        </motion.button>
      ))}
    </div>
  );
}