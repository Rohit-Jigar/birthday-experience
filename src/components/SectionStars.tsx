"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, Heart } from "lucide-react";
import { birthdayConfig } from "@/config/birthday";

const STAR_POSITIONS = [
  { id: 1, top: "25%", left: "20%", delay: 0 },
  { id: 2, top: "60%", left: "75%", delay: 0.5 },
  { id: 3, top: "35%", left: "80%", delay: 1 },
  { id: 4, top: "70%", left: "25%", delay: 1.5 },
  { id: 5, top: "50%", left: "50%", delay: 2 },
];

export function SectionStars() {
  const { interactiveStars } = birthdayConfig;
  const targetCount = interactiveStars.starCount;
  const [collected, setCollected] = useState<number[]>([]);

  const handleStarClick = (id: number) => {
    if (!collected.includes(id)) {
      setCollected((prev) => [...prev, id]);
    }
  };

  const isCompleted = collected.length >= targetCount;

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 text-center z-10 py-24 overflow-hidden">
      <div className="absolute w-[450px] h-[450px] bg-rosePink-300/10 rounded-full blur-[140px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="mb-8 space-y-2"
      >
        <div className="flex items-center justify-center space-x-2 text-rosePink-300 text-xs tracking-widest uppercase font-cinzel">
          <Star className="w-3.5 h-3.5 fill-rosePink-300/40" />
          <span>Interactive Surprise</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif text-textPrimary font-normal">
          {interactiveStars.title}
        </h2>
        <p className="text-xs text-textSecondary max-w-xs mx-auto">
          {interactiveStars.instruction}
        </p>
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-panel-pink text-xs text-rosePink-300 font-mono mt-2">
          <span>Stars collected:</span>
          <span className="font-bold">
            {collected.length} / {targetCount}
          </span>
        </div>
      </motion.div>

      <div className="relative w-full max-w-lg h-80 sm:h-96 glass-panel rounded-3xl border border-white/15 shadow-2xl overflow-hidden flex items-center justify-center p-6">
        <AnimatePresence mode="wait">
          {isCompleted ? (
            <motion.div
              key="secret-message"
              initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center space-y-4 p-6 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-rosePink-300/20 border border-rosePink-300/40 flex items-center justify-center text-rosePink-300 shadow-glow-pink">
                <Heart className="w-6 h-6 fill-rosePink-300" />
              </div>
              <h3 className="text-xl font-serif text-rosePink-300 font-medium glow-text-pink">
                {interactiveStars.completedTitle}
              </h3>
              <p className="text-sm text-textPrimary/90 font-light leading-relaxed max-w-xs">
                {interactiveStars.hiddenMessage}
              </p>
            </motion.div>
          ) : (
            <React.Fragment key="star-field">
              {STAR_POSITIONS.slice(0, targetCount).map((star) => {
                const isFound = collected.includes(star.id);
                return (
                  <motion.div
                    key={star.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: isFound ? 0 : [1, 1.25, 1],
                      opacity: isFound ? 0 : [0.7, 1, 0.7],
                      y: isFound ? -20 : [0, -10, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: isFound ? 0 : Infinity,
                      ease: "easeInOut",
                      delay: star.delay,
                    }}
                    onClick={() => handleStarClick(star.id)}
                    style={{ top: star.top, left: star.left }}
                    className="absolute cursor-pointer p-3 group z-20"
                  >
                    <div className="relative flex items-center justify-center">
                      <span className="absolute w-8 h-8 rounded-full bg-rosePink-300/40 blur-sm group-hover:scale-150 transition-transform" />
                      <Star className="w-7 h-7 text-rosePink-300 fill-rosePink-300 drop-shadow-[0_0_12px_#F8C8DC] group-hover:scale-110 transition-transform" />
                    </div>
                  </motion.div>
                );
              })}
              <div className="text-xs text-rosePink-200/50 opacity-60 select-none">
                ✦ Tap floating stars to collect them ✦
              </div>
            </React.Fragment>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
