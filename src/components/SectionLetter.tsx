"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Mail, MailOpen, ArrowRight } from "lucide-react";
import { birthdayConfig } from "@/config/birthday";

export function SectionLetter() {
  const { letter } = birthdayConfig;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 text-center z-10 py-20 overflow-hidden">
      <div className="absolute w-[420px] h-[420px] bg-rosePink-300/10 rounded-full blur-[140px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="mb-8 space-y-2"
      >
        <div className="flex items-center justify-center space-x-2 text-rosePink-300 text-xs tracking-widest uppercase font-cinzel">
          <Heart className="w-3.5 h-3.5 fill-rosePink-300/30" />
          <span>Personal Note</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif text-textPrimary font-normal">
          {letter.title}
        </h2>
      </motion.div>

      <div className="w-full max-w-lg min-h-[380px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="letter"
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full p-8 sm:p-10 rounded-3xl glass-panel border border-white/15 shadow-2xl text-left relative overflow-hidden will-change-transform"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center space-x-2 text-rosePink-300">
                  <MailOpen className="w-4 h-4" />
                  <span className="text-xs uppercase tracking-widest font-cinzel font-semibold">
                    Unsealed Letter
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-[10px] uppercase tracking-widest text-textSecondary hover:text-rosePink-300 transition-colors"
                >
                  Close ×
                </button>
              </div>

              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg sm:text-xl font-serif text-rosePink-300 mb-4 glow-text-pink"
              >
                {letter.greeting}
              </motion.h3>

              <div className="space-y-4 text-sm sm:text-base text-textPrimary/90 font-light leading-relaxed">
                {letter.paragraphs.map((p, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + 0.2 * idx }}
                  >
                    {p}
                  </motion.p>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + 0.2 * letter.paragraphs.length }}
                className="mt-8 pt-4 border-t border-white/10 flex flex-col items-end text-right space-y-1"
              >
                <p className="text-xs text-textSecondary italic">{letter.closing}</p>
                <p className="text-sm font-serif text-rosePink-300 font-medium">
                  {letter.sender}
                </p>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="envelope"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -15 }}
              transition={{ duration: 0.4 }}
              onClick={() => setIsOpen(true)}
              className="group cursor-pointer w-full p-8 rounded-3xl glass-panel-pink border border-rosePink-300/30 hover:border-rosePink-300/60 shadow-glow-pink transition-all duration-500 flex flex-col items-center justify-center space-y-6"
            >
              <div className="w-16 h-16 rounded-full bg-rosePink-300/15 flex items-center justify-center text-rosePink-300 group-hover:scale-110 group-hover:bg-rosePink-300/25 transition-all duration-300">
                <Mail className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium tracking-wider text-textPrimary">
                  A letter written for your special day
                </p>
                <p className="text-xs text-textSecondary font-light">Tap below to unseal &amp; read</p>
              </div>

              <button className="flex items-center space-x-2 px-7 py-2.5 rounded-full bg-rosePink-300/20 hover:bg-rosePink-300/30 border border-rosePink-300/40 text-rosePink-300 text-xs tracking-widest uppercase transition-all duration-300 shadow-sm">
                <span>Open it</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
