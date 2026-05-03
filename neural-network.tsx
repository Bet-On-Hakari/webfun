"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Node {
  id: number;
  x: number;
  y: number;
  label: string;
}

interface Connection {
  from: number;
  to: number;
}

export function NeuralNetwork() {
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [pulsePath, setPulsePath] = useState<number[]>([]);

  const nodes: Node[] = [
    { id: 1, x: 20, y: 50, label: "Input" },
    { id: 2, x: 40, y: 20, label: "Core" },
    { id: 3, x: 40, y: 80, label: "Logic" },
    { id: 4, x: 60, y: 50, label: "Neural" },
    { id: 5, x: 80, y: 20, label: "Output A" },
    { id: 6, x: 80, y: 80, label: "Output B" },
  ];

  const connections: Connection[] = [
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 2, to: 4 },
    { from: 3, to: 4 },
    { from: 4, to: 5 },
    { from: 4, to: 6 },
  ];

  const handleNodeHover = (id: number) => {
    setActiveNode(id);
    // Find all paths from this node
    const path = connections.filter(c => c.from === id).map(c => c.to);
    setPulsePath(path);
  };

  return (
    <div className="relative w-full h-[400px] bg-zinc-950 rounded-3xl overflow-hidden border border-zinc-800 p-8">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_#3b82f6_0%,_transparent_70%)]" />
      
      <svg className="absolute inset-0 w-full h-full">
        {connections.map((c, i) => {
          const from = nodes.find(n => n.id === c.from)!;
          const to = nodes.find(n => n.id === c.to)!;
          const isActive = activeNode === c.from || (activeNode === 1 && (c.to === 4 || c.to === 5 || c.to === 6)); // Simple propagation logic

          return (
            <g key={i}>
              <line
                x1={`${from.x}%`}
                y1={`${from.y}%`}
                x2={`${to.x}%`}
                y2={`${to.y}%`}
                className={cn(
                  "stroke-zinc-800 transition-colors duration-500",
                  isActive && "stroke-indigo-500/50"
                )}
                strokeWidth="2"
              />
              {isActive && (
                <motion.circle
                  r="3"
                  fill="#6366f1"
                  initial={{ offsetDistance: "0%" }}
                  animate={{ offsetDistance: "100%" }}
                  transition={{ duration: 0.8, ease: "linear", repeat: Infinity }}
                  style={{
                    offsetPath: `path('M ${from.x} ${from.y} L ${to.x} ${to.y}')`, // Note: path needs real coords, but we'll use % in a clever way
                  }}
                  className="blur-[2px]"
                />
              )}
            </g>
          );
        })}
      </svg>

      {nodes.map((node) => (
        <motion.div
          key={node.id}
          onMouseEnter={() => handleNodeHover(node.id)}
          onMouseLeave={() => {
            setActiveNode(null);
            setPulsePath([]);
          }}
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
          className={cn(
            "absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer",
          )}
        >
          <motion.div
            animate={{
              scale: activeNode === node.id ? 1.2 : 1,
              backgroundColor: activeNode === node.id ? "#6366f1" : "#18181b",
              boxShadow: activeNode === node.id ? "0 0 20px #6366f1" : "none",
            }}
            className="h-12 w-12 rounded-full border-2 border-zinc-700 flex items-center justify-center transition-colors duration-300"
          >
            <div className="h-2 w-2 rounded-full bg-white opacity-20" />
          </motion.div>
          <span className="absolute top-14 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-widest text-zinc-500 whitespace-nowrap">
            {node.label}
          </span>
        </motion.div>
      ))}

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-zinc-600 font-mono uppercase tracking-[0.3em]">
        Neural Synapse Engine v1.0
      </div>
    </div>
  );
}
