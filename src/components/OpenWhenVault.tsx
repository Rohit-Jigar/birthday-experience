"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Sparkles, X, MailOpen } from "lucide-react";
import { triggerHaptic } from "@/utils/haptics";

interface SecretLetter {
  id: string;
  badge: string;
  title: string;
  icon: string;
  hindiQuote: string;
  body: string;
  signoff: string;
}

const SECRET_LETTERS: SecretLetter[] = [
  {
    id: "smile",
    badge: "Gentle Reminder",
    title: "Open when you need a quiet smile",
    icon: "🌸",
    hindiQuote: "“मुस्कुराते रहिए, क्योंकि आपकी मुस्कान में एक सुकून है।”",
    body: "Your smile has an effortless, genuine warmth that brings light into any room, even on ordinary days. When things feel exhausting or heavy, pause for just a moment, take a deep breath, and remember: you are deeply appreciated simply for being who you are.",
    signoff: "Keep that light alive, always ♡",
  },
  {
    id: "quiet",
    badge: "Sanctuary of Calm",
    title: "Open when the world feels too loud",
    icon: "🌙",
    hindiQuote: "“सुकून भी एक तोहफ़ा है, जिसे कभी-कभी खुद को देना पड़ता है।”",
    body: "You don't have to carry every burden or solve everything all at once. It's completely okay to step back, silence the noise, and give yourself permission to simply rest. Some of the kindest moments in life are the quiet ones you give yourself.",
    signoff: "Take care of your peace ✦",
  },
  {
    id: "memories",
    badge: "Timeless Chapter",
    title: "Open when you miss old conversations",
    icon: "☕",
    hindiQuote: "“कुछ रिश्ते खत्म नहीं होते, बस बात करना बंद हो जाती है।”",
    body: "Meaningful memories never truly expire; they stay warm, silent, and treasured within our hearts. Whenever you happen to look back on past chapters, know with certainty that there is only respect, gratitude, and genuine goodwill on this side.",
    signoff: "Always wishing you the very best 🌹",
  },
];

export function OpenWhenVault() {
  const [activeLetter, setActiveLetter] = useState<SecretLetter | null>(null);

  const handleOpen = (letter: SecretLetter) => {
    triggerHaptic("medium");
    setActiveLetter(letter);
  };

  const handleClose = () => {
    triggerHaptic("light");
    setActiveLetter(null);
  };

  return (
    <div className="w-full mt-10 pt-8 border-t border-white/10">
      <div className="flex items-center justify-center space-x-2 text-rosePink-300 text-xs tracking-widest uppercase font-cinzel mb-2">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Secret Vault • For The Days Ahead</span>
        <Sparkles className="w-3.5 h-3.5" />
      </div>

      <p className="text-xs text-textSecondary font-light text-center max-w-sm mx-auto mb-6">
        Three sealed miniature letters. Unseal them whenever you need these words.
      </p>

      {/* 3 Mini Envelopes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 w-full">
        {SECRET_LETTERS.map((letter) => (
          <motion.button
            key={letter.id}
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleOpen(letter)}
            className="group relative flex flex-col items-center justify-between p-4 sm:p-5 rounded-2xl glass-panel-pink border border-rosePink-300/25 hover:border-rosePink-300/60 transition-all duration-300 text-center shadow-sm hover:shadow-glow-pink/40"
          >
            <span className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
              {letter.icon}
            </span>

            <span className="text-[10px] uppercase font-cinzel tracking-widest text-rosePink-300/90 mb-1">
              {letter.badge}
            </span>

            <h4 className="text-xs sm:text-sm font-serif text-textPrimary group-hover:text-rosePink-100 font-medium leading-snug">
              {letter.title}
            </h4>

            <div className="mt-3 inline-flex items-center space-x-1.5 text-[10px] uppercase tracking-wider text-rosePink-300 font-semibold pt-2 border-t border-rosePink-300/15 w-full justify-center">
              <span>Unseal</span>
              <Heart className="w-2.5 h-2.5 fill-rosePink-300/60" />
            </div>
          </motion.button>
        ))}
      </div>

      {/* Modal Dialog for Unsealed Letter */}
      <AnimatePresence>
        {activeLetter && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative w-full max-w-md p-7 sm:p-9 rounded-3xl glass-panel border border-rosePink-300/40 shadow-2xl text-left overflow-hidden"
            >
              {/* Top ambient glow */}
              <div className="absolute -top-16 -right-16 w-40 h-40 bg-rosePink-300/20 rounded-full blur-3xl pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-textSecondary hover:text-white transition-colors"
                aria-label="Close letter"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header */}
              <div className="flex items-center space-x-2 text-rosePink-300 mb-2">
                <MailOpen className="w-4 h-4" />
                <span className="text-[11px] uppercase tracking-widest font-cinzel font-semibold">
                  {activeLetter.badge}
                </span>
              </div>

              <h3 className="text-xl font-serif text-textPrimary font-medium mb-3">
                {activeLetter.title}
              </h3>

              {/* Hindi reflection quote */}
              <div className="p-3.5 rounded-xl bg-rosePink-300/10 border border-rosePink-300/20 mb-4">
                <p className="text-xs sm:text-sm font-serif italic text-rosePink-200">
                  {activeLetter.hindiQuote}
                </p>
              </div>

              {/* Body message */}
              <p className="text-sm font-light text-textPrimary/90 leading-relaxed mb-6">
                {activeLetter.body}
              </p>

              {/* Signoff */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs">
                <span className="font-serif italic text-textSecondary">{activeLetter.signoff}</span>
                <button
                  onClick={handleClose}
                  className="px-4 py-1.5 rounded-full bg-rosePink-300/20 hover:bg-rosePink-300/30 text-rosePink-300 font-semibold tracking-wider uppercase text-[10px] transition-colors"
                >
                  Keep in Heart ♡
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
