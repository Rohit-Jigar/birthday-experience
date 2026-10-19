"use client";

import React from "react";
import { motion } from "motion/react";
import { Heart, Sparkles } from "lucide-react";
import { BIRTHDAY_CONFIG } from "@/config/birthday";
import { Button } from "@/components/ui/button";

export function SceneFallback({ onExploreGallery }: { onExploreGallery: () => void }) {
  return (
    <div className="relative w-full min-h-[85vh] flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden">
      {/* Background glow */}
      <div className="absolute w-80 h-80 rounded-full bg-rose-500/20 blur-[120px] pointer-events-none" />
      <div className="absolute w-60 h-60 rounded-full bg-[#F2D7B0]/20 blur-[100px] pointer-events-none" />

      {/* Floating 2D glass heart emblem */}
      <motion.div
        animate={{
          y: [-10, 10, -10],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative w-40 h-40 sm:w-52 sm:h-52 rounded-full glass-panel flex items-center justify-center mb-8 border border-rose-300/30 rose-glow"
      >
        <Heart className="w-20 h-20 sm:w-28 sm:h-28 text-rose-300 fill-rose-400/50 drop-shadow-[0_0_25px_rgba(232,165,184,0.9)]" />

        {/* Orbiting rings */}
        <div className="absolute inset-0 rounded-full border border-rose-300/30 animate-spin [animation-duration:20s]" />
        <div className="absolute -inset-4 rounded-full border border-dashed border-[#F2D7B0]/30 animate-spin [animation-duration:30s] [animation-direction:reverse]" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="max-w-md space-y-3 z-10"
      >
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill text-xs text-rose-200 border border-rose-300/20">
          <Sparkles size={12} className="text-[#F2D7B0]" />
          <span>A World of Quiet Wonder</span>
        </span>

        <h2 className="text-2xl sm:text-4xl font-serif text-white font-medium">
          Welcome Inside
        </h2>

        <p className="text-sm text-rose-200/80 leading-relaxed font-light">
          {BIRTHDAY_CONFIG.personalQuote.hindi}
        </p>

        <div className="pt-4">
          <Button onClick={onExploreGallery} variant="champagne" size="lg">
            Explore Memories &amp; Photos &rarr;
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
