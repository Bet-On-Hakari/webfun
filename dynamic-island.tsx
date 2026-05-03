"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Music, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function DynamicIsland({ className }: { className?: string }) {
  const [state, setState] = useState<"idle" | "call" | "music">("idle");

  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <motion.div
        layout
        className="overflow-hidden bg-black text-white shadow-xl ring-1 ring-zinc-800"
        animate={{
          width: state === "idle" ? 120 : state === "call" ? 300 : 250,
          height: state === "idle" ? 36 : state === "call" ? 80 : 160,
          borderRadius: 32
        }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
      >
        <AnimatePresence mode="wait">
          {state === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-center justify-between h-full px-4"
            >
              <div className="w-3 h-3 rounded-full bg-zinc-800" />
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </motion.div>
          )}

          {state === "call" && (
            <motion.div
              key="call"
              initial={{ opacity: 0, filter: "blur(5px)", scale: 0.9 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              exit={{ opacity: 0, filter: "blur(5px)", scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-between h-full px-6"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium">Unknown Caller</p>
                  <p className="text-xs text-zinc-400">Incoming...</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={(e) => { e.stopPropagation(); setState("idle"); }}
                  className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center hover:bg-emerald-600 transition-colors">
                  <Phone className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {state === "music" && (
            <motion.div
              key="music"
              initial={{ opacity: 0, filter: "blur(5px)", scale: 0.9 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              exit={{ opacity: 0, filter: "blur(5px)", scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col h-full p-5"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-violet-500 shadow-inner flex items-center justify-center">
                  <Music className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="font-semibold text-sm truncate">Midnight City</p>
                  <p className="text-xs text-zinc-400 truncate">M83</p>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); setState("idle"); }}
                  className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-5 flex items-center gap-3">
                <div className="text-[10px] text-zinc-500 font-medium">1:24</div>
                <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden relative">
                  <div className="absolute top-0 left-0 h-full w-1/3 bg-white rounded-full" />
                </div>
                <div className="text-[10px] text-zinc-500 font-medium">-2:39</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="flex gap-2 mt-8">
        <button 
          onClick={() => setState("idle")}
          className="px-3 py-1.5 rounded-full text-xs font-medium bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-colors"
        >
          Idle
        </button>
        <button 
          onClick={() => setState("call")}
          className="px-3 py-1.5 rounded-full text-xs font-medium bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 transition-colors"
        >
          Call
        </button>
        <button 
          onClick={() => setState("music")}
          className="px-3 py-1.5 rounded-full text-xs font-medium bg-pink-500/20 text-pink-300 hover:bg-pink-500/30 transition-colors"
        >
          Music
        </button>
      </div>
    </div>
  );
}
