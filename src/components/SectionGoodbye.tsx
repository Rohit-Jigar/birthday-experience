"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Sparkles, RefreshCw } from "lucide-react";
import { birthdayConfig } from "@/config/birthday";

interface SectionGoodbyeProps {
  onReplay: () => void;
}

export function SectionGoodbye({ onReplay }: SectionGoodbyeProps) {
  // Phase 0: Initial hidden
  // Phase 1: "wait......."
  // Phase 2: Heart drawing & expanding
  // Phase 3: "GOODBYE" emerges from the heart + final warm reflection
  const [phase, setPhase] = useState<0 | 1 | 2 | 3>(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!inView) return;

    // Start with "wait......."
    setPhase(1);

    // After 2.6 seconds, transition to Heart drawing
    const t1 = setTimeout(() => {
      setPhase(2);
    }, 2600);

    // After heart draws (2s later), reveal "GOODBYE" from the heart
    const t2 = setTimeout(() => {
      setPhase(3);
    }, 4800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [inView]);

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 text-center z-10 py-20 overflow-hidden bg-[#040406]">
      {/* Deep cosmic ambient glow */}
      <motion.div
        animate={{
          scale: phase >= 2 ? [1, 1.25, 1] : 0.8,
          opacity: phase >= 2 ? [0.25, 0.45, 0.25] : 0.15,
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[550px] h-[550px] sm:w-[650px] sm:h-[650px] bg-rosePink-300/15 rounded-full blur-[170px] pointer-events-none"
      />

      {/* Trigger for viewport entry */}
      <motion.div
        onViewportEnter={() => {
          if (!inView) setInView(true);
        }}
        viewport={{ amount: 0.35, once: true }}
        className="relative max-w-xl w-full flex flex-col items-center justify-center min-h-[440px]"
      >
        <AnimatePresence mode="wait">
          {/* ============================================================ */}
          {/* PHASE 1: "wait......." */}
          {/* ============================================================ */}
          {phase === 1 && (
            <motion.div
              key="wait-phase"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center space-y-4 will-change-transform"
            >
              <div className="flex items-center space-x-1.5 text-rosePink-300/70 mb-2">
                <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: "6s" }} />
              </div>

              <div className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-textPrimary tracking-widest font-light">
                <span>wait</span>
                {/* Animated pulsating dots */}
                <span className="inline-flex space-x-1 ml-2 text-rosePink-300">
                  <motion.span
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
                  >
                    .
                  </motion.span>
                  <motion.span
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
                  >
                    .
                  </motion.span>
                  <motion.span
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
                  >
                    .
                  </motion.span>
                  <motion.span
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: 0.6 }}
                  >
                    .
                  </motion.span>
                  <motion.span
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: 0.8 }}
                  >
                    .
                  </motion.span>
                  <motion.span
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: 1.0 }}
                  >
                    .
                  </motion.span>
                  <motion.span
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: 1.2 }}
                  >
                    .
                  </motion.span>
                </span>
              </div>

              <p className="text-xs sm:text-sm text-textSecondary/70 font-light tracking-widest uppercase font-cinzel pt-3">
                take one quiet moment
              </p>
            </motion.div>
          )}

          {/* ============================================================ */}
          {/* PHASE 2 & 3: HEART DRAWING + "GOODBYE" EMERGENCE */}
          {/* ============================================================ */}
          {phase >= 2 && (
            <motion.div
              key="heart-goodbye-phase"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative flex flex-col items-center justify-center w-full will-change-transform"
            >
              {/* Outer Pulsing Heart Container */}
              <div className="relative flex items-center justify-center w-72 h-72 sm:w-88 sm:h-88 my-4 select-none">
                {/* Background breathing glow behind heart */}
                <motion.div
                  animate={{
                    scale: [0.95, 1.15, 0.95],
                    opacity: [0.35, 0.65, 0.35],
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute w-52 h-52 sm:w-64 sm:h-64 rounded-full bg-rosePink-300/25 blur-[55px] pointer-events-none"
                />

                {/* Animated SVG Heart */}
                <motion.svg
                  viewBox="0 0 300 280"
                  animate={
                    phase === 3
                      ? {
                          scale: [1, 1.05, 1, 1.03, 1],
                        }
                      : { scale: 1 }
                  }
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-full h-full text-rosePink-300 drop-shadow-[0_0_25px_rgba(248,200,220,0.6)]"
                >
                  <defs>
                    <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#F8C8DC" />
                      <stop offset="50%" stopColor="#FFFFFF" />
                      <stop offset="100%" stopColor="#F2D7B0" />
                    </linearGradient>

                    <radialGradient id="heartFillGrad" cx="50%" cy="40%" r="60%">
                      <stop offset="0%" stopColor="#F8C8DC" stopOpacity="0.28" />
                      <stop offset="70%" stopColor="#E8A5B8" stopOpacity="0.12" />
                      <stop offset="100%" stopColor="#140B17" stopOpacity="0.02" />
                    </radialGradient>
                  </defs>

                  {/* Filled Inner Heart */}
                  <motion.path
                    d="M 150,75 C 150,30 90,20 50,60 C 10,100 20,165 150,255 C 280,165 290,100 250,60 C 210,20 150,30 150,75 Z"
                    fill="url(#heartFillGrad)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: phase >= 2 ? 1 : 0 }}
                    transition={{ duration: 1.5, delay: 0.8 }}
                  />

                  {/* Animated Drawing Path */}
                  <motion.path
                    d="M 150,75 C 150,30 90,20 50,60 C 10,100 20,165 150,255 C 280,165 290,100 250,60 C 210,20 150,30 150,75 Z"
                    fill="none"
                    stroke="url(#heartGradient)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2.0, ease: "easeInOut" }}
                  />

                  {/* Decorative orbital halo particles around the heart */}
                  <motion.circle
                    cx="50"
                    cy="60"
                    r="3.5"
                    fill="#F2D7B0"
                    animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.3, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.circle
                    cx="250"
                    cy="60"
                    r="3.5"
                    fill="#F8C8DC"
                    animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.3, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  />
                  <motion.circle
                    cx="150"
                    cy="255"
                    r="4"
                    fill="#FFFFFF"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.8, repeat: Infinity, delay: 1 }}
                  />
                </motion.svg>

                {/* ======================================================= */}
                {/* "GOODBYE" TEXT EMERGING FROM CENTER OF THE HEART */}
                {/* ======================================================= */}
                {phase === 3 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.2, filter: "blur(12px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{
                      duration: 1.4,
                      ease: [0.16, 1, 0.3, 1], // Gentle spring curve
                    }}
                    className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
                  >
                    {/* Sparkle emblem above text */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.8 }}
                      className="flex items-center space-x-1.5 text-rosePink-200 mb-1"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-rosePink-300 animate-pulse" />
                      <Heart className="w-3 h-3 fill-rosePink-300 text-rosePink-300" />
                      <Sparkles className="w-3.5 h-3.5 text-champagne-300 animate-pulse" />
                    </motion.div>

                    {/* Staggered glowing letters for "GOODBYE" */}
                    <div className="flex items-center justify-center space-x-1.5 sm:space-x-2">
                      {"GOODBYE".split("").map((letter, idx) => (
                        <motion.span
                          key={idx}
                          initial={{ opacity: 0, y: 12, scale: 0.5 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{
                            delay: 0.2 + idx * 0.12,
                            duration: 0.7,
                            ease: "easeOut",
                          }}
                          className="text-2xl sm:text-3xl md:text-4xl font-cinzel font-bold text-white tracking-widest drop-shadow-[0_0_15px_#F8C8DC]"
                        >
                          {letter}
                        </motion.span>
                      ))}
                    </div>

                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.85 }}
                      transition={{ delay: 1.2, duration: 0.8 }}
                      className="text-[11px] sm:text-xs font-serif italic text-rosePink-200 tracking-wider mt-1.5"
                    >
                      until our paths cross again ♡
                    </motion.span>
                  </motion.div>
                )}
              </div>

              {/* Phase 3 Narrative Farewell Reflection */}
              {phase === 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4, duration: 1 }}
                  className="space-y-4 max-w-md pt-2 px-4 will-change-transform"
                >
                  <p className="text-lg sm:text-xl font-serif italic text-rosePink-200 font-light leading-relaxed">
                    {birthdayConfig.finalWishQuote}
                  </p>

                  <p className="text-xs sm:text-sm text-textSecondary font-light leading-relaxed">
                    Some chapters close quietly, but the light they brought stays in the heart forever.
                    Take care of yourself, always.
                  </p>

                  {/* Replay Entire Journey Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.2, duration: 0.8 }}
                    className="pt-6 flex justify-center"
                  >
                    <button
                      onClick={onReplay}
                      className="group relative flex items-center space-x-2.5 px-8 py-3.5 rounded-full glass-panel-pink hover:border-rosePink-300/60 text-rosePink-200 text-xs tracking-widest uppercase transition-all duration-500 shadow-glow-pink hover:shadow-glow active:scale-95"
                    >
                      <RefreshCw className="w-4 h-4 text-rosePink-300 group-hover:rotate-180 transition-transform duration-700" />
                      <span>Replay Experience ↻</span>
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
