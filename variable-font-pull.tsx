"use client";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export function VariableFontPull({
  text = "MAGNETIC",
  className,
}: {
  text?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const letters = ref.current?.querySelectorAll<HTMLSpanElement>("[data-l]");
    letters?.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      const max = 180;
      const t = Math.max(0, 1 - dist / max);
      const pull = 18 * t;
      const nx = dist > 0 ? dx / dist : 0;
      const ny = dist > 0 ? dy / dist : 0;
      el.style.transform = `translate(${nx * pull}px, ${ny * pull}px) scale(${1 + t * 0.7})`;
      el.style.fontWeight = String(Math.round(300 + t * 600));
      const r = Math.round(228 + t * (-99));
      const g = Math.round(228 + t * (-126));
      const b = Math.round(231 + t * (24));
      el.style.color = `rgb(${r},${g},${b})`;
    });
  };

  const reset = () => {
    const letters = ref.current?.querySelectorAll<HTMLSpanElement>("[data-l]");
    letters?.forEach((el) => {
      el.style.transform = "translate(0,0) scale(1)";
      el.style.fontWeight = "300";
      el.style.color = "";
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={cn("flex select-none items-center justify-center gap-0.5", className)}
    >
      {text.split("").map((c, i) => (
        <span
          key={i}
          data-l
          className="inline-block text-5xl tracking-tight text-zinc-200 transition-[transform,font-weight,color] duration-300 ease-out"
          style={{ fontWeight: 300 }}
        >
          {c === " " ? " " : c}
        </span>
      ))}
    </div>
  );
}
