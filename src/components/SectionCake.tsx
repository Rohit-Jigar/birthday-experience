"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import { Sparkles, Flame, Heart } from "lucide-react";
import { birthdayConfig } from "@/config/birthday";

export function SectionCake() {
  const { cakeMessage } = birthdayConfig;
  const [candles, setCandles] = useState([true, true, true]);
  const [hasCelebrated, setHasCelebrated] = useState(false);

  const allLit = candles.every((c) => c);
  const allBlown = candles.every((c) => !c);

  useEffect(() => {
    if (allLit && !hasCelebrated) {
      setHasCelebrated(true);
      confetti({
        particleCount: 40,
        spread: 70,
        origin: { y: 0.65 },
        colors: ["#F8C8DC", "#FFFFFF", "#E6C896", "#FCE4EC"],
        disableForReducedMotion: true,
      });
    }
  }, [allLit, hasCelebrated]);

  const toggleCandle = (index: number) => {
    setCandles((prev) => {
      const updated = [...prev];
      const willBeLit = !updated[index];
      updated[index] = willBeLit;
      if (!willBeLit) {
        confetti({
          particleCount: 15,
          spread: 40,
          origin: { y: 0.55 },
          colors: ["#F8C8DC", "#FFFFFF", "#FCE4EC"],
          ticks: 120,
          gravity: 0.8,
        });
      }
      return updated;
    });
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 text-center z-10 py-20 overflow-hidden">
      <div className="absolute w-96 h-96 bg-rosePink-300/12 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="mb-8 space-y-2"
      >
        <div className="flex items-center justify-center space-x-2 text-rosePink-300 text-xs tracking-widest uppercase font-cinzel">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Celebrate the Moment</span>
          <Sparkles className="w-3.5 h-3.5" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif text-textPrimary font-normal">
          {allBlown ? "Wish Granted ♡" : "Make A Secret Wish"}
        </h2>
        <p className="text-xs sm:text-sm text-textSecondary max-w-xs mx-auto font-light">
          {allBlown
            ? "Your wish has been sent to the stars."
            : "Tap each flame to blow out the candles."}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 90, damping: 18 }}
        className="relative flex flex-col items-center justify-center my-6 select-none will-change-transform"
      >
        {/* Candles */}
        <div className="flex items-center space-x-9 sm:space-x-14 mb-2 z-20">
          {candles.map((isLit, idx) => (
            <div key={idx} className="flex flex-col items-center group">
              <div
                onClick={() => toggleCandle(idx)}
                className="relative flex items-center justify-center w-10 h-12 cursor-pointer"
              >
                <AnimatePresence>
                  {isLit && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: [1, 1.15, 1], opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="relative flex flex-col items-center"
                    >
                      <span className="absolute w-7 h-9 rounded-full bg-rosePink-300/40 blur-md animate-pulse" />
                      <Flame className="w-7 h-8 text-rosePink-300 fill-rosePink-300 drop-shadow-[0_0_12px_#F8C8DC]" />
                    </motion.div>
                  )}
                </AnimatePresence>
                {!isLit && (
                  <motion.div
                    initial={{ opacity: 1, y: 0, scale: 0.8 }}
                    animate={{ opacity: 0, y: -25, scale: 1.6 }}
                    transition={{ duration: 1.2 }}
                    className="absolute flex flex-col items-center"
                  >
                    <Heart className="w-3.5 h-3.5 text-rosePink-300 fill-rosePink-300/50" />
                  </motion.div>
                )}
              </div>
              <div className="w-2.5 h-14 bg-gradient-to-b from-white via-rosePink-100 to-rosePink-300 rounded-full border border-white/60 shadow-md" />
            </div>
          ))}
        </div>

        {/* 2-Tier Cake */}
        <div className="relative flex flex-col items-center">
          {/* Top Tier */}
          <div className="w-52 sm:w-64 h-20 rounded-t-3xl bg-gradient-to-b from-white via-rosePink-100/90 to-white flex flex-col items-center justify-between border border-white/80 shadow-2xl relative overflow-hidden p-2">
            <div className="w-full flex justify-around px-3 pt-1">
              {Array.from({ length: 7 }).map((_, idx) => (
                <span
                  key={idx}
                  className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_2px_4px_rgba(248,200,220,0.4)] border border-rosePink-200"
                />
              ))}
            </div>
            <div className="w-full h-2 bg-gradient-to-r from-rosePink-300 via-rosePink-200 to-rosePink-300 rounded-full my-auto opacity-90 shadow-sm" />
            <div className="pb-1">
              <Heart className="w-3.5 h-3.5 text-rosePink-400 fill-rosePink-300/40" />
            </div>
          </div>

          {/* Bottom Tier */}
          <div className="w-72 sm:w-88 h-28 rounded-b-3xl bg-gradient-to-b from-white via-white to-rosePink-100/80 border border-white/90 shadow-2xl relative overflow-hidden flex flex-col justify-between p-3 mt-0.5">
            <div className="w-full h-2.5 bg-gradient-to-r from-rosePink-200 via-white to-rosePink-300 rounded-full shadow-inner" />
            <div className="flex items-center justify-center space-x-3 text-rosePink-400/80 font-cinzel text-xs tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-rosePink-300" />
              <span className="font-semibold text-rosePink-500/90">Pure Happiness</span>
              <Sparkles className="w-3.5 h-3.5 text-rosePink-300" />
            </div>
            <div className="w-full flex justify-around px-4 pb-1">
              {Array.from({ length: 9 }).map((_, idx) => (
                <span key={idx} className="w-2 h-2 rounded-full bg-rosePink-200 shadow-sm" />
              ))}
            </div>
          </div>

          {/* Cake Base */}
          <div className="w-80 sm:w-96 h-4 rounded-full bg-gradient-to-r from-surface via-rosePink-200/30 to-surface border border-white/30 shadow-2xl mt-1 flex items-center justify-center">
            <div className="w-3/4 h-0.5 bg-rosePink-300/40 rounded-full" />
          </div>
        </div>
      </motion.div>

      {/* Message when blown out */}
      <div className="min-h-[60px] flex items-center justify-center mt-6">
        <AnimatePresence>
          {allBlown ? (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="flex items-center space-x-2 px-7 py-3 rounded-full glass-panel-pink border border-rosePink-300/40 text-rosePink-300 text-sm tracking-widest font-cinzel shadow-glow-pink"
            >
              <Heart className="w-4 h-4 text-rosePink-300 fill-rosePink-300" />
              <span>{cakeMessage}</span>
              <Heart className="w-4 h-4 text-rosePink-300 fill-rosePink-300" />
            </motion.div>
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              className="text-xs text-rosePink-300/80 tracking-wider flex items-center space-x-1"
            >
              <span>✦ Tap all 3 candle flames to blow them out</span>
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
