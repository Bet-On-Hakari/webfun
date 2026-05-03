"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, Reorder } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sun, Moon, Lock, Unlock, Send, Volume2, Search, ArrowRight, Check, Plus, Star } from "lucide-react";

export function PasswordPeek() {
  const [show, setShow] = useState(false);
  const [val, setVal] = useState("secret");
  return (
    <div className="relative w-full max-w-[200px]">
      <input 
        type={show ? "text" : "password"} 
        value={val} onChange={(e) => setVal(e.target.value)}
        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg py-2 pl-3 pr-10 text-zinc-100 text-sm focus:outline-none focus:border-indigo-500"
      />
      <button onClick={() => setShow(!show)} className="absolute right-2 top-1/2 -translate-y-1/2 text-xl">
        {show ? "🐵" : "🙈"}
      </button>
    </div>
  );
}