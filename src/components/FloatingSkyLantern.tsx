"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Send, X, RotateCcw } from "lucide-react";
import { triggerHaptic } from "@/utils/haptics";

const PRESET_WISHES = [
  "Peace of mind & quiet serenity 🕊️",
  "Limitless joy & endless smiles ✨",
  "Radiant health & gentle days 🌸",
  "Courage to follow your wildest dreams ✦",
  "A life full of love, warmth & kindness 💖",
];

export function FloatingSkyLantern() {
  const [isOpen, setIsOpen] = useState(false);
  const [customWish, setCustomWish] = useState("");
  const [isFlying, setIsFlying] = useState(false);
  const [releasedWish, setReleasedWish] = useState<string | null>(null);

  const handleSelectPreset = (wish: string) => {
    setCustomWish(wish);
    triggerHaptic("light");
  };

  const handleRelease = () => {
    const finalWish = customWish.trim() || "Happiness, peace, and endless light ✦";
    setReleasedWish(finalWish);
    setIsFlying(true);
    triggerHaptic("lantern");

    // After animation finishes in 5 seconds
    setTimeout(() => {
      setIsFlying(false);
    }, 5200);
  };

  const handleReset = () => {
    triggerHaptic("light");
    setReleasedWish(null);
    setCustomWish("");
  };

  return (
    <div className="w-full mt-10">
      {!isOpen ? (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            triggerHaptic("medium");
            setIsOpen(true);
          }}
          className="group relative inline-flex items-center space-x-2.5 px-6 py-3.5 rounded-full glass-panel-pink border border-rosePink-300/40 hover:border-rosePink-300/80 text-rosePink-200 hover:text-white text-xs tracking-widest uppercase transition-all duration-300 shadow-glow-pink/30 active:scale-95"
        >
          <span className="text-base group-hover:scale-125 transition-transform duration-300">🏮</span>
          <span>Release a Sky Lantern</span>
          <Sparkles className="w-3.5 h-3.5 text-rosePink-300 group-hover:rotate-45 transition-transform" />
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="relative w-full max-w-lg mx-auto p-6 sm:p-8 rounded-3xl glass-panel border border-rosePink-300/35 shadow-2xl text-left"
        >
          <button
            onClick={() => {
              triggerHaptic("light");
              setIsOpen(false);
            }}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-textSecondary hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center space-x-2 text-rosePink-300 text-xs tracking-widest uppercase font-cinzel mb-1.5">
            <span className="text-base">🏮</span>
            <span>Celestial Lantern</span>
          </div>

          <h3 className="text-xl font-serif text-textPrimary font-medium mb-2">
            Send a Wish into the Universe
          </h3>

          <p className="text-xs text-textSecondary font-light leading-relaxed mb-4">
            Type your secret prayer, or choose one below. When released, your lantern will take
            flight across the night sky.
          </p>

          {/* Preset Buttons */}
          <div className="flex flex-wrap gap-2 mb-4">
            {PRESET_WISHES.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectPreset(preset)}
                className={`text-xs px-3 py-1.5 rounded-full transition-all duration-200 border ${
                  customWish === preset
                    ? "bg-rosePink-300/30 border-rosePink-300 text-rosePink-100 shadow-glow-pink/40"
                    : "bg-surface/50 border-white/10 text-textSecondary hover:border-white/30 hover:text-textPrimary"
                }`}
              >
                {preset}
              </button>
            ))}
          </div>

          {/* Custom Wish Input */}
          <div className="relative mb-5">
            <input
              type="text"
              value={customWish}
              onChange={(e) => setCustomWish(e.target.value)}
              placeholder="Or write your own quiet wish here..."
              maxLength={120}
              className="w-full px-4 py-3 rounded-2xl bg-surface/70 border border-white/15 focus:border-rosePink-300/60 focus:outline-none text-sm text-textPrimary placeholder:text-textSecondary/50 font-light"
            />
          </div>

          {/* Action button */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-textSecondary font-light italic">
              ✦ Watched over by the stars
            </span>

            <button
              onClick={handleRelease}
              disabled={isFlying}
              className="group flex items-center space-x-2 px-6 py-2.5 rounded-full bg-rosePink-300/25 hover:bg-rosePink-300/40 border border-rosePink-300/60 text-rosePink-200 hover:text-white text-xs tracking-widest uppercase transition-all duration-300 active:scale-95 disabled:opacity-50"
            >
              <span>Light &amp; Release</span>
              <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Success / Airborne state */}
          <AnimatePresence>
            {releasedWish && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-6 pt-5 border-t border-white/10 text-center space-y-2"
              >
                <p className="text-xs font-serif italic text-rosePink-200">
                  &quot;{releasedWish}&quot;
                </p>
                <p className="text-[11px] text-textSecondary font-light">
                  ✦ Your lantern is currently floating into the heavens. May your kind heart receive
                  every blessing.
                </p>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center space-x-1.5 text-[10px] uppercase tracking-wider text-rosePink-300 hover:text-white transition-colors pt-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Send another wish</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Floating Animated Lantern Overlay */}
      <AnimatePresence>
        {isFlying && (
          <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden flex justify-center items-end">
            <motion.div
              initial={{ y: 50, x: 0, scale: 1, opacity: 1 }}
              animate={{
                y: -window.innerHeight - 300,
                x: [0, 25, -25, 15, -10, 5],
                scale: [1, 0.9, 0.7, 0.45, 0.25, 0.1],
                opacity: [1, 1, 0.95, 0.85, 0.6, 0],
              }}
              transition={{
                duration: 5,
                ease: "easeOut",
                times: [0, 0.2, 0.4, 0.6, 0.8, 1],
              }}
              className="relative flex flex-col items-center select-none"
            >
              {/* Paper Lantern Body */}
              <div className="relative w-28 h-36 rounded-3xl bg-gradient-to-b from-[#FFF2D6] via-[#F8C8DC] to-[#E28B70] shadow-[0_0_60px_#FFAE66] border border-white/40 flex items-center justify-center overflow-hidden">
                {/* Inner Candle Glow */}
                <div className="w-10 h-10 rounded-full bg-white shadow-[0_0_30px_#FFD166] animate-pulse" />
                {/* Subtle paper ribs */}
                <div className="absolute inset-0 border-y-2 border-black/10 opacity-40 pointer-events-none" />
              </div>

              {/* Lantern base rim */}
              <div className="w-14 h-2 bg-[#8C4A28] rounded-full -mt-0.5 shadow-md" />

              {/* Rising embers */}
              {Array.from({ length: 6 }).map((_, idx) => (
                <motion.span
                  key={idx}
                  animate={{
                    y: [0, 40],
                    opacity: [0.8, 0],
                    scale: [1, 0.3],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: idx * 0.2,
                  }}
                  className="absolute -bottom-4 w-1.5 h-1.5 rounded-full bg-[#FFE699] shadow-[0_0_8px_#FFAE66]"
                />
              ))}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
