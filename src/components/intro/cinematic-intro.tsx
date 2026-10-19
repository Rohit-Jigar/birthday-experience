"use client";

import React from "react";
import { motion } from "motion/react";
import { Sparkles, ArrowRight, Heart } from "lucide-react";
import { BIRTHDAY_CONFIG } from "@/config/birthday";
import { FloatingPetals } from "./floating-petals";
import { Button } from "@/components/ui/button";

interface CinematicIntroProps {
  onContinue: () => void;
  onPlayChime?: () => void;
}

export function CinematicIntro({ onContinue, onPlayChime }: CinematicIntroProps) {
  const handleStart = () => {
    if (onPlayChime) onPlayChime();
    onContinue();
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden bg-radial from-[#351426]/60 via-[#160D22] to-[#0D0714] select-none">
      {/* Floating Petals */}
      <FloatingPetals count={18} />

      {/* Atmospheric radial light beam */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-[#F2D7B0]/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Center glowing crystal emblem */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
        className="relative mb-8 flex items-center justify-center z-20"
      >
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full glass-panel flex items-center justify-center rose-glow border border-rose-300/30">
          <motion.div
            animate={{
              scale: [1, 1.08, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-rose-300 fill-rose-400/40 drop-shadow-[0_0_15px_rgba(232,165,184,0.8)]" />
          </motion.div>

          {/* Orbiting sparkles */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="w-2 h-2 rounded-full bg-champagne-gold absolute -top-1 left-1/2 -translate-x-1/2 shadow-[0_0_10px_#F2D7B0]" />
          </motion.div>
        </div>
      </motion.div>

      {/* Staggered Typography */}
      <div className="relative z-20 text-center max-w-xl mx-auto space-y-4">
        {/* Recipient Greeting Tag */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full glass-pill text-xs sm:text-sm text-rose-200/90 tracking-wide border border-rose-300/20"
        >
          <Sparkles size={13} className="text-[#F2D7B0]" />
          <span>For Someone Incomparable</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="text-3xl sm:text-5xl font-serif font-medium tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#FFF5EE] via-[#E8A5B8] to-[#F2D7B0] leading-tight text-glow px-4"
        >
          {BIRTHDAY_CONFIG.openingTitle}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.9 }}
          className="text-sm sm:text-base text-rose-200/80 font-light max-w-md mx-auto leading-relaxed px-6"
        >
          {BIRTHDAY_CONFIG.openingSubtitle}
        </motion.p>

        {/* Call to action button */}
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-3 px-4"
        >
          <Button
            onClick={handleStart}
            size="lg"
            variant="default"
            className="group relative px-8 py-3.5 text-sm sm:text-base font-medium rounded-full overflow-hidden shadow-2xl rose-glow border border-rose-300/40"
          >
            <span className="relative z-10 flex items-center gap-2 text-white">
              <span>{BIRTHDAY_CONFIG.openingInvitation}</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 opacity-90 transition-opacity group-hover:opacity-100" />
          </Button>
        </motion.div>
      </div>

      {/* Bottom hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 2, duration: 1.5 }}
        className="absolute bottom-6 text-[11px] text-rose-300/50 tracking-widest uppercase font-mono"
      >
        A digital gift &bull; November 7
      </motion.div>
    </div>
  );
}
