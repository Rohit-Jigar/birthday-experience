"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Music,
  Pause,
  Play,
  ListMusic,
  X,
  SkipBack,
  SkipForward,
  VolumeX,
  Volume2,
} from "lucide-react";
import { useAudio } from "@/context/audio-context";
import { birthdayConfig } from "@/config/birthday";

export function FloatingAudioWidget() {
  const {
    isPlaying,
    currentTrackIndex,
    currentTrack,
    togglePlay,
    nextTrack,
    prevTrack,
    selectTrack,
    volume,
    setVolume,
    formatTime,
    currentTime,
    duration,
  } = useAudio();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex items-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative flex items-center space-x-2.5 px-4 py-2.5 rounded-full glass-panel-pink hover:border-rosePink-300/60 transition-all duration-300 shadow-glow-pink text-textPrimary group cursor-pointer"
        >
          <div className="relative flex items-center justify-center w-6 h-6">
            {isPlaying ? (
              <div className="flex items-end justify-between w-4 h-4 space-x-0.5">
                <span className="w-1 bg-rosePink-300 rounded-full animate-[bounce_1s_infinite_100ms] h-full" />
                <span className="w-1 bg-rosePink-300 rounded-full animate-[bounce_1s_infinite_300ms] h-2/3" />
                <span className="w-1 bg-rosePink-300 rounded-full animate-[bounce_1s_infinite_200ms] h-4/5" />
              </div>
            ) : (
              <Music className="w-4 h-4 text-rosePink-300 group-hover:rotate-12 transition-transform" />
            )}
          </div>
          <span className="text-xs font-medium tracking-wide text-textPrimary max-w-[100px] sm:max-w-[140px] truncate">
            {currentTrack.title}
          </span>
          <div
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            className="p-1.5 rounded-full bg-rosePink-300/20 hover:bg-rosePink-300/35 text-rosePink-300 transition-colors ml-1"
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 fill-rosePink-300" />
            ) : (
              <Play className="w-3.5 h-3.5 ml-0.5 fill-rosePink-300" />
            )}
          </div>
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-20 right-6 z-50 w-[90vw] max-w-sm glass-panel p-5 rounded-2xl border border-white/15 shadow-2xl"
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <ListMusic className="w-4 h-4 text-rosePink-300" />
                <h4 className="text-xs tracking-wider uppercase font-semibold text-rosePink-300">
                  Audio Experience
                </h4>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-textSecondary hover:text-textPrimary transition-colors rounded-full hover:bg-white/5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center space-x-3 bg-surface/80 p-3 rounded-xl border border-white/5 mb-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-rosePink-300/40 bg-black flex items-center justify-center">
                <div
                  className={`w-full h-full rounded-full bg-cover bg-center ${isPlaying ? "animate-spin" : ""}`}
                  style={{ backgroundImage: `url(${currentTrack.cover})` }}
                />
                <div className="absolute w-3 h-3 bg-background rounded-full border border-rosePink-300/50" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-textPrimary truncate">{currentTrack.title}</p>
                <p className="text-xs text-textSecondary truncate">{currentTrack.artist}</p>
                <div className="flex items-center justify-between mt-1 text-[10px] text-textSecondary font-mono">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-4 mb-4">
              <button
                onClick={prevTrack}
                className="p-2 text-textSecondary hover:text-rosePink-300 transition-colors"
              >
                <SkipBack className="w-4 h-4" />
              </button>
              <button
                onClick={togglePlay}
                className="p-3 bg-rosePink-300 text-background rounded-full hover:bg-rosePink-200 transition-transform active:scale-95 shadow-glow-pink"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 fill-background" />
                ) : (
                  <Play className="w-5 h-5 ml-0.5 fill-background" />
                )}
              </button>
              <button
                onClick={nextTrack}
                className="p-2 text-textSecondary hover:text-rosePink-300 transition-colors"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center space-x-2 px-1 mb-4 text-textSecondary text-xs">
              {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-rosePink-300"
              />
            </div>

            <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
              {birthdayConfig.playlist.map((track, idx) => {
                const active = idx === currentTrackIndex;
                return (
                  <button
                    key={track.id}
                    onClick={() => selectTrack(idx)}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-xs transition-colors ${
                      active
                        ? "bg-rosePink-300/15 text-rosePink-300 font-medium border border-rosePink-300/30"
                        : "hover:bg-white/5 text-textSecondary hover:text-textPrimary"
                    }`}
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <span className="w-4 text-center opacity-60 text-[10px]">{idx + 1}</span>
                      <span className="truncate">{track.title}</span>
                    </div>
                    <span className="opacity-50 text-[10px] flex-shrink-0">{track.artist}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
