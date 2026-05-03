"use client";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Home, Mail, Camera, Settings, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const ICONS = [Home, Mail, Camera, MessageCircle, Settings];

export function MacOSDock({ className }: { className?: string }) {
  const mouseX = useMotionValue(Infinity);

  return (
    <div
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "flex h-16 items-end gap-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 px-4 pb-2 shadow-2xl backdrop-blur-md",
        className
      )}
    >
      {ICONS.map((Icon, i) => (
        <DockIcon key={i} mouseX={mouseX}>
          <Icon className="h-full w-full text-zinc-300 p-2" />
        </DockIcon>
      ))}
    </div>
  );
}

function DockIcon({ mouseX, children }: { mouseX: any; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.div
      ref={ref}
      style={{ width, height: width }}
      className="flex items-center justify-center rounded-xl bg-zinc-800 border border-zinc-700 shadow-md cursor-pointer hover:bg-zinc-700 transition-colors"
    >
      {children}
    </motion.div>
  );
}
