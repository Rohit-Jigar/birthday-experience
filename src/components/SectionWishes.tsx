"use client";

import React from "react";
import { motion } from "motion/react";
import { Sparkles, Heart } from "lucide-react";
import { birthdayConfig } from "@/config/birthday";

export function SectionWishes() {
  const { wishes, finalWishQuote } = birthdayConfig;

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 text-center z-10 py-24 overflow-hidden">
      <div className="absolute w-[500px] h-[500px] bg-rosePink-300/8 rounded-full blur-[150px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="mb-16 space-y-2"
      >
        <div className="flex items-center justify-center space-x-2 text-rosePink-300 text-xs tracking-widest uppercase font-cinzel">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Whispers of Hope</span>
          <Sparkles className="w-3.5 h-3.5" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif text-textPrimary font-normal">
          Things I Wish For You
        </h2>
      </motion.div>

      <div className="space-y-10 max-w-xl w-full">
        {wishes.map((wish, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1, delay: 0.15 * idx }}
            className="p-6 rounded-2xl glass-panel border border-white/10 hover:border-rosePink-300/30 transition-colors"
          >
            <p className="text-lg sm:text-xl font-serif font-light text-textPrimary/90 italic tracking-wide">
              &quot;{wish}&quot;
            </p>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="p-8 sm:p-10 rounded-3xl glass-panel-pink border border-rosePink-300/40 shadow-glow-pink mt-12"
        >
          <div className="flex justify-center mb-3">
            <Heart className="w-5 h-5 text-rosePink-300 fill-rosePink-300/40" />
          </div>
          <p className="text-xl sm:text-2xl font-serif text-rosePink-200 font-normal italic leading-relaxed glow-text-pink">
            &quot;{finalWishQuote}&quot;
          </p>
        </motion.div>
      </div>
    </section>
  );
}
