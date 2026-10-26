"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { RefreshCw } from "lucide-react";

interface SectionGoodbyeProps {
  onReplay: () => void;
}

export function SectionGoodbye({ onReplay }: SectionGoodbyeProps) {
  // Phase 0: Initial
  // Phase 1: "wait......."
  // Phase 2: Big loving heart draws thin baby pink outline
  // Phase 3: "GOODBYE" appears inside the beating heart
  const [phase, setPhase] = useState<0 | 1 | 2 | 3>(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!inView) return;

    // Phase 1: "wait......."
    setPhase(1);

    // After 2.4 seconds, start heart drawing
    const t1 = setTimeout(() => {
      setPhase(2);
    }, 2400);

    // After 4.2 seconds, reveal "GOODBYE" inside the beating heart
    const t2 = setTimeout(() => {
      setPhase(3);
    }, 4200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [inView]);

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-6 text-center z-10 py-16 overflow-hidden bg-[#040406]">
      {/* Subtle ambient deep glow behind */}
      <motion.div
        animate={{
          opacity: phase >= 2 ? [0.15, 0.25, 0.15] : 0.08,
          scale: phase >= 2 ? [1, 1.15, 1] : 0.9,
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[500px] h-[500px] sm:w-[650px] sm:h-[650px] bg-rosePink-300/10 rounded-full blur-[160px] pointer-events-none"
      />

      {/* Viewport detection trigger */}
      <motion.div
        onViewportEnter={() => {
          if (!inView) setInView(true);
        }}
        viewport={{ amount: 0.35, once: true }}
        className="relative max-w-2xl w-full flex flex-col items-center justify-center min-h-[500px]"
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
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="flex flex-col items-center space-y-3 will-change-transform"
            >
              <div className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-textPrimary tracking-widest font-light">
                <span>wait</span>
                <span className="inline-flex space-x-1.5 ml-2 text-rosePink-300">
                  {Array.from({ length: 7 }).map((_, idx) => (
                    <motion.span
                      key={idx}
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        delay: idx * 0.18,
                      }}
                    >
                      .
                    </motion.span>
                  ))}
                </span>
              </div>
            </motion.div>
          )}

          {/* ============================================================ */}
          {/* PHASE 2 & 3: BIG LOVING HEART BEATING + "GOODBYE" INSIDE */}
          {/* ============================================================ */}
          {phase >= 2 && (
            <motion.div
              key="heart-phase"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="relative flex flex-col items-center justify-center w-full will-change-transform"
            >
              {/* BIG LOVING HEART CONTAINER with rhythmic heartbeat */}
              <motion.div
                animate={
                  phase === 3
                    ? {
                        scale: [1, 1.08, 1.02, 1.12, 1, 1],
                      }
                    : { scale: 1 }
                }
                transition={{
                  duration: 1.35,
                  repeat: Infinity,
                  times: [0, 0.14, 0.28, 0.42, 0.7, 1],
                  ease: "easeInOut",
                }}
                className="relative flex items-center justify-center w-[320px] h-[300px] sm:w-[460px] sm:h-[430px] md:w-[540px] md:h-[500px] select-none"
              >
                {/* Thin, proper loving heart outline in Baby Pink */}
                <svg
                  viewBox="0 0 500 460"
                  className="w-full h-full drop-shadow-[0_0_12px_rgba(248,200,220,0.55)] overflow-visible"
                >
                  <motion.path
                    d="M 250, 130 C 230, 60, 165, 20, 105, 20 C 40, 20, 10, 80, 10, 155 C 10, 255, 125, 345, 250, 440 C 375, 345, 490, 255, 490, 155 C 490, 80, 460, 20, 395, 20 C 335, 20, 270, 60, 250, 130 Z"
                    fill="none"
                    stroke="#F8C8DC"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2.0, ease: "easeInOut" }}
                  />
                </svg>

                {/* INSIDE: NOTHING JUST THAT TEXT "GOODBYE" */}
                {phase === 3 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 1.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none pb-4 sm:pb-6"
                  >
                    <div className="flex items-center justify-center space-x-1.5 sm:space-x-3 md:space-x-4">
                      {"GOODBYE".split("").map((letter, idx) => (
                        <motion.span
                          key={idx}
                          initial={{ opacity: 0, y: 12, scale: 0.7 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{
                            delay: 0.15 + idx * 0.1,
                            duration: 0.6,
                            ease: "easeOut",
                          }}
                          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-cinzel font-bold text-[#F8C8DC] tracking-wider drop-shadow-[0_0_20px_rgba(248,200,220,0.8)]"
                        >
                          {letter}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* Replay Journey Button underneath */}
              {phase === 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8, duration: 0.8 }}
                  className="pt-8 flex justify-center"
                >
                  <button
                    onClick={onReplay}
                    className="group relative flex items-center space-x-2.5 px-8 py-3.5 rounded-full glass-panel-pink hover:border-rosePink-300/60 text-rosePink-200 text-xs tracking-widest uppercase transition-all duration-500 shadow-glow-pink hover:shadow-glow active:scale-95"
                  >
                    <RefreshCw className="w-4 h-4 text-rosePink-300 group-hover:rotate-180 transition-transform duration-700" />
                    <span>Replay Experience ↻</span>
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
