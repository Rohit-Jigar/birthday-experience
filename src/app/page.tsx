"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ExperienceStep } from "@/types";
import { ExperienceNav } from "@/components/ui/experience-nav";
import { CinematicIntro } from "@/components/intro/cinematic-intro";
import { LockScreen } from "@/components/phone/lock-screen";
import { RomanticScene } from "@/components/scenes/romantic-scene";
import { PhotoGallery } from "@/components/gallery/photo-gallery";
import { LetterSection } from "@/components/letter/letter-section";
import { FinalScene } from "@/components/birthday/final-scene";
import { useSoundFx } from "@/hooks/use-sound-fx";
import { BIRTHDAY_CONFIG } from "@/config/birthday";

export default function BirthdayPage() {
  const [currentStep, setCurrentStep] = useState<ExperienceStep>("intro");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isMuted, setIsMuted] = useState(BIRTHDAY_CONFIG.audio.defaultMuted);

  const soundFx = useSoundFx(isMuted);

  const handleUnlockSuccess = () => {
    setIsUnlocked(true);
    soundFx.playUnlock();
    // Transition into 3D romantic universe
    setTimeout(() => {
      setCurrentStep("universe");
    }, 400);
  };

  const handleStepChange = (step: ExperienceStep) => {
    soundFx.playChime();
    setCurrentStep(step);
  };

  return (
    <main className="relative w-full min-h-screen bg-[#160D22] text-[#FFF5EE] overflow-x-hidden">
      {/* Global Navigation Header with Step Tracker and Audio Controls */}
      <ExperienceNav
        currentStep={currentStep}
        onStepChange={handleStepChange}
        isMuted={isMuted}
        onToggleMute={() => setIsMuted((prev) => !prev)}
        isUnlocked={isUnlocked}
      />

      {/* Main Experience Scene Switcher */}
      <AnimatePresence mode="wait">
        {currentStep === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6 }}
            className="w-full min-h-screen"
          >
            <CinematicIntro
              onContinue={() => setCurrentStep("lockscreen")}
              onPlayChime={soundFx.playChime}
            />
          </motion.div>
        )}

        {currentStep === "lockscreen" && (
          <motion.div
            key="lockscreen"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.5 }}
            className="w-full min-h-screen"
          >
            <LockScreen
              onUnlockSuccess={handleUnlockSuccess}
              onTapSound={soundFx.playTap}
              onUnlockSound={soundFx.playUnlock}
              onErrorSound={soundFx.playError}
            />
          </motion.div>
        )}

        {currentStep === "universe" && (
          <motion.div
            key="universe"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.7 }}
            className="w-full min-h-screen"
          >
            <RomanticScene
              onExploreGallery={() => {
                soundFx.playChime();
                setCurrentStep("gallery");
              }}
            />
          </motion.div>
        )}

        {currentStep === "gallery" && (
          <motion.div
            key="gallery"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="w-full min-h-screen"
          >
            <PhotoGallery
              onContinueToLetter={() => {
                soundFx.playChime();
                setCurrentStep("letter");
              }}
              onPlayChime={soundFx.playChime}
            />
          </motion.div>
        )}

        {currentStep === "letter" && (
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="w-full min-h-screen"
          >
            <LetterSection
              onContinueToFinale={() => {
                soundFx.playChime();
                setCurrentStep("finale");
              }}
              onBlowCandle={soundFx.playCandleBlow}
              onPlayChime={soundFx.playChime}
            />
          </motion.div>
        )}

        {currentStep === "finale" && (
          <motion.div
            key="finale"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="w-full min-h-screen"
          >
            <FinalScene
              onReplay={() => {
                soundFx.playChime();
                setCurrentStep("intro");
              }}
              onGoToGallery={() => {
                soundFx.playChime();
                setCurrentStep("gallery");
              }}
              onPlayChime={soundFx.playChime}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
