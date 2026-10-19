"use client";

import React from "react";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { AudioPlayer } from "./audio-player";
import { ExperienceStep } from "@/types";
import { cn } from "@/lib/utils";

interface ExperienceNavProps {
  currentStep: ExperienceStep;
  onStepChange: (step: ExperienceStep) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  isUnlocked: boolean;
}

const STEPS_LIST: { id: ExperienceStep; label: string }[] = [
  { id: "intro", label: "Prologue" },
  { id: "lockscreen", label: "Phone" },
  { id: "universe", label: "Universe" },
  { id: "gallery", label: "Memories" },
  { id: "letter", label: "Letter" },
  { id: "finale", label: "Celebration" },
];

export function ExperienceNav({
  currentStep,
  onStepChange,
  isMuted,
  onToggleMute,
  isUnlocked,
}: ExperienceNavProps) {
  const currentIndex = STEPS_LIST.findIndex((s) => s.id === currentStep);

  const handlePrev = () => {
    if (currentIndex > 0) {
      onStepChange(STEPS_LIST[currentIndex - 1].id);
    }
  };

  const handleNext = () => {
    // If on lockscreen and not unlocked yet, we don't skip unless already unlocked
    if (currentStep === "lockscreen" && !isUnlocked) {
      return;
    }
    if (currentIndex < STEPS_LIST.length - 1) {
      onStepChange(STEPS_LIST[currentIndex + 1].id);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 py-3 sm:px-8 sm:py-5 flex items-center justify-between pointer-events-none">
      {/* Left: Previous step control or Replay */}
      <div className="flex items-center gap-2 pointer-events-auto">
        {currentIndex > 0 && (
          <button
            onClick={handlePrev}
            className="glass-pill px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs text-rose-200/90 hover:text-white hover:bg-rose-500/20 transition-all cursor-pointer shadow-md"
            title="Go to previous scene"
          >
            <ChevronLeft size={14} />
            <span className="hidden sm:inline">Back</span>
          </button>
        )}

        {currentStep === "finale" && (
          <button
            onClick={() => onStepChange("intro")}
            className="glass-pill px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs text-rose-200/90 hover:text-white hover:bg-rose-500/20 transition-all cursor-pointer shadow-md"
            title="Replay experience from beginning"
          >
            <RotateCcw size={13} />
            <span>Replay</span>
          </button>
        )}
      </div>

      {/* Center: Step indicators */}
      <div className="hidden md:flex items-center gap-2 glass-pill px-4 py-1.5 rounded-full pointer-events-auto shadow-lg">
        {STEPS_LIST.map((step, idx) => {
          const isActive = step.id === currentStep;
          const isPassed = idx < currentIndex;
          const canClick = isUnlocked || idx <= 1;

          return (
            <button
              key={step.id}
              onClick={() => canClick && onStepChange(step.id)}
              disabled={!canClick}
              className={cn(
                "group flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] transition-all cursor-pointer",
                isActive
                  ? "text-rose-100 font-semibold bg-rose-500/30 shadow-sm"
                  : isPassed
                  ? "text-rose-200/60 hover:text-rose-200"
                  : "text-rose-200/30",
                !canClick && "cursor-not-allowed opacity-30"
              )}
            >
              <span
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-all",
                  isActive
                    ? "bg-rose-300 w-3"
                    : isPassed
                    ? "bg-rose-400/60"
                    : "bg-rose-200/20"
                )}
              />
              <span className="hidden lg:inline">{step.label}</span>
            </button>
          );
        })}
      </div>

      {/* Right: Audio and Next controls */}
      <div className="flex items-center gap-2 pointer-events-auto">
        <AudioPlayer isMuted={isMuted} onToggleMute={onToggleMute} />

        {currentIndex < STEPS_LIST.length - 1 && (isUnlocked || currentStep === "intro") && (
          <button
            onClick={handleNext}
            className="glass-pill px-3 py-1.5 rounded-full flex items-center gap-1 text-xs text-rose-200/90 hover:text-white hover:bg-rose-500/20 transition-all cursor-pointer shadow-md"
            title="Next scene"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight size={14} />
          </button>
        )}
      </div>
    </header>
  );
}
