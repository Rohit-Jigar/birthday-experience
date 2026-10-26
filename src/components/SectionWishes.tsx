"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import confetti from "canvas-confetti";
import { Sparkles, Heart } from "lucide-react";
import { birthdayConfig } from "@/config/birthday";
import { triggerHaptic } from "@/utils/haptics";
import { FloatingSkyLantern } from "./FloatingSkyLantern";

function GoldenScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isScratching, setIsScratching] = useState(false);
  const isRevealedRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Draw shimmering rose-gold foil
    const width = (canvas.width = canvas.offsetWidth);
    const height = (canvas.height = canvas.offsetHeight);

    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, "#E6C896");
    grad.addColorStop(0.3, "#F8C8DC");
    grad.addColorStop(0.7, "#E8A5B8");
    grad.addColorStop(1, "#F2D7B0");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Subtle decorative speckles
    ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
    for (let i = 0; i < 40; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 2 + 1, 0, Math.PI * 2);
      ctx.fill();
    }

    // Callout text on the foil
    ctx.fillStyle = "#1E121E";
    ctx.font = "bold 13px serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("✦ Scratch here with your finger ✦", width / 2, height / 2 - 8);

    ctx.fillStyle = "#3E223E";
    ctx.font = "11px sans-serif";
    ctx.fillText("to reveal a hidden birthday blessing", width / 2, height / 2 + 12);
  }, []);

  const scratch = (clientX: number, clientY: number) => {
    if (isRevealedRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    triggerHaptic("scratch");

    // Check scratched percentage occasionally
    if (Math.random() < 0.25) {
      checkScratched();
    }
  };

  const checkScratched = () => {
    if (isRevealedRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    try {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      let transparentPixels = 0;
      for (let i = 3; i < data.length; i += 16) {
        if (data[i] === 0) transparentPixels++;
      }
      const totalSampled = data.length / 16;
      if (transparentPixels / totalSampled > 0.4) {
        isRevealedRef.current = true;
        setIsRevealed(true);
        triggerHaptic("success");
        confetti({
          particleCount: 30,
          spread: 60,
          origin: { y: 0.7 },
          colors: ["#F8C8DC", "#FFFFFF", "#E6C896"],
        });
      }
    } catch {
      // ignore
    }
  };

  return (
    <div className="relative w-full max-w-md h-36 mx-auto rounded-2xl overflow-hidden border border-rosePink-300/40 shadow-glow-pink select-none mt-8">
      {/* Hidden Secret Message underneath */}
      <div className="absolute inset-0 bg-surface/90 backdrop-blur-md p-6 flex flex-col items-center justify-center text-center space-y-1.5">
        <Heart className="w-5 h-5 text-rosePink-300 fill-rosePink-300/40 animate-pulse" />
        <h4 className="text-xs uppercase tracking-widest font-cinzel text-rosePink-300 font-semibold">
          Secret Birthday Blessing
        </h4>
        <p className="text-xs sm:text-sm font-serif italic text-textPrimary leading-relaxed">
          &ldquo;No matter how many seasons pass, your kindness, warmth, and grace will always be remembered with respect.&rdquo;
        </p>
      </div>

      {/* Golden Scratchable Canvas Foil */}
      <canvas
        ref={canvasRef}
        onMouseDown={(e) => {
          setIsScratching(true);
          scratch(e.clientX, e.clientY);
        }}
        onMouseMove={(e) => {
          if (isScratching) scratch(e.clientX, e.clientY);
        }}
        onMouseUp={() => setIsScratching(false)}
        onMouseLeave={() => setIsScratching(false)}
        onTouchStart={(e) => {
          setIsScratching(true);
          if (e.touches[0]) scratch(e.touches[0].clientX, e.touches[0].clientY);
        }}
        onTouchMove={(e) => {
          if (isScratching && e.touches[0]) {
            scratch(e.touches[0].clientX, e.touches[0].clientY);
          }
        }}
        onTouchEnd={() => setIsScratching(false)}
        className={`absolute inset-0 w-full h-full cursor-pointer transition-opacity duration-700 ${
          isRevealed ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      />
    </div>
  );
}

export function SectionWishes() {
  const { wishes, finalWishQuote } = birthdayConfig;

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 text-center z-10 py-24 overflow-hidden">
      <div className="absolute w-[500px] h-[500px] bg-rosePink-300/8 rounded-full blur-[150px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="mb-14 space-y-2"
      >
        <div className="flex items-center justify-center space-x-2 text-rosePink-300 text-xs tracking-widest uppercase font-cinzel">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Whispers of Hope</span>
          <Sparkles className="w-3.5 h-3.5" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif text-textPrimary font-normal">
          Things I Wish For You
        </h2>
      </motion.div>

      <div className="space-y-8 max-w-xl w-full">
        {wishes.map((wish, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, delay: 0.1 * idx }}
            className="p-6 rounded-2xl glass-panel border border-white/10 hover:border-rosePink-300/30 transition-colors will-change-transform"
          >
            <p className="text-lg sm:text-xl font-serif font-light text-textPrimary/90 italic tracking-wide">
              &quot;{wish}&quot;
            </p>
          </motion.div>
        ))}

        {/* Digital Golden Scratch Card */}
        <GoldenScratchCard />

        {/* Floating Sky Lantern Wish */}
        <FloatingSkyLantern />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="p-8 sm:p-10 rounded-3xl glass-panel-pink border border-rosePink-300/40 shadow-glow-pink mt-10 will-change-transform"
        >
          <div className="flex justify-center mb-3">
            <Heart className="w-5 h-5 text-rosePink-300 fill-rosePink-300/40" />
          </div>
          <p className="text-xl sm:text-2xl font-serif text-rosePink-200 font-normal italic leading-relaxed glow-text-pink">
            &quot;{finalWishQuote}&quot;
          </p>
        </motion.div>
      </div>
    </section>
  );
}
