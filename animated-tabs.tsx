"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function AnimatedTabs({
  tabs,
  className,
}: {
  tabs: string[];
  className?: string;
}) {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div
      className={cn(
        "flex space-x-1 rounded-full bg-zinc-900/50 p-1 backdrop-blur-md border border-zinc-800",
        className
      )}
    >
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={cn(
            "relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors outline-none",
            activeTab === tab ? "text-zinc-950" : "text-zinc-400 hover:text-zinc-200"
          )}
        >
          {activeTab === tab && (
            <motion.div
              layoutId="active-tab-indicator"
              className="absolute inset-0 rounded-full bg-white"
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          )}
          <span className="relative z-10">{tab}</span>
        </button>
      ))}
    </div>
  );
}
