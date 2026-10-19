"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Sparkles, Heart, ArrowRight } from "lucide-react";
import { CandleInteractive } from "./candle-interactive";
import { BIRTHDAY_CONFIG } from "@/config/birthday";
import { Button } from "@/components/ui/button";

interface LetterSectionProps {
  onContinueToFinale: () => void;
  onBlowCandle?: () => void;
  onPlayChime?: () => void;
}

export function LetterSection({
  onContinueToFinale,
  onBlowCandle,
  onPlayChime,
}: LetterSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenLetter = () => {
    if (onPlayChime) onPlayChime();
    setIsOpen(true);
  };

  return (
    <section className="relative w-full min-h-screen py-24 px-4 sm:px-8 flex flex-col items-center justify-center overflow-hidden bg-radial from-[#2A1024] via-[#160D22] to-[#0D0512] select-none">
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-rose-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-3 z-10 mb-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full glass-pill text-xs text-rose-200 border border-rose-300/20 shadow-md"
        >
          <Sparkles size={12} className="text-[#F2D7B0]" />
          <span>Chapter III &bull; A Handwritten Note</span>
        </motion.div>

        <h2 className="text-3xl sm:text-5xl font-serif font-light text-white tracking-tight">
          Words from the Heart
        </h2>
      </div>

      {/* Envelope or Unfolded Letter */}
      <div className="w-full max-w-2xl mx-auto z-10 flex flex-col items-center">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* Closed Envelope with Wax Seal */
            <motion.div
              key="envelope"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.5 }}
              onClick={handleOpenLetter}
              className="group relative w-full max-w-md h-64 sm:h-72 glass-panel rounded-3xl p-6 border border-rose-300/30 shadow-2xl flex flex-col items-center justify-between cursor-pointer hover:border-rose-300/60 transition-all hover:scale-[1.02]"
            >
              {/* Envelope flap lines */}
              <div className="w-full flex items-center justify-between text-xs text-rose-200/60 font-mono uppercase tracking-wider">
                <span>Personal &bull; Confidential</span>
                <span>November 7</span>
              </div>

              {/* Center Wax Seal */}
              <div className="relative flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#6F2947] via-[#C95B7E] to-[#E8A5B8] flex items-center justify-center shadow-lg border-2 border-white/30 group-hover:scale-110 transition-transform">
                  <Heart className="w-8 h-8 text-white fill-white drop-shadow-md" />
                </div>
                <span className="text-xs text-rose-100 font-medium tracking-wide">
                  Tap Wax Seal to Open
                </span>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-rose-300/70">
                <Mail size={13} />
                <span>Written with gratitude &amp; respect</span>
              </div>
            </motion.div>
          ) : (
            /* Unfolded Parchment Letter */
            <motion.div
              key="letter-content"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="w-full rounded-3xl bg-[#FFF9F5] text-[#2C1820] p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-[#EAD5C8] space-y-6 relative overflow-hidden"
            >
              {/* Subtle vintage texture overlay */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#E8A5B8]/20 to-transparent pointer-events-none rounded-bl-full" />

              {/* Salutation */}
              <div className="border-b border-[#E8D5C8] pb-4">
                <h3 className="text-xl sm:text-2xl font-serif font-medium text-[#4A1D2F]">
                  {BIRTHDAY_CONFIG.letter.salutation}
                </h3>
                <span className="text-xs text-[#8A5A6D] font-mono tracking-wider">
                  {BIRTHDAY_CONFIG.birthdayDate}
                </span>
              </div>

              {/* Body Paragraphs */}
              <div className="space-y-4 font-serif text-sm sm:text-base leading-relaxed text-[#381B27]">
                {BIRTHDAY_CONFIG.letter.paragraphs.map((p, idx) => (
                  <p
                    key={idx}
                    className={
                      p.includes("रिश्ते")
                        ? "text-base sm:text-lg font-medium text-[#6F2947] italic my-3 pl-3 border-l-2 border-[#C95B7E]"
                        : ""
                    }
                  >
                    {p}
                  </p>
                ))}
              </div>

              {/* Highlight Box: A Gentle Reflection */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#F8EDE6] border border-[#E8D0C3] space-y-1.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#7B2E4A]">
                  {BIRTHDAY_CONFIG.letter.favoriteMemoryTitle}
                </span>
                <p className="text-xs sm:text-sm font-light text-[#4A2533] leading-relaxed">
                  {BIRTHDAY_CONFIG.letter.favoriteMemoryText}
                </p>
              </div>

              {/* Birthday Wish */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#FFF2E6] border border-[#F2D7B0] space-y-1.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#A25F25]">
                  {BIRTHDAY_CONFIG.letter.birthdayWishTitle}
                </span>
                <p className="text-xs sm:text-sm font-light text-[#4A2533] leading-relaxed">
                  {BIRTHDAY_CONFIG.letter.birthdayWishText}
                </p>
              </div>

              {/* Soundtrack Tag: Maan Panu - The Last Letter */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-[#F4E9EE] border border-[#E0CBD5] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#6F2947] text-white flex items-center justify-center">
                    <Heart size={14} className="fill-white" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#6F2947] font-semibold block">
                      Soundtrack of this Letter
                    </span>
                    <span className="text-xs text-[#381B27] font-medium">
                      Maan Panu — The Last Letter
                    </span>
                  </div>
                </div>
                <a
                  href="https://www.youtube.com/watch?v=kz0kbFmB7FU"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-[#6F2947] hover:underline flex items-center gap-1"
                >
                  Listen on YouTube &rarr;
                </a>
              </div>

              {/* Sign-off */}
              <div className="pt-2 border-t border-[#E8D5C8] flex flex-col items-end">
                <span className="font-serif italic text-base text-[#4A1D2F]">
                  {BIRTHDAY_CONFIG.letter.closing}
                </span>
                <span className="text-xs text-[#8A5A6D] mt-0.5">
                  {BIRTHDAY_CONFIG.letter.signOff}
                </span>
              </div>

              {/* Interactive Birthday Candle */}
              <div className="pt-4 border-t border-[#E8D5C8]/80">
                <CandleInteractive onBlowCandle={onBlowCandle} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Button to proceed to finale */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 z-10"
        >
          <Button
            onClick={onContinueToFinale}
            variant="champagne"
            size="lg"
            className="px-8 py-3.5 text-sm sm:text-base font-medium rounded-full shadow-2xl hover:scale-105 transition-transform"
          >
            <span>Proceed to Birthday Celebration</span>
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </motion.div>
      )}
    </section>
  );
}
