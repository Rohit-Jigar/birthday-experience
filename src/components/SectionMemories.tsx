"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Heart, Calendar } from "lucide-react";
import { birthdayConfig, MemoryItem } from "@/config/birthday";

interface MemoryCardProps {
  item: MemoryItem;
  index: number;
}

function MemoryCard({ item, index }: MemoryCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: 0.15 * index }}
      whileHover={{ y: -8, scale: 1.02, rotate: 0 }}
      style={{ rotate: `${index % 2 === 0 ? -1.5 : 1.5}deg` }}
      className="group glass-panel p-4 sm:p-5 rounded-2xl border border-white/10 hover:border-rosePink-300/40 shadow-2xl text-left transition-all duration-500 cursor-pointer relative"
    >
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
        <p className="text-xs text-textSecondary font-light leading-relaxed">{item.caption}</p>
      </div>
    </motion.div>
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
          Snapshots of happiness, laughter, and timeless chapters.
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
