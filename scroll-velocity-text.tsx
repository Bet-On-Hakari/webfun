"use client";
import { motion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";
import { cn } from "@/lib/utils";

export function ScrollVelocityText({
  text = "ULTRA  ·  PREMIUM  ·  MICRO  ·  INTERACTIONS  ·",
  className,
}: {
  text?: string;
  className?: string;
}) {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 60, stiffness: 400 });
  const skewX = useTransform(smooth, [-2500, 0, 2500], [-14, 0, 14]);
  const scaleY = useTransform(smooth, [-2500, 0, 2500], [0.92, 1, 1.08]);

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden py-2",
        className,
      )}
    >
      <motion.div
        style={{ skewX, scaleY }}
        className="whitespace-nowrap bg-gradient-to-r from-indigo-300 via-fuchsia-300 to-amber-300 bg-clip-text text-4xl font-black tracking-tight text-transparent md:text-5xl"
      >
        {`${text} `.repeat(6)}
      </motion.div>
    </div>
  );
}
