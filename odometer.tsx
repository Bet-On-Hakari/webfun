"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Odometer() {
  const [count, setCount] = useState(1048);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + Math.floor(Math.random() * 9) + 1);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const numArr = count.toString().split("");

  return (
    <div className="flex items-center gap-2">
      <span className="text-zinc-500 font-medium">Views:</span>
      <div className="flex text-3xl font-bold font-mono text-indigo-400 overflow-hidden h-10 bg-zinc-900/50 px-2 py-1 rounded-lg border border-indigo-500/20 shadow-inner">
        {numArr.map((num, i) => (
          <div key={count.toString().length - i} className="relative w-5 h-full text-center">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={num}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {num}
              </motion.span>
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
