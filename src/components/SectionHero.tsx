"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Heart } from "lucide-react";
import { birthdayConfig } from "@/config/birthday";

export function SectionHero() {
  const { recipientName, subtitle, mainPhoto } = birthdayConfig;
  const [imgError, setImgError] = useState(false);

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 text-center z-10 py-20 overflow-hidden">
      <div className="absolute w-[480px] h-[480px] bg-rosePink-300/12 rounded-full blur-[130px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative flex items-center justify-center mb-10 will-change-transform"
      >
        <div className="absolute w-80 h-80 sm:w-[410px] sm:h-[410px] pointer-events-none opacity-50 animate-spin-slow">
          <svg viewBox="0 0 200 200" className="w-full h-full text-rosePink-300">
            <g transform="translate(100, 100)">
              {Array.from({ length: 12 }).map((_, idx) => (
                <path
                  key={idx}
                  d="M 0,-88 C 22,-52 22,-22 0,0 C -22,-22 -22,-52 0,-88 Z"
                  fill={idx % 2 === 0 ? "#F8C8DC" : "#FBF7EF"}
                  fillOpacity="0.18"
                  stroke="currentColor"
                  strokeWidth="0.8"
                  transform={`rotate(${30 * idx})`}
                />
              ))}
              <circle r="72" stroke="#F8C8DC" strokeWidth="0.6" fill="none" opacity="0.4" />
              <circle
                r="85"
                stroke="#FFFFFF"
                strokeWidth="0.4"
                strokeDasharray="3 3"
                fill="none"
                opacity="0.3"
              />
            </g>
          </svg>
        </div>

        <div className="relative w-52 h-52 sm:w-64 sm:h-64 rounded-full p-1.5 glass-panel-pink shadow-glow-pink flex items-center justify-center animate-float-slow">
          <div className="relative w-full h-full rounded-full overflow-hidden border border-rosePink-300/40 bg-surface flex items-center justify-center">
            {imgError ? (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-surface via-background to-rosePink-300/10 text-rosePink-300 p-4">
                <Heart className="w-8 h-8 mb-1 fill-rosePink-300/40" />
                <span className="text-3xl font-serif font-bold tracking-widest text-textPrimary">
                  {recipientName.charAt(0)}
                </span>
                <span className="text-[10px] text-rosePink-200 mt-1 uppercase tracking-widest">
                  {recipientName}
                </span>
              </div>
            ) : (
              <img
                src={mainPhoto}
                alt={recipientName}
                onError={() => setImgError(true)}
                className="w-full h-full object-cover rounded-full filter contrast-[1.03] brightness-95 hover:scale-105 transition-transform duration-700"
              />
            )}
          </div>
          <span className="absolute -top-1 right-5 w-2.5 h-2.5 rounded-full bg-rosePink-300 shadow-[0_0_12px_#F8C8DC] animate-ping opacity-80" />
          <span className="absolute bottom-2 left-7 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#FFFFFF]" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1, delay: 0.2 }}
        className="space-y-3 max-w-md"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-cinzel font-normal tracking-wider text-textPrimary">
          Happy Birthday,{" "}
          <span className="text-rosePink-300 font-serif italic glow-text-pink">
            {recipientName}
          </span>
        </h1>
        <p className="text-xs sm:text-sm text-textSecondary tracking-widest font-light uppercase">
          {subtitle}
        </p>
      </motion.div>
    </section>
  );
}
