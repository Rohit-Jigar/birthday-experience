"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Heart, Calendar, RotateCcw, Sparkles } from "lucide-react";
import { birthdayConfig, MemoryItem } from "@/config/birthday";

const MEMORY_BACK_NOTES: Record<string, string> = {
  "1": "A radiant smile that effortlessly brings light into any room. Never lose that genuine warmth and sweet energy.",
  "2": "Some peaceful moments hold more meaning than thousands of spoken words. Unforgettable serenity.",
  "3": "No matter where our paths may lead, this memory remains safe, timeless, and softly cherished.",
  "4": "Laughter that felt like home. A chapter I will always look back on with quiet gratitude and a smile.",
};

interface MemoryCardProps {
  item: MemoryItem;
  index: number;
}

function MemoryCard({ item, index }: MemoryCardProps) {
  const [imgError, setImgError] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const backNote = MEMORY_BACK_NOTES[item.id] || item.caption;

  return (
    <div
      className="perspective-1000 w-full min-h-[380px] sm:min-h-[400px] cursor-pointer select-none"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, delay: 0.1 * index }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: "center center",
        }}
        whileHover={{ y: -6, scale: 1.02 }}
        className="relative w-full h-full rounded-2xl transition-shadow duration-500 will-change-transform"
      >
        {/* ========================================================= */}
        {/* FRONT OF POLAROID */}
        {/* ========================================================= */}
        <div
          style={{ backfaceVisibility: "hidden" }}
          className="w-full h-full glass-panel p-4 sm:p-5 rounded-2xl border border-white/10 hover:border-rosePink-300/40 shadow-2xl text-left flex flex-col justify-between"
        >
          <div>
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-surface mb-4 border border-white/5">
              {imgError ? (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-surface via-background to-rosePink-300/10 text-rosePink-300/70 p-4 text-center">
                  <Heart className="w-8 h-8 mb-2 fill-rosePink-300/30 stroke-[1.5]" />
                  <span className="text-xs font-serif font-medium">{item.title}</span>
                  <span className="text-[10px] text-textSecondary mt-1">{item.date}</span>
                </div>
              ) : (
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 contrast-[1.02]"
                />
              )}
              <div className="absolute top-3 right-3 flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] text-rosePink-200 border border-rosePink-300/20">
                <Calendar className="w-3 h-3 text-rosePink-300" />
                <span>{item.date}</span>
              </div>
            </div>

            <div className="px-1 space-y-1">
              <h3 className="text-base font-serif font-medium text-textPrimary group-hover:text-rosePink-300 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-textSecondary font-light leading-relaxed line-clamp-2">
                {item.caption}
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-white/5 mt-3 flex items-center justify-between text-[11px] text-rosePink-300/70">
            <span className="flex items-center space-x-1">
              <Sparkles className="w-3 h-3" />
              <span>Tap to flip card</span>
            </span>
            <RotateCcw className="w-3 h-3" />
          </div>
        </div>

        {/* ========================================================= */}
        {/* BACK OF POLAROID (Handwritten note & stamp) */}
        {/* ========================================================= */}
        <div
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
          className="absolute inset-0 w-full h-full p-6 sm:p-7 rounded-2xl glass-panel-pink border border-rosePink-300/35 shadow-2xl text-left flex flex-col justify-between overflow-hidden"
        >
          {/* Postcard Header with Heart Stamp */}
          <div className="flex items-start justify-between border-b border-rosePink-300/20 pb-3">
            <div>
              <span className="text-[10px] uppercase tracking-widest font-cinzel text-rosePink-300 font-semibold block">
                Memory Note #{item.id}
              </span>
              <span className="text-xs font-serif text-textSecondary italic">
                {item.date}
              </span>
            </div>

            {/* Vintage Heart Postage Stamp */}
            <div className="w-9 h-11 border-2 border-dashed border-rosePink-300/50 rounded flex flex-col items-center justify-center p-1 bg-surface/50">
              <Heart className="w-4 h-4 fill-rosePink-300 text-rosePink-300" />
              <span className="text-[8px] font-mono text-rosePink-300/80 mt-0.5">POST</span>
            </div>
          </div>

          {/* Handwritten Note Body */}
          <div className="my-auto py-2">
            <p className="text-sm sm:text-base font-serif italic text-rosePink-100/95 leading-relaxed font-light">
              &ldquo;{backNote}&rdquo;
            </p>
            <div className="mt-4 flex items-center space-x-1 text-rosePink-300/60 text-xs font-serif italic">
              <span>— etched in time</span>
              <Heart className="w-2.5 h-2.5 fill-rosePink-300/60 ml-1 inline" />
            </div>
          </div>

          {/* Flip back footer prompt */}
          <div className="pt-3 border-t border-rosePink-300/20 flex items-center justify-between text-[11px] text-rosePink-300">
            <span>Tap to see photo ↻</span>
            <RotateCcw className="w-3 h-3" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function SectionMemories() {
  const { memories } = birthdayConfig;

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 text-center z-10 py-24 overflow-hidden">
      <div className="absolute w-[500px] h-[500px] bg-rosePink-300/8 rounded-full blur-[140px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="mb-14 space-y-2"
      >
        <div className="flex items-center justify-center space-x-2 text-rosePink-300 text-xs tracking-widest uppercase font-cinzel">
          <Heart className="w-3.5 h-3.5 fill-rosePink-300/40" />
          <span>Captured Moments</span>
          <Heart className="w-3.5 h-3.5 fill-rosePink-300/40" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif text-textPrimary font-normal">
          A Few Memories ♡
        </h2>
        <p className="text-xs text-textSecondary max-w-xs mx-auto">
          Tap any card to flip and read the secret memory note on the back.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-4xl">
        {memories.map((item, idx) => (
          <MemoryCard key={item.id} item={item} index={idx} />
        ))}
      </div>
    </section>
  );
}
