"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Sparkles, Heart, ChevronDown } from "lucide-react";
import { birthdayConfig } from "@/config/birthday";
import { useAudio } from "@/context/audio-context";

interface SectionIntroProps {
  onContinue: () => void;
}

export function SectionIntro({ onContinue }: SectionIntroProps) {
  const { openingText } = birthdayConfig;
  const { play } = useAudio();
  const [step, setStep] = useState(1);

  useEffect(() => {
    // Fast, gentle sequence: line 1 immediate, line 2 at 450ms, line 3 at 950ms, button at 1450ms
    const t2 = setTimeout(() => setStep(2), 450);
    const t3 = setTimeout(() => setStep(3), 950);
    const t4 = setTimeout(() => setStep(4), 1450);
    return () => {
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 text-center z-10 select-none overflow-hidden">
      <motion.div
        initial={{ scale: 0.8, opacity: 0.2 }}
        animate={{
          scale: step >= 1 ? [1, 1.15, 1] : 0.8,
          opacity: step >= 1 ? [0.35, 0.6, 0.35] : 0.2,
        }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-rosePink-300/20 blur-[50px] pointer-events-none will-change-transform"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: step >= 1 ? 0.8 : 0, scale: step >= 1 ? 1 : 0.5 }}
        transition={{ duration: 1.5 }}
        className="mb-8 flex items-center space-x-2"
      >
        <Sparkles className="w-4 h-4 text-rosePink-300 animate-pulse" />
        <Heart className="w-3.5 h-3.5 text-white/80 fill-white/20 animate-pulse" />
        <Sparkles className="w-4 h-4 text-champagne-300 animate-pulse" />
      </motion.div>

      <div className="flex flex-col items-center justify-center space-y-6 max-w-lg min-h-[160px]">
        {step >= 1 && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-2xl sm:text-3xl font-light tracking-wide text-textPrimary font-serif italic"
          >
            {openingText.line1}
          </motion.p>
        )}
        {step >= 2 && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-xl sm:text-2xl font-light text-rosePink-200 tracking-wider glow-text-pink"
          >
            {openingText.line2}
          </motion.p>
        )}
        {step >= 3 && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-xs sm:text-sm font-light text-textSecondary tracking-widest uppercase font-cinzel"
          >
            {openingText.line3}
          </motion.p>
        )}
      </div>

      {step >= 4 ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-12"
        >
          <button
            onClick={() => {
              play();
              onContinue();
            }}
            className="group relative flex items-center space-x-2.5 px-8 py-3.5 rounded-full bg-surface/80 hover:bg-surface-hover border border-rosePink-300/40 text-rosePink-300 text-xs tracking-widest uppercase transition-all duration-500 shadow-glow-pink hover:shadow-glow active:scale-95 cursor-pointer"
          >
            <span>{openingText.buttonText}</span>
            <ChevronDown className="w-4 h-4 text-rosePink-300 group-hover:translate-y-1 transition-transform" />
          </button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          className="mt-12"
        >
          <button
            onClick={() => {
              play();
              onContinue();
            }}
            className="text-[11px] uppercase tracking-widest text-textSecondary/70 hover:text-rosePink-300 transition-colors cursor-pointer"
          >
            Skip directly ↓
          </button>
        </motion.div>
      )}
    </section>
  );
}
