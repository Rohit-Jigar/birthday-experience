"use client";

import React, { useMemo } from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface Petal {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  rotateZ: number;
  opacity: number;
}

export function FloatingPetals({ count = 20 }: { count?: number }) {
  const prefersReducedMotion = useReducedMotion();

  const petals = useMemo<Petal[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage across screen
      size: Math.random() * 14 + 10, // 10px to 24px
      duration: Math.random() * 10 + 12, // 12s to 22s
      delay: Math.random() * 8,
      rotateZ: Math.random() * 360,
      opacity: Math.random() * 0.4 + 0.3, // 0.3 to 0.7
    }));
  }, [count]);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          initial={{
            y: "-10vh",
            x: `${petal.x}vw`,
            rotate: 0,
            opacity: 0,
          }}
          animate={{
            y: "110vh",
            x: [
              `${petal.x}vw`,
              `${petal.x + (petal.id % 2 === 0 ? 6 : -6)}vw`,
              `${petal.x}vw`,
            ],
            rotate: [petal.rotateZ, petal.rotateZ + 180, petal.rotateZ + 360],
            opacity: [0, petal.opacity, petal.opacity * 0.8, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            width: petal.size,
            height: petal.size * 1.3,
          }}
          className="absolute"
        >
          {/* Stylized Rose Petal SVG */}
          <svg
            viewBox="0 0 30 40"
            className="w-full h-full drop-shadow-[0_2px_8px_rgba(232,165,184,0.4)]"
            fill="none"
          >
            <path
              d="M15 2 C25 8, 30 22, 22 34 C16 42, 6 36, 4 28 C2 18, 7 6, 15 2 Z"
              fill="url(#petalGrad)"
            />
            <defs>
              <linearGradient id="petalGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#E8A5B8" stopOpacity="0.85" />
                <stop offset="60%" stopColor="#C95B7E" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#6F2947" stopOpacity="0.6" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
