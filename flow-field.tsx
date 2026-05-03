"use client";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

function hash(x: number, y: number) {
  let h = (x * 374761393 + y * 668265263) | 0;
  h = (h ^ (h >> 13)) * 1274126177;
  return ((h ^ (h >> 16)) & 0x7fffffff) / 0x7fffffff;
}

function valueNoise(x: number, y: number) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const sx = xf * xf * (3 - 2 * xf);
  const sy = yf * yf * (3 - 2 * yf);
  const a = hash(xi, yi);
  const b = hash(xi + 1, yi);
  const c = hash(xi, yi + 1);
  const d = hash(xi + 1, yi + 1);
  return a * (1 - sx) * (1 - sy) + b * sx * (1 - sy) + c * (1 - sx) * sy + d * sx * sy;
}

type P = { x: number; y: number; px: number; py: number; life: number; hue: number };

export function FlowField({
  count = 700,
  className,
}: {
  count?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = canvas.clientWidth;
    let H = canvas.clientHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    const particles: P[] = Array.from({ length: count }, () => {
      const x = Math.random() * W;
      const y = Math.random() * H;
      return {
        x,
        y,
        px: x,
        py: y,
        life: Math.random() * 200,
        hue: 220 + Math.random() * 110,
      };
    });

    let raf = 0;
    let t = 0;
    const tick = () => {
      ctx.fillStyle = "rgba(9, 9, 11, 0.06)";
      ctx.fillRect(0, 0, W, H);

      const m = mouseRef.current;
      t += 0.0015;

      for (const p of particles) {
        const a =
          valueNoise(p.x * 0.0035, p.y * 0.0035) * Math.PI * 4 + t * Math.PI * 2;
        let vx = Math.cos(a) * 1.1;
        let vy = Math.sin(a) * 1.1;

        if (m.active) {
          const dx = m.x - p.x;
          const dy = m.y - p.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 26000 && d2 > 1) {
            const d = Math.sqrt(d2);
            const f = (1 - d / 161) * 2.2;
            vx += (dx / d) * f;
            vy += (dy / d) * f;
          }
        }

        p.px = p.x;
        p.py = p.y;
        p.x += vx;
        p.y += vy;
        p.life++;

        if (p.x < 0 || p.x > W || p.y < 0 || p.y > H || p.life > 240) {
          p.x = Math.random() * W;
          p.y = Math.random() * H;
          p.px = p.x;
          p.py = p.y;
          p.life = 0;
        }

        ctx.strokeStyle = `hsla(${p.hue}, 75%, 65%, 0.85)`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p.px, p.py);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
      }

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
      className={cn("h-full w-full", className)}
    />
  );
}
