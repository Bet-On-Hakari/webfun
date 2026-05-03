"use client";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Star = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  m: number;
  hue: number;
};

export function GalaxyParticles({
  count = 360,
  className,
}: {
  count?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = canvas.clientWidth;
    const H = canvas.clientHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    const cx = W / 2;
    const cy = H / 2;
    const arms = 3;
    const stars: Star[] = Array.from({ length: count }, (_, i) => {
      const t = i / count;
      const r = 25 + t * (Math.min(W, H) * 0.42);
      const arm = i % arms;
      const angle = t * Math.PI * 7 + (arm * 2 * Math.PI) / arms + (Math.random() - 0.5) * 0.4;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      const tangent = angle + Math.PI / 2;
      const orbit = Math.sqrt(40 / r) * 6;
      return {
        x,
        y,
        vx: Math.cos(tangent) * orbit,
        vy: Math.sin(tangent) * orbit,
        m: 0.6 + Math.random() * 1.4,
        hue: 220 + Math.random() * 90,
      };
    });

    let raf = 0;
    const tick = () => {
      ctx.fillStyle = "rgba(9, 9, 11, 0.18)";
      ctx.fillRect(0, 0, W, H);

      const m = mouseRef.current;

      for (const s of stars) {
        let dx = cx - s.x;
        let dy = cy - s.y;
        let d2 = dx * dx + dy * dy + 80;
        let d = Math.sqrt(d2);
        const G = 38;
        s.vx += (dx / d) * (G / d2) * s.m;
        s.vy += (dy / d) * (G / d2) * s.m;

        if (m.active) {
          dx = m.x - s.x;
          dy = m.y - s.y;
          d2 = dx * dx + dy * dy + 60;
          d = Math.sqrt(d2);
          const Gm = 220;
          s.vx += (dx / d) * (Gm / d2);
          s.vy += (dy / d) * (Gm / d2);
        }

        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.9994;
        s.vy *= 0.9994;

        ctx.fillStyle = `hsla(${s.hue}, 80%, 70%, 0.9)`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.m, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fill();

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [count]);

  const handleMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMove}
      onMouseLeave={() => (mouseRef.current.active = false)}
      className={cn("h-full w-full cursor-crosshair", className)}
    />
  );
}
