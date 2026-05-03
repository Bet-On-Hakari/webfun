"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, Reorder } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sun, Moon, Lock, Unlock, Send, Volume2, Search, ArrowRight, Check, Plus, Star } from "lucide-react";

export function SimpleTooltip() {
  return (
    <div className="group relative">
      <button className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded-lg text-sm">Hover me</button>
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-zinc-100 text-zinc-900 text-xs font-bold rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-200">
        Secret!
      </div>
    </div>
  );
}