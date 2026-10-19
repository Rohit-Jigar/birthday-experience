"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles } from "lucide-react";

interface CandleInteractiveProps {
  onBlowCandle?: () => void;
}

export function CandleInteractive({ onBlowCandle }: CandleInteractiveProps) {
  const [isLit, setIsLit] = useState(true);
  const [wishMade, setWishMade] = useState(false);

  const handleCandleClick = () => {
    if (isLit) {
      setIsLit(false);
      setWishMade(true);
      if (onBlowCandle) onBlowCandle();
    } else {
      setIsLit(true);
      setWishMade(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center my-8 select-none">
      {/* Candle Graphic */}
      <div
        onClick={handleCandleClick}
        className="relative flex flex-col items-center cursor-pointer group"
        title={isLit ? "Tap to blow out the candle and make a wish" : "Tap to relight the candle"}
      >
        {/* Flame Animation */}
        <AnimatePresence>
          {isLit ? (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [1, 1.15, 0.95, 1.05, 1],
                y: [0, -2, 1, -1, 0],
                opacity: 1,
              }}
              exit={{
                scale: 0,
                opacity: 0,
                y: -10,
                transition: { duration: 0.3 },
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative w-7 h-11 mb-1 flex items-center justify-center"
            >
              {/* Outer Golden Glow */}
              <div className="absolute inset-0 bg-[#F2D7B0] rounded-full blur-md opacity-80 animate-pulse" />
              {/* Inner Flame SVG */}
              <svg viewBox="0 0 24 36" className="w-full h-full relative z-10" fill="none">
                <path
                  d="M12 2 C16 10, 22 18, 20 26 C18 34, 6 34, 4 26 C2 18, 8 10, 12 2 Z"
                  fill="url(#flameGrad)"
                />
                <circle cx="12" cy="24" r="4" fill="#FFFFFF" opacity="0.9" />
                <defs>
                  <linearGradient id="flameGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FFF5EE" />
                    <stop offset="40%" stopColor="#F2D7B0" />
                    <stop offset="80%" stopColor="#E8A5B8" />
                    <stop offset="100%" stopColor="#C95B7E" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: [0.6, 0], y: -20 }}
              transition={{ duration: 1.5 }}
              className="w-1.5 h-6 text-white/50 text-[10px] flex items-center justify-center mb-1 font-mono"
            >
              ~
            </motion.div>
          )}
        </AnimatePresence>

        {/* Candle Wick */}
        <div className="w-0.5 h-2.5 bg-neutral-700 rounded-full" />

        {/* Candle Body */}
        <div className="w-8 h-20 rounded-t-lg bg-gradient-to-b from-[#F2D7B0]/90 via-[#E8A5B8]/80 to-[#6F2947]/90 shadow-lg border border-white/20 relative overflow-hidden">
          <div className="absolute top-1 left-1 right-1 h-1.5 bg-white/40 rounded-full blur-[1px]" />
          {/* Subtle wax dripping detail */}
          <div className="absolute top-2 left-1.5 w-1.5 h-6 bg-[#FFF5EE]/60 rounded-full" />
        </div>

        {/* Candle Base Plate */}
        <div className="w-16 h-3 rounded-full bg-white/10 border border-white/15 -mt-1 shadow-md shadow-black/60" />
      </div>

      {/* Wish Prompt Text */}
      <div className="mt-3 text-center">
        {wishMade ? (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-1.5 text-xs text-[#F2D7B0] font-medium"
          >
            <Sparkles size={12} />
            <span>Wish made. May it softly come true.</span>
          </motion.div>
        ) : (
          <span className="text-[11px] text-rose-200/70 tracking-wide">
            Tap the candle to make a silent birthday wish
          </span>
        )}
      </div>
    </div>
  );
}
