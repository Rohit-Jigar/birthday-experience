"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import { Sparkles, Flame, Heart, Mic, MicOff } from "lucide-react";
import { birthdayConfig } from "@/config/birthday";

export function SectionCake() {
  const { cakeMessage } = birthdayConfig;
  const [candles, setCandles] = useState([true, true, true]);
  const [hasCelebrated, setHasCelebrated] = useState(false);
  const [isListeningMic, setIsListeningMic] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const allLit = candles.every((c) => c);
  const allBlown = candles.every((c) => !c);

  useEffect(() => {
    if (allLit && !hasCelebrated) {
      setHasCelebrated(true);
      confetti({
        particleCount: 40,
        spread: 70,
        origin: { y: 0.65 },
        colors: ["#F8C8DC", "#FFFFFF", "#E6C896", "#FCE4EC"],
        disableForReducedMotion: true,
      });
    }
  }, [allLit, hasCelebrated]);

  // Clean up mic stream on unmount
  useEffect(() => {
    return () => {
      stopMicListening();
    };
  }, []);

  const stopMicListening = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== "closed") {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    setIsListeningMic(false);
  };

  const startMicListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      const microphone = audioCtx.createMediaStreamSource(stream);
      microphone.connect(analyser);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      setIsListeningMic(true);

      const checkBlow = () => {
        if (!streamRef.current) return;
        analyser.getByteFrequencyData(dataArray);

        // Calculate average volume
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const average = sum / bufferLength;

        // Threshold for air blowing sound
        if (average > 55) {
          // Blow out all candles!
          blowAllCandles();
          stopMicListening();
          return;
        }

        requestAnimationFrame(checkBlow);
      };

      requestAnimationFrame(checkBlow);
    } catch (err) {
      console.warn("Microphone access denied or unavailable", err);
      setIsListeningMic(false);
    }
  };

  const blowAllCandles = () => {
    setCandles([false, false, false]);
    confetti({
      particleCount: 50,
      spread: 90,
      origin: { y: 0.55 },
      colors: ["#F8C8DC", "#FFFFFF", "#E6C896"],
      ticks: 150,
      gravity: 0.8,
    });
  };

  const toggleCandle = (index: number) => {
    setCandles((prev) => {
      const updated = [...prev];
      const willBeLit = !updated[index];
      updated[index] = willBeLit;
      if (!willBeLit) {
        confetti({
          particleCount: 15,
          spread: 40,
          origin: { y: 0.55 },
          colors: ["#F8C8DC", "#FFFFFF", "#FCE4EC"],
          ticks: 120,
          gravity: 0.8,
        });
      }
      return updated;
    });
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 text-center z-10 py-20 overflow-hidden">
      <div className="absolute w-96 h-96 bg-rosePink-300/12 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="mb-8 space-y-2"
      >
        <div className="flex items-center justify-center space-x-2 text-rosePink-300 text-xs tracking-widest uppercase font-cinzel">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Celebrate the Moment</span>
          <Sparkles className="w-3.5 h-3.5" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif text-textPrimary font-normal">
          {allBlown ? "Wish Granted ♡" : "Make A Secret Wish"}
        </h2>
        <p className="text-xs sm:text-sm text-textSecondary max-w-xs mx-auto font-light">
          {allBlown
            ? "Your wish has been sent to the stars."
            : "Tap each flame or blow into your mic to extinguish."}
        </p>

        {/* Microphone blow button option */}
        {!allBlown && (
          <div className="pt-2">
            <button
              onClick={isListeningMic ? stopMicListening : startMicListening}
              className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-mono transition-all duration-300 ${
                isListeningMic
                  ? "bg-rosePink-300/30 text-rosePink-200 border border-rosePink-300/60 shadow-glow-pink animate-pulse"
                  : "bg-surface/70 text-textSecondary hover:text-textPrimary border border-white/10"
              }`}
            >
              {isListeningMic ? (
                <>
                  <Mic className="w-3 h-3 text-rosePink-300 animate-bounce" />
                  <span>Listening... Blow gently into your mic!</span>
                </>
              ) : (
                <>
                  <MicOff className="w-3 h-3 text-textSecondary" />
                  <span>Tap to enable Mic Blow</span>
                </>
              )}
            </button>
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 90, damping: 18 }}
        className="relative flex flex-col items-center justify-center my-6 select-none will-change-transform"
      >
        {/* Candles */}
        <div className="flex items-center space-x-9 sm:space-x-14 mb-2 z-20">
          {candles.map((isLit, idx) => (
            <div key={idx} className="flex flex-col items-center group">
              <div
                onClick={() => toggleCandle(idx)}
                className="relative flex items-center justify-center w-10 h-12 cursor-pointer"
              >
                <AnimatePresence>
                  {isLit && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: [1, 1.15, 1], opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="relative flex flex-col items-center"
                    >
                      <span className="absolute w-7 h-9 rounded-full bg-rosePink-300/40 blur-md animate-pulse" />
                      <Flame className="w-7 h-8 text-rosePink-300 fill-rosePink-300 drop-shadow-[0_0_12px_#F8C8DC]" />
                    </motion.div>
                  )}
                </AnimatePresence>
                {!isLit && (
                  <motion.div
                    initial={{ opacity: 1, y: 0, scale: 0.8 }}
                    animate={{ opacity: 0, y: -25, scale: 1.6 }}
                    transition={{ duration: 1.2 }}
                    className="absolute flex flex-col items-center"
                  >
                    <Heart className="w-3.5 h-3.5 text-rosePink-300 fill-rosePink-300/50" />
                  </motion.div>
                )}
              </div>
              <div className="w-2.5 h-14 bg-gradient-to-b from-white via-rosePink-100 to-rosePink-300 rounded-full border border-white/60 shadow-md" />
            </div>
          ))}
        </div>

        {/* Cake Tier 1 */}
        <div className="relative w-64 sm:w-80 h-16 rounded-t-2xl glass-panel-pink border-t border-x border-rosePink-300/40 shadow-glow-pink flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-rosePink-300/10 via-white/10 to-rosePink-300/10 animate-pulse" />
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-champagne-300 via-rosePink-300 to-champagne-300 opacity-60" />
          <span className="text-[11px] sm:text-xs font-serif italic text-rosePink-200 tracking-wider">
            {allBlown ? "May all your silent wishes come true ♡" : "A special birthday dedication"}
          </span>
        </div>

        {/* Cake Tier 2 */}
        <div className="relative w-72 sm:w-96 h-20 rounded-b-2xl glass-panel border border-white/15 shadow-2xl flex items-center justify-center overflow-hidden -mt-1">
          <div className="absolute inset-0 bg-surface/80" />
          <div className="relative z-10 px-4 text-center">
            <p className="text-xs sm:text-sm font-serif text-rosePink-100/90 italic max-w-xs leading-relaxed">
              {cakeMessage}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
