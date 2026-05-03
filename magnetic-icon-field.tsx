"use client";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export function MagneticIconField({
  rows = 6,
  cols = 14,
  className,
}: {
  rows?: number;
  cols?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const needles = ref.current?.querySelectorAll<HTMLSpanElement>("[data-needle]");
    needles?.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
      const dist = Math.hypot(dx, dy);
      const intensity = Math.max(0.35, Math.min(1, 1 - dist / 500));
      el.style.transform = `rotate(${angle}deg) scaleX(${intensity})`;
      el.style.opacity = String(0.45 + intensity * 0.55);
    });
  };

  const reset = () => {
    const needles = ref.current?.querySelectorAll<HTMLSpanElement>("[data-needle]");
    needles?.forEach((el) => {
      el.style.transform = "rotate(0deg) scaleX(0.5)";
      el.style.opacity = "0.4";
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={cn("grid h-full w-full place-items-center p-6", className)}
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {Array.from({ length: rows * cols }).map((_, i) => (
        <span
          key={i}
          data-needle
          className="block h-[3px] w-6 rounded-full bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-amber-300 transition-[transform,opacity] duration-200 ease-out"
          style={{ transformOrigin: "center", opacity: 0.4, transform: "scaleX(0.5)" }}
        />
      ))}
    </div>
  );
}
