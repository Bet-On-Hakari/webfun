"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { Pencil, Eraser, Trash2, Download, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function DrawingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#00ff78");
  const [brushSize, setBrushSize] = useState(4);
  const [mode, setMode] = useState<"draw" | "erase">("draw");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize canvas to parent
    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
      }
    };

    window.addEventListener("resize", resize);
    resize();

    return () => window.removeEventListener("resize", resize);
  }, []);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx?.beginPath(); // Reset path
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let x, y;

    if ("touches" in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    ctx.lineWidth = brushSize;
    ctx.strokeStyle = mode === "erase" ? "#020408" : color;
    ctx.globalCompositeOperation = mode === "erase" ? "destination-out" : "source-over";

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);

    // Visual feedback for drawing (pulses)
    if (mode === "draw") {
      createPulse(x, y);
    }
  };

  const createPulse = (x: number, y: number) => {
    const pulse = document.createElement("div");
    pulse.className = "absolute pointer-events-none rounded-full blur-md opacity-40";
    pulse.style.left = `${x}px`;
    pulse.style.top = `${y}px`;
    pulse.style.width = "10px";
    pulse.style.height = "10px";
    pulse.style.backgroundColor = color;
    canvasRef.current?.parentElement?.appendChild(pulse);

    gsap.to(pulse, {
      scale: 4,
      opacity: 0,
      duration: 0.8,
      onComplete: () => pulse.remove(),
    });
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="relative w-full h-[600px] bg-[#020408] rounded-3xl border border-white/5 overflow-hidden group">
      {/* Controls Overlay */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4 bg-black/40 backdrop-blur-2xl border border-white/10 px-6 py-3 rounded-2xl shadow-2xl transition-all group-hover:scale-105">
        <button 
          onClick={() => setMode("draw")}
          className={cn("p-2 rounded-lg transition-all", mode === "draw" ? "bg-[#00ff78] text-black shadow-[0_0_15px_#00ff78]" : "text-white hover:bg-white/5")}
        >
          <Pencil className="w-5 h-5" />
        </button>
        <button 
          onClick={() => setMode("erase")}
          className={cn("p-2 rounded-lg transition-all", mode === "erase" ? "bg-white text-black shadow-[0_0_15px_white]" : "text-white hover:bg-white/5")}
        >
          <Eraser className="w-5 h-5" />
        </button>
        <div className="h-6 w-px bg-white/10 mx-2" />
        <div className="flex gap-2">
          {["#00ff78", "#3b82f6", "#f43f5e", "#ffffff"].map((c) => (
            <button 
              key={c}
              onClick={() => { setColor(c); setMode("draw"); }}
              style={{ backgroundColor: c }}
              className={cn("h-6 w-6 rounded-full border-2 transition-transform hover:scale-125", color === c && mode === "draw" ? "border-white" : "border-transparent")}
            />
          ))}
        </div>
        <div className="h-6 w-px bg-white/10 mx-2" />
        <button onClick={clearCanvas} className="p-2 text-white hover:text-red-500 transition-colors">
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={draw}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchEnd={stopDrawing}
        onTouchMove={draw}
        className="relative z-10 w-full h-full cursor-crosshair touch-none"
      />

      {/* Background UI */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-20">
         <div className="text-[12rem] font-black text-white/5 italic uppercase tracking-tighter select-none">SKETCH</div>
      </div>

      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#00ff78]">
         <Sparkles className="w-3 h-3 animate-pulse" />
         <span>Neural Assisted Canvas</span>
      </div>
    </div>
  );
}
