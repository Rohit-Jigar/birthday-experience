"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Flashlight, Camera, ChevronUp, Lock, Sparkles, Heart } from "lucide-react";
import { DynamicIsland } from "./dynamic-island";
import { KeypadModal } from "./keypad-modal";
import { useDeviceTime } from "@/hooks/use-device-time";
import { BIRTHDAY_CONFIG } from "@/config/birthday";

interface LockScreenProps {
  onUnlockSuccess: () => void;
  onTapSound?: () => void;
  onUnlockSound?: () => void;
  onErrorSound?: () => void;
}

export function LockScreen({
  onUnlockSuccess,
  onTapSound,
  onUnlockSound,
  onErrorSound,
}: LockScreenProps) {
  const { hours, minutes, dayOfWeek } = useDeviceTime();
  const [isKeypadOpen, setIsKeypadOpen] = useState(false);
  const [flashlightOn, setFlashlightOn] = useState(false);

  const handleOpenKeypad = () => {
    if (onTapSound) onTapSound();
    setIsKeypadOpen(true);
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center p-2 sm:p-6 overflow-hidden bg-radial from-[#251025] to-[#0A050E]">
      {/* Ambient background blur circles */}
      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-rose-600/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-700/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Simulated iPhone Frame */}
      <div className="relative w-full max-w-[390px] h-[810px] max-h-[94vh] rounded-[48px] overflow-hidden bg-neutral-950 border-[9px] border-[#2C2735] shadow-[0_25px_70px_rgba(0,0,0,0.85)] flex flex-col justify-between select-none">
        {/* Dynamic Island and Status Bar */}
        <DynamicIsland />

        {/* Wallpaper background: Deep aesthetic gradient with subtle bokeh */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#2B1028] via-[#1A0A20] to-[#0E0613]">
          {/* Subtle starry / bokeh dots */}
          <div className="absolute top-24 left-10 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl" />
          <div className="absolute bottom-40 right-10 w-40 h-40 bg-pink-400/10 rounded-full blur-3xl" />
        </div>

        {/* Lock Icon */}
        <div className="flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/80 text-xs shadow-sm"
          >
            <Lock size={12} className="text-rose-300" />
            <span className="text-[11px] font-medium tracking-wide">Locked</span>
          </motion.div>
        </div>

        {/* Clock & Date Area */}
        <div className="flex flex-col items-center justify-center text-center mt-2 px-6">
          <span className="text-xs sm:text-sm font-medium tracking-wide text-rose-200/90 mb-1">
            {dayOfWeek}, {BIRTHDAY_CONFIG.birthdayDate}
          </span>

          <div className="text-7xl sm:text-8xl font-serif font-extralight tracking-tight text-white/95 leading-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
            {hours}:{minutes}
          </div>
        </div>

        {/* Middle: Romantic Lockscreen Notification Card */}
        <div className="px-5 my-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            onClick={handleOpenKeypad}
            className="group glass-panel rounded-3xl p-4 border border-rose-300/20 shadow-xl cursor-pointer hover:border-rose-300/40 transition-all active:scale-[0.98]"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center shadow-md">
                  <Heart size={13} className="text-white fill-white" />
                </div>
                <span className="text-xs font-semibold text-rose-100/90">A Quiet Note</span>
              </div>
              <span className="text-[10px] text-rose-200/50">now</span>
            </div>

            <p className="text-xs font-medium text-white/90 leading-snug">
              “कुछ रिश्ते खत्म नहीं होते, बस बात करना बंद हो जाती है।”
            </p>
            <p className="text-[11px] text-rose-200/70 mt-1 flex items-center gap-1">
              <Sparkles size={11} className="text-[#F2D7B0]" />
              <span>Tap to unlock with birthday code (0712)</span>
            </p>
          </motion.div>
        </div>

        {/* Bottom Section: Flashlight, Unlock pill, Camera */}
        <div className="pb-8 px-6 flex flex-col items-center gap-6">
          {/* Bottom Flashlight and Camera Quick Controls */}
          <div className="w-full flex items-center justify-between px-2">
            {/* Flashlight button */}
            <button
              onClick={() => setFlashlightOn(!flashlightOn)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-lg ${
                flashlightOn
                  ? "bg-white text-neutral-900 shadow-[0_0_20px_rgba(255,255,255,0.8)]"
                  : "bg-white/10 hover:bg-white/20 text-white border border-white/10"
              }`}
              title="Toggle Flashlight"
            >
              <Flashlight size={20} />
            </button>

            {/* Camera button (opens keypad too) */}
            <button
              onClick={handleOpenKeypad}
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 flex items-center justify-center transition-all cursor-pointer shadow-lg"
              title="Open Memories"
            >
              <Camera size={20} />
            </button>
          </div>

          {/* Swipe / Tap to unlock bar */}
          <div
            onClick={handleOpenKeypad}
            className="flex flex-col items-center gap-1.5 cursor-pointer group"
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronUp size={16} className="text-rose-200/80 group-hover:text-white" />
            </motion.div>
            <span className="text-[11px] font-medium tracking-widest text-rose-200/80 uppercase group-hover:text-white transition-colors">
              Tap or Swipe Up to Unlock
            </span>
            {/* Home indicator bar */}
            <div className="w-32 h-1 bg-white/80 rounded-full mt-1 group-hover:bg-white" />
          </div>
        </div>

        {/* Passcode Keypad Modal Overlay */}
        <KeypadModal
          isOpen={isKeypadOpen}
          onClose={() => setIsKeypadOpen(false)}
          onSuccess={onUnlockSuccess}
          onTapSound={onTapSound}
          onUnlockSound={onUnlockSound}
          onErrorSound={onErrorSound}
        />
      </div>
    </div>
  );
}
