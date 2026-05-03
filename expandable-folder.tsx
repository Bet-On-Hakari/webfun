"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Folder, FolderOpen, FileCode, FileImage, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const FILES = [
  { name: "index.tsx", icon: FileCode, color: "text-blue-400" },
  { name: "styles.css", icon: FileCode, color: "text-sky-400" },
  { name: "hero.webp", icon: FileImage, color: "text-emerald-400" },
  { name: "README.md", icon: FileText, color: "text-zinc-400" },
];

export function ExpandableFolder({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn("flex flex-col items-start w-56", className)}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between px-4 py-3 w-full rounded-xl bg-zinc-900 border border-zinc-800 shadow-md hover:bg-zinc-800/80 transition-colors z-10 relative outline-none"
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center gap-3">
          {isOpen ? (
            <FolderOpen className="w-5 h-5 text-indigo-400 fill-indigo-400/20" />
          ) : (
            <Folder className="w-5 h-5 text-zinc-400" />
          )}
          <span className="font-medium text-sm text-zinc-200">src / ui-magic</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          className="text-zinc-500 text-xs"
        >
          ▶
        </motion.div>
      </motion.button>
      
      <div className="overflow-hidden w-full px-2 mt-1">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="flex flex-col gap-1 origin-top pt-2 pb-1"
            >
              {FILES.map((file, i) => (
                <motion.div
                  key={file.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-zinc-800/60 cursor-pointer transition-colors group"
                >
                  <file.icon className={cn("w-4 h-4 transition-transform group-hover:scale-110", file.color)} />
                  <span className="text-xs font-medium text-zinc-400 group-hover:text-zinc-200 transition-colors">{file.name}</span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
