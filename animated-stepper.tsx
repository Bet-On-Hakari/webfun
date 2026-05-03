"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = ["Details", "Payment", "Confirm"];

export function AnimatedStepper({ className }: { className?: string }) {
  const [currentStep, setCurrentStep] = useState(1);
  const isFullyCompleted = currentStep > STEPS.length;

  return (
    <div className={cn("w-full max-w-sm px-4 relative", className)}>
      <AnimatePresence>
        {isFullyCompleted && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute -top-8 left-0 w-full text-center z-20 pointer-events-none"
          >
            <span className="px-4 py-1.5 bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-widest rounded-full border border-emerald-500/20 shadow-[0_0_20px_-5px_rgba(16,185,129,0.4)]">
              Process Complete
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative flex items-center justify-between w-full mt-4">
        {/* Background Line */}
        <div className="absolute top-1/2 left-0 w-full h-1 -translate-y-1/2 bg-zinc-800 rounded-full" />
        
        {/* Active Line Fill */}
        <motion.div 
          className={cn("absolute top-1/2 left-0 h-1 -translate-y-1/2 rounded-full transition-colors duration-500", isFullyCompleted ? "bg-emerald-500 shadow-[0_0_15px_-3px_rgba(16,185,129,0.5)]" : "bg-indigo-500")}
          initial={{ width: "0%" }}
          animate={{ width: `${((Math.min(currentStep, STEPS.length) - 1) / (STEPS.length - 1)) * 100}%` }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        />

        {/* Nodes */}
        {STEPS.map((step, index) => {
          const isActive = currentStep === index + 1;
          const isCompleted = currentStep > index + 1;

          return (
            <div key={step} className="relative z-10 flex flex-col items-center">
              <motion.button
                onClick={() => setCurrentStep(index + 1)}
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-colors duration-500 outline-none shadow-lg",
                  isActive && !isFullyCompleted ? "border-indigo-500 bg-zinc-950 text-indigo-400" : 
                  isCompleted ? (isFullyCompleted ? "border-emerald-500 bg-emerald-500 text-white" : "border-indigo-500 bg-indigo-500 text-white") : 
                  "border-zinc-700 bg-zinc-900 text-zinc-500 hover:border-zinc-600"
                )}
                whileTap={{ scale: 0.9 }}
                animate={isFullyCompleted ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                {isCompleted ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Check className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <span>{index + 1}</span>
                )}
              </motion.button>
              
              <motion.span 
                className={cn(
                  "absolute -bottom-6 text-[11px] font-medium whitespace-nowrap transition-colors duration-500",
                  isActive || isCompleted ? (isFullyCompleted ? "text-emerald-400" : "text-zinc-200") : "text-zinc-500"
                )}
              >
                {step}
              </motion.span>
            </div>
          );
        })}
      </div>
      
      <div className="flex justify-between mt-8 items-center min-h-[32px]">
        <button
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1 || isFullyCompleted}
          className={cn(
            "px-4 py-1.5 rounded-full text-xs font-medium bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-all duration-300",
            (currentStep === 1 || isFullyCompleted) ? "opacity-0 pointer-events-none" : "opacity-100"
          )}
        >
          Back
        </button>
        
        <div className="flex-1 flex justify-end">
          <AnimatePresence mode="wait">
            {isFullyCompleted ? (
              <motion.button
                key="reset"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={() => setCurrentStep(1)}
                className="px-6 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500 text-zinc-950 hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
              >
                Reset
              </motion.button>
            ) : (
              <motion.button
                key="next"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={() => setCurrentStep(currentStep + 1)}
                className="px-6 py-1.5 rounded-full text-xs font-medium bg-indigo-500 text-white hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-500/20"
              >
                {currentStep === STEPS.length ? "Finish" : "Next"}
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
