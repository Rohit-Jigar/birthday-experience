"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Delete, Lock, CheckCircle2 } from "lucide-react";
import { BIRTHDAY_CONFIG } from "@/config/birthday";

interface KeypadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  onTapSound?: () => void;
  onUnlockSound?: () => void;
  onErrorSound?: () => void;
}

const KEYPAD_BUTTONS = [
  { digit: "1", sub: "" },
  { digit: "2", sub: "A B C" },
  { digit: "3", sub: "D E F" },
  { digit: "4", sub: "G H I" },
  { digit: "5", sub: "J K L" },
  { digit: "6", sub: "M N O" },
  { digit: "7", sub: "P Q R S" },
  { digit: "8", sub: "T U V" },
  { digit: "9", sub: "W X Y Z" },
];

export function KeypadModal({
  isOpen,
  onClose,
  onSuccess,
  onTapSound,
  onUnlockSound,
  onErrorSound,
}: KeypadModalProps) {
  const [pin, setPin] = useState<string>("");
  const [isShaking, setIsShaking] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleDigit = useCallback(
    (digit: string) => {
      if (pin.length >= 4 || isSuccess) return;

      if (onTapSound) onTapSound();
      const nextPin = pin + digit;
      setPin(nextPin);
      setErrorMessage("");

      if (nextPin.length === 4) {
        if (nextPin === BIRTHDAY_CONFIG.passcode) {
          setIsSuccess(true);
          if (onUnlockSound) onUnlockSound();
          setTimeout(() => {
            onSuccess();
          }, 600);
        } else {
          // Wrong passcode
          setIsShaking(true);
          setErrorMessage("Incorrect passcode. Try: 0712");
          if (onErrorSound) onErrorSound();
          setTimeout(() => {
            setIsShaking(false);
            setPin("");
          }, 500);
        }
      }
    },
    [pin, isSuccess, onSuccess, onTapSound, onUnlockSound, onErrorSound]
  );

  const handleDelete = useCallback(() => {
    if (onTapSound) onTapSound();
    setPin((prev) => prev.slice(0, -1));
    setErrorMessage("");
  }, [onTapSound]);

  // Keyboard accessibility
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= "0" && e.key <= "9") {
        handleDigit(e.key);
      } else if (e.key === "Backspace") {
        handleDelete();
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleDigit, handleDelete, onClose]);

  // Reset state when opening
  useEffect(() => {
    if (isOpen) {
      setPin("");
      setIsSuccess(false);
      setIsShaking(false);
      setErrorMessage("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
        animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
        className="absolute inset-0 z-40 flex flex-col items-center justify-between py-12 px-6 bg-[#160D22]/85 text-white select-none"
      >
        {/* Top Header */}
        <div className="flex flex-col items-center gap-3 pt-4">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/15">
            {isSuccess ? (
              <CheckCircle2 size={20} className="text-emerald-400 animate-pulse" />
            ) : (
              <Lock size={18} className="text-rose-200" />
            )}
          </div>
          <span className="text-base font-medium tracking-wide text-white/90">
            {isSuccess ? "Unlocked" : "Enter Passcode"}
          </span>

          {/* 4 Dots indicator */}
          <motion.div
            animate={isShaking ? { x: [-12, 12, -8, 8, -4, 4, 0] } : {}}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-4 my-2"
          >
            {[0, 1, 2, 3].map((index) => {
              const filled = pin.length > index;
              return (
                <div
                  key={index}
                  className={`w-3.5 h-3.5 rounded-full border transition-all duration-200 ${
                    filled
                      ? "bg-rose-300 border-rose-200 scale-110 shadow-[0_0_12px_rgba(232,165,184,0.9)]"
                      : "border-white/30 bg-transparent"
                  }`}
                />
              );
            })}
          </motion.div>

          {/* Error Message */}
          <div className="h-4">
            {errorMessage && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-rose-300 font-medium tracking-wide"
              >
                {errorMessage}
              </motion.span>
            )}
          </div>
        </div>

        {/* Number Keypad Grid */}
        <div className="w-full max-w-[280px] grid grid-cols-3 gap-y-4 gap-x-5 justify-items-center">
          {KEYPAD_BUTTONS.map((item) => (
            <button
              key={item.digit}
              onClick={() => handleDigit(item.digit)}
              className="w-18 h-18 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 border border-white/10 flex flex-col items-center justify-center transition-all active:scale-95 cursor-pointer shadow-md"
            >
              <span className="text-2xl font-light leading-none text-white">{item.digit}</span>
              {item.sub && (
                <span className="text-[9px] font-semibold tracking-widest text-white/50 mt-1 uppercase">
                  {item.sub}
                </span>
              )}
            </button>
          ))}

          {/* Bottom row: empty/cancel, 0, delete */}
          <button
            onClick={onClose}
            className="w-18 h-18 rounded-full flex items-center justify-center text-xs font-medium text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={() => handleDigit("0")}
            className="w-18 h-18 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 border border-white/10 flex flex-col items-center justify-center transition-all active:scale-95 cursor-pointer shadow-md"
          >
            <span className="text-2xl font-light leading-none text-white">0</span>
          </button>

          <button
            onClick={handleDelete}
            className="w-18 h-18 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
            aria-label="Delete digit"
          >
            <Delete size={20} />
          </button>
        </div>

        {/* Bottom hint */}
        <div className="text-center pt-2">
          <span className="text-[11px] text-white/40 tracking-wider">
            Birthday Passcode &bull; 0712
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
