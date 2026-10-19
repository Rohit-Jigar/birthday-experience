"use client";

import React from "react";
import { motion } from "motion/react";
import { Sparkles, RotateCcw, Heart, Image as ImageIcon } from "lucide-react";
import { CelebrationConfettiTrigger, fireCelebrationConfetti } from "./celebration-confetti";
import { BIRTHDAY_CONFIG } from "@/config/birthday";
import { Button } from "@/components/ui/button";

interface FinalSceneProps {
  onReplay: () => void;
  onGoToGallery: () => void;
  onPlayChime?: () => void;
}

export function FinalScene({ onReplay, onGoToGallery, onPlayChime }: FinalSceneProps) {
  const handleCelebrateAgain = () => {
    if (onPlayChime) onPlayChime();
    fireCelebrationConfetti();
  };

  return (
    <div className="relative w-full min-h-screen py-20 px-4 sm:px-8 flex flex-col items-center justify-center overflow-hidden bg-radial from-[#2E1228] via-[#160D22] to-[#0A050E] text-center select-none">
      {/* Confetti Trigger */}
      <CelebrationConfettiTrigger />

      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[450px] h-[450px] bg-[#F2D7B0]/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Content Container */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 max-w-xl mx-auto space-y-6"
      >
        {/* Floating Heart Emblem */}
        <motion.div
          animate={{
            y: [-6, 6, -6],
            scale: [1, 1.06, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full glass-panel flex items-center justify-center rose-glow border border-rose-300/30"
        >
          <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-rose-300 fill-rose-400/50 drop-shadow-[0_0_18px_rgba(232,165,184,0.9)]" />
        </motion.div>

        {/* Date badge */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full glass-pill text-xs text-rose-200 border border-rose-300/20 shadow-md">
          <Sparkles size={12} className="text-[#F2D7B0]" />
          <span>{BIRTHDAY_CONFIG.birthdayDate} &bull; A Special Day</span>
        </div>

        {/* Grand Headline */}
        <h1 className="text-4xl sm:text-6xl font-serif font-light text-white tracking-tight leading-tight text-glow">
          Happy Birthday
        </h1>

        {/* Final Message */}
        <p className="text-base sm:text-xl text-rose-100/90 font-light max-w-lg mx-auto leading-relaxed">
          {BIRTHDAY_CONFIG.finalMessage}
        </p>

        {/* Subtext */}
        <p className="text-xs sm:text-sm text-rose-200/70 font-light max-w-md mx-auto">
          {BIRTHDAY_CONFIG.finalSubtext}
        </p>

        {/* Dedicated Hindi Quote Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-panel p-5 rounded-2xl border border-rose-300/20 max-w-md mx-auto mt-6"
        >
          <p className="text-sm sm:text-base font-medium text-white/95 leading-relaxed tracking-wide">
            {BIRTHDAY_CONFIG.personalQuote.hindi}
          </p>
          <p className="text-[11px] text-rose-200/60 font-light italic mt-1">
            "{BIRTHDAY_CONFIG.personalQuote.english}"
          </p>
        </motion.div>

        {/* Action Controls */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-3">
          <Button
            onClick={onReplay}
            variant="glass"
            size="lg"
            className="rounded-full px-6 flex items-center gap-2 border border-rose-300/30"
          >
            <RotateCcw size={15} />
            <span>Replay Journey</span>
          </Button>

          <Button
            onClick={onGoToGallery}
            variant="glass"
            size="lg"
            className="rounded-full px-6 flex items-center gap-2 border border-rose-300/30"
          >
            <ImageIcon size={15} />
            <span>Revisit Photos</span>
          </Button>

          <Button
            onClick={handleCelebrateAgain}
            variant="champagne"
            size="lg"
            className="rounded-full px-7 shadow-xl hover:scale-105 transition-transform"
          >
            <Sparkles size={15} className="mr-1.5" />
            <span>Celebrate Again</span>
          </Button>
        </div>
      </motion.div>

      {/* Subtle Footer Note */}
      <footer className="relative z-10 mt-16 text-[11px] text-rose-300/40 font-mono tracking-widest uppercase">
        Created with sincere care &bull; 2026
      </footer>
    </div>
  );
}
