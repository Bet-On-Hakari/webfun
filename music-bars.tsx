"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, Reorder } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sun, Moon, Lock, Unlock, Send, Volume2, Search, ArrowRight, Check, Plus, Star } from "lucide-react";

export function MusicBars() {
  return (
    <div className="flex items-end gap-1 h-12">
      {[1, 2, 3, 4, 5].map((i) => (
        <motion.div 
          key={i}
          animate={{ height: ["20%", "100%", "30%", "80%", "20%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
          className="w-2 bg-indigo-500 rounded-t-sm"
        />
      ))}
    </div>
  );
}