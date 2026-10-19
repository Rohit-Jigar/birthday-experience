"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function fireCelebrationConfetti() {
  const count = 120;
  const defaults = {
    origin: { y: 0.7 },
    colors: ["#E8A5B8", "#F2D7B0", "#FFF5EE", "#C95B7E"],
  };

  confetti({
    ...defaults,
    particleCount: Math.floor(count * 0.4),
    spread: 60,
    startVelocity: 35,
  });

  confetti({
    ...defaults,
    particleCount: Math.floor(count * 0.3),
    spread: 100,
    startVelocity: 45,
  });

  confetti({
    ...defaults,
    particleCount: Math.floor(count * 0.3),
    spread: 120,
    startVelocity: 55,
  });
}

export function CelebrationConfettiTrigger() {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const timer = setTimeout(() => {
      fireCelebrationConfetti();
    }, 600);
    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  return null;
}
