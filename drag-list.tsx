"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, Reorder } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sun, Moon, Lock, Unlock, Send, Volume2, Search, ArrowRight, Check, Plus, Star } from "lucide-react";

export function DragList() {
  const [items, setItems] = useState([1, 2, 3]);
  return (
    <Reorder.Group axis="y" values={items} onReorder={setItems} className="flex flex-col gap-2 w-full max-w-[150px]">
      {items.map((item) => (
        <Reorder.Item key={item} value={item} className="bg-zinc-800 px-4 py-2 rounded-lg text-sm text-zinc-300 shadow-md cursor-grab active:cursor-grabbing font-medium text-center border border-zinc-700">
          Item {item}
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}