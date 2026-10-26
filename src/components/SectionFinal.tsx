"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Heart, Sparkles, RefreshCw, ChevronDown } from "lucide-react";
import { birthdayConfig } from "@/config/birthday";

interface SectionFinalProps {
  onReplay: () => void;
  onContinueToFarewell?: () => void;
}

export function SectionFinal({ onReplay, onContinueToFarewell }: SectionFinalProps) {
  const { finalSurprise } = birthdayConfig;
  const [step, setStep] = useState(0);

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 text-center z-10 py-24 overflow-hidden bg-background">
      <motion.div
        initial={{ scale: 0.2, opacity: 0.1 }}
        whileInView={{ scale: [0.5, 1.5, 1], opacity: [0.2, 0.6, 0.4] }}
        viewport={{ once: true }}
        transition={{ duration: 3, ease: "easeInOut" }}
        className="absolute w-[600px] h-[600px] bg-rosePink-300/18 rounded-full blur-[160px] pointer-events-none"
      />

      <div className="relative max-w-lg w-full flex flex-col items-center justify-center min-h-[300px] space-y-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          onAnimationComplete={() => setStep(1)}
          className="text-xl sm:text-2xl font-serif text-textSecondary italic will-change-transform"
        >
          {finalSurprise.waitLine1}
        </motion.p>

        {step >= 1 && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            onAnimationComplete={() => setStep(2)}
            className="text-lg sm:text-xl font-light text-rosePink-300/90 tracking-widest uppercase font-cinzel glow-text-pink will-change-transform"
          >
            {finalSurprise.waitLine2}
          </motion.p>
        )}

        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="space-y-4 pt-6 will-change-transform"
          >
            <div className="flex items-center justify-center space-x-2 text-rosePink-300">
              <Heart className="w-5 h-5 fill-rosePink-300 animate-pulse" />
              <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: "8s" }} />
              <Heart className="w-5 h-5 fill-rosePink-300 animate-pulse" />
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-cinzel font-bold tracking-wider text-textPrimary glow-text-pink">
              Happy Birthday to You
            </h1>

            <p className="text-base sm:text-lg font-serif text-rosePink-100 font-light italic max-w-sm mx-auto leading-relaxed">
              {finalSurprise.subline}
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.2 }}
              className="pt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button
                onClick={onReplay}
                className="group relative flex items-center space-x-2.5 px-7 py-3.5 rounded-full bg-surface/80 hover:bg-surface border border-white/15 hover:border-white/30 text-textSecondary hover:text-textPrimary text-xs tracking-widest uppercase transition-all duration-300 active:scale-95"
              >
                <RefreshCw className="w-4 h-4 text-textSecondary group-hover:text-rosePink-300 group-hover:rotate-180 transition-transform duration-700" />
                <span>{finalSurprise.replayButton}</span>
              </button>

              {onContinueToFarewell && (
                <button
                  onClick={onContinueToFarewell}
                  className="group relative flex items-center space-x-2.5 px-8 py-3.5 rounded-full glass-panel-pink hover:border-rosePink-300/60 text-rosePink-200 text-xs tracking-widest uppercase transition-all duration-500 shadow-glow-pink hover:shadow-glow active:scale-95"
                >
                  <span>Wait... There&apos;s one more thing</span>
                  <ChevronDown className="w-4 h-4 text-rosePink-300 group-hover:translate-y-1 transition-transform" />
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
