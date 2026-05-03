"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, Reorder } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sun, Moon, Lock, Unlock, Send, Volume2, Search, ArrowRight, Check, Plus, Star } from "lucide-react";

export function HoverReveal() {
  return (
    <div className="group relative w-full text-center">
      <div className="text-xl font-bold text-zinc-700 blur-sm transition-all duration-300 group-hover:blur-0 group-hover:text-indigo-400">
        Top Secret Data
      </div>
    </div>
  );
}