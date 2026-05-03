"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PEOPLE = [
  { id: 1, name: "Alice", color: "bg-rose-500" },
  { id: 2, name: "Bob", color: "bg-blue-500" },
  { id: 3, name: "Charlie", color: "bg-emerald-500" },
];

export function AnimatedTooltip() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="flex gap-4">
      {PEOPLE.map((person) => (
        <div
          key={person.id}
          className="relative group cursor-pointer"
          onMouseEnter={() => setHoveredIndex(person.id)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === person.id && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                transition={{ type: "spring", stiffness: 260, damping: 10 }}
                className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-center justify-center rounded-md bg-white px-4 py-2 text-xs font-bold text-zinc-900 shadow-xl whitespace-nowrap z-50"
              >
                {person.name}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-white" />
              </motion.div>
            )}
          </AnimatePresence>
          <div className={`h-12 w-12 rounded-full ${person.color} border-2 border-zinc-900 shadow-sm transition-transform duration-300 group-hover:scale-110`} />
        </div>
      ))}
    </div>
  );
}
