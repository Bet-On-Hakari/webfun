"use client";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  tx: number;
  ty: number;
  c: string;
};

export function ParticlePortrait({
  text = "MAGIC",
  className,
}: {
  text?: string;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let W = canvas.clientWidth;
    let H = canvas.clientHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    const off = document.createElement("canvas");
    off.width = W;
    off.height = H;
    const octx = off.getContext("2d");
    if (!octx) return;
    const fontSize = Math.min((W / Math.max(text.length, 1)) * 1.6, H * 0.7);
    octx.fillStyle = "#fff";
    octx.font = `900 ${fontSize}px ui-sans-serif, system-ui, sans-serif`;
    octx.textAlign = "center";
    octx.textBaseline = "middle";
    octx.fillText(text, W / 2, H / 2);
    const img = octx.getImageData(0, 0, W, H);

    const step = 4;
    const particles: Particle[] = [];
    for (let y = 0; y < H; y += step) {
      for (let x = 0; x < W; x += step) {
        if (img.data[(y * W + x) * 4 + 3] > 128) {
          particles.push({
            x: Math.random() * W,
            y: Math.random() * H,
            vx: 0,
            vy: 0,
            tx: x,
            ty: y,
            c: `hsl(${(x / W) * 80 + 230}, 85%, 65%)`,
          });
        }
      }
    }

    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      const m = mouseRef.current;
      for (const p of particles) {
        p.vx += (p.tx - p.x) * 0.06;
        p.vy += (p.ty - p.y) * 0.06;

        if (m.active) {
          const dx = p.x - m.x;
          const dy = p.y - m.y;
          const d2 = dx * dx + dy * dy;
          const r = 70;
          if (d2 < r * r && d2 > 0.01) {
            const d = Math.sqrt(d2);
            const f = (1 - d / r) * 5;
            p.vx += (dx / d) * f;
            p.vy += (dy / d) * f;
          }
        }

        p.vx *= 0.86;
        p.vy *= 0.86;
        p.x += p.vx;
        p.y += p.vy;

        ctx.fillStyle = p.c;
        ctx.fillRect(p.x, p.y, 2, 2);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text]);

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
