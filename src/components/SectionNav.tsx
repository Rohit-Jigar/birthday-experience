"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

interface SectionNavProps {
  activeSection: number;
  totalSections?: number;
}

export function SectionNav({ activeSection, totalSections = 9 }: SectionNavProps) {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeStr = String(activeSection).padStart(2, "0");
  const totalStr = String(totalSections).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: hasScrolled || activeSection > 1 ? 1 : 0.4 }}
      transition={{ duration: 0.6 }}
      className="fixed top-6 right-6 md:top-8 md:right-10 z-40 flex items-center space-x-3 pointer-events-none select-none"
    >
      <div className="flex flex-col items-center space-y-1">
        {Array.from({ length: totalSections }).map((_, idx) => {
          const sectionNum = idx + 1;
          return (
            <span
              key={idx}
              className={`w-1 transition-all duration-500 rounded-full ${
                sectionNum === activeSection
                  ? "h-4 bg-rosePink-300 shadow-[0_0_10px_rgba(248,200,220,0.9)]"
                  : "h-1 bg-white/10"
              }`}
            />
          );
        })}
      </div>
      <div className="flex items-center text-xs tracking-widest font-mono text-textSecondary bg-surface/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-rosePink-300/20">
        <span className="text-rosePink-300 font-semibold">{activeStr}</span>
        <span className="opacity-40 mx-1">/</span>
        <span className="opacity-60">{totalStr}</span>
      </div>
    </motion.div>
  );
}
