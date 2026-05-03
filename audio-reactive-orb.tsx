"use client";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type AudioRefs = {
  ctx?: AudioContext;
  analyser?: AnalyserNode;
  oscillators?: OscillatorNode[];
  raf?: number;
};

export function AudioReactiveOrb({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<AudioRefs>({});
  const [playing, setPlaying] = useState(false);

  const start = () => {
    if (audioRef.current.ctx) {
      audioRef.current.ctx.resume();
      runVisualizer();
      setPlaying(true);
      return;
    }
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctx();
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 256;
    const gain = ctx.createGain();
    gain.gain.value = 0.05;
    gain.connect(analyser);
    analyser.connect(ctx.destination);

    const osc1 = ctx.createOscillator();
    osc1.type = "sine";
    osc1.frequency.value = 110;
    const osc2 = ctx.createOscillator();
    osc2.type = "sine";
    osc2.frequency.value = 165;
    const osc3 = ctx.createOscillator();
    osc3.type = "triangle";
    osc3.frequency.value = 220;

    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.18;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 35;
    lfo.connect(lfoGain);
    lfoGain.connect(osc1.detune);
    lfoGain.connect(osc2.detune);

    [osc1, osc2, osc3].forEach((o) => o.connect(gain));
    [osc1, osc2, osc3, lfo].forEach((o) => o.start());

    audioRef.current = { ctx, analyser, oscillators: [osc1, osc2, osc3, lfo] };
    runVisualizer();
    setPlaying(true);
  };

  const runVisualizer = () => {
    const canvas = canvasRef.current;
    const analyser = audioRef.current.analyser;
    if (!canvas || !analyser) return;
    const c = canvas.getContext("2d");
    if (!c) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    const W = canvas.clientWidth;
    const H = canvas.clientHeight;
    const data = new Uint8Array(analyser.frequencyBinCount);

    const tick = () => {
      analyser.getByteFrequencyData(data);
      c.clearRect(0, 0, W, H);
      const cx = W / 2;
      const cy = H / 2;
      const baseR = Math.min(W, H) * 0.22;

      const N = data.length;
      for (let i = 0; i < N; i++) {
        const angle = (i / N) * Math.PI * 2 - Math.PI / 2;
        const v = data[i] / 255;
        const len = baseR + v * 50;
        const x1 = cx + Math.cos(angle) * baseR;
        const y1 = cy + Math.sin(angle) * baseR;
        const x2 = cx + Math.cos(angle) * len;
        const y2 = cy + Math.sin(angle) * len;
        c.strokeStyle = `hsl(${230 + v * 90}, 85%, ${55 + v * 25}%)`;
        c.lineWidth = 2;
        c.beginPath();
        c.moveTo(x1, y1);
        c.lineTo(x2, y2);
        c.stroke();
      }

      const grad = c.createRadialGradient(cx, cy, 0, cx, cy, baseR);
      grad.addColorStop(0, "rgba(165,180,252,0.55)");
      grad.addColorStop(1, "rgba(165,180,252,0)");
      c.fillStyle = grad;
      c.beginPath();
      c.arc(cx, cy, baseR, 0, Math.PI * 2);
      c.fill();

      audioRef.current.raf = requestAnimationFrame(tick);
    };
    if (audioRef.current.raf) cancelAnimationFrame(audioRef.current.raf);
    tick();
  };

  const stop = () => {
    audioRef.current.ctx?.suspend();
    if (audioRef.current.raf) cancelAnimationFrame(audioRef.current.raf);
    setPlaying(false);
  };

  useEffect(
    () => () => {
      if (audioRef.current.raf) cancelAnimationFrame(audioRef.current.raf);
      audioRef.current.ctx?.close();
    },
    [],
  );

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <canvas ref={canvasRef} className="h-36 w-36" />
      <button
        onClick={playing ? stop : start}
        className="rounded-full border border-zinc-700 bg-zinc-800 px-4 py-1.5 text-xs font-medium text-zinc-200 hover:bg-zinc-700"
      >
        {playing ? "Pause" : "Play tone"}
      </button>
    </div>
  );
}
