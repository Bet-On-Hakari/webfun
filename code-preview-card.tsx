"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Eye } from "lucide-react";
import { GlowCard } from "@/components/ui/glow-card";

export function CodePreviewCard({
  title,
  description,
  children,
  code,
  className
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  code: string;
  className?: string;
}) {
  const [showCode, setShowCode] = useState(false);

  return (
    <GlowCard className={`h-full p-0 flex flex-col justify-between overflow-hidden ${className}`}>
      <div className="p-8 pb-0 flex justify-between items-start z-20 relative">
        <div>
          <h3 className="font-semibold text-zinc-200">{title}</h3>
          <p className="text-sm text-zinc-500 mt-1">{description}</p>
        </div>
        <button
          onClick={() => setShowCode(!showCode)}
          className="p-2 rounded-lg bg-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors backdrop-blur-md"
        >
          {showCode ? <Eye className="w-4 h-4" /> : <Code2 className="w-4 h-4" />}
        </button>
      </div>

      <div className="flex-1 relative w-full h-full min-h-[200px]">
        <AnimatePresence mode="wait">
          {!showCode ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center p-8"
            >
              {children}
            </motion.div>
          ) : (
            <motion.div
              key="code"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 p-6 pt-4 overflow-auto"
            >
              <div className="h-full w-full rounded-xl bg-[#0d0d12] border border-zinc-800/80 p-4 overflow-auto scrollbar-thin scrollbar-thumb-zinc-700">
                <pre className="text-[11px] leading-relaxed text-indigo-300 font-mono">
                  <code>{code}</code>
                </pre>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </GlowCard>
  );
}
