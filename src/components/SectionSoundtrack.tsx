"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Disc, Music, SkipBack, SkipForward, Play, Pause, VolumeX, Volume2 } from "lucide-react";
import { useAudio } from "@/context/audio-context";
import { birthdayConfig } from "@/config/birthday";

export function SectionSoundtrack() {
  const {
    isPlaying,
    currentTrackIndex,
    currentTrack,
    togglePlay,
    nextTrack,
    prevTrack,
    selectTrack,
    currentTime,
    duration,
    seek,
    volume,
    setVolume,
    formatTime,
  } = useAudio();

  const playlist = birthdayConfig.playlist;
  const [coverErrors, setCoverErrors] = useState<Record<string, boolean>>({});

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 text-center z-10 py-24 overflow-hidden">
      <div
        className={`absolute w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none transition-all duration-1000 ${
          isPlaying ? "bg-rosePink-300/15 scale-110" : "bg-rosePink-300/5 scale-100"
        }`}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="mb-12 space-y-2"
      >
        <div className="flex items-center justify-center space-x-2 text-rosePink-300 text-xs tracking-widest uppercase font-cinzel">
          <Disc className={`w-3.5 h-3.5 ${isPlaying ? "animate-spin" : ""}`} />
          <span>Curated Soundtrack</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-serif text-textPrimary font-normal">
          Songs That Remind Me of You
        </h2>
        <p className="text-xs text-textSecondary max-w-xs mx-auto">
          A playlist crafted to accompany your journey.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md glass-panel p-6 sm:p-8 rounded-3xl border border-white/15 shadow-2xl space-y-6"
      >
        <div className="relative flex items-center justify-center">
          {/* Vinyl Record */}
          <div
            className={`absolute w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-black border-4 border-surface shadow-2xl flex items-center justify-center transition-transform duration-700 ${
              isPlaying ? "translate-x-10 rotate-[720deg]" : "translate-x-0 rotate-0"
            }`}
            style={{ transitionDuration: "12s" }}
          >
            <div className="w-full h-full rounded-full border border-white/10 p-4 flex items-center justify-center">
              <div className="w-full h-full rounded-full border border-white/5 p-4 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-rosePink-300/30 border border-rosePink-300 flex items-center justify-center">
                  <div className="w-3.5 h-3.5 rounded-full bg-background border border-white/40" />
                </div>
              </div>
            </div>
          </div>

          {/* Album Cover Sleeve */}
          <div className="relative z-10 w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden glass-panel-pink border border-rosePink-300/30 shadow-glow-pink flex items-center justify-center group">
            {coverErrors[currentTrack.id] ? (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-surface via-background to-rosePink-300/20 text-rosePink-300 p-4">
                <Music className="w-12 h-12 mb-2 stroke-[1.5]" />
                <span className="text-xs font-serif">{currentTrack.title}</span>
              </div>
            ) : (
              <img
                src={currentTrack.cover}
                alt={currentTrack.title}
                onError={() =>
                  setCoverErrors((prev) => ({ ...prev, [currentTrack.id]: true }))
                }
                className={`w-full h-full object-cover transition-transform duration-700 ${
                  isPlaying ? "scale-105" : "scale-100"
                }`}
              />
            )}
          </div>
        </div>

        <div className="space-y-1 pt-2">
          <h3 className="text-lg font-serif font-semibold text-textPrimary tracking-wide">
            {currentTrack.title}
          </h3>
          <p className="text-xs text-rosePink-200">{currentTrack.artist}</p>
        </div>

        {/* Equalizer Waveform Bars */}
        <div className="flex items-end justify-center space-x-1.5 h-6">
          {Array.from({ length: 9 }).map((_, idx) => (
            <div
              key={idx}
              className={`w-1 rounded-full bg-rosePink-300 transition-all duration-300 ${
                isPlaying ? "animate-pulse" : "h-1 opacity-30"
              }`}
              style={{
                height: isPlaying ? `${Math.sin(idx * 0.8) * 12 + 14}px` : "4px",
                animationDelay: `${idx * 120}ms`,
              }}
            />
          ))}
        </div>

        {/* Scrub Bar */}
        <div className="space-y-1.5">
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={(e) => seek(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-rosePink-300"
          />
          <div className="flex justify-between text-[10px] text-textSecondary font-mono">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Player Controls */}
        <div className="flex items-center justify-between px-4">
          <button
            onClick={() => setVolume(volume === 0 ? 0.7 : 0)}
            className="p-2 text-textSecondary hover:text-rosePink-300 transition-colors"
          >
            {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <div className="flex items-center space-x-5">
            <button
              onClick={prevTrack}
              className="p-2.5 text-textSecondary hover:text-textPrimary transition-colors"
            >
              <SkipBack className="w-5 h-5" />
            </button>
            <button
              onClick={togglePlay}
              className="p-4 bg-rosePink-300 text-background rounded-full hover:bg-rosePink-200 transition-transform active:scale-95 shadow-glow-pink"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 fill-background" />
              ) : (
                <Play className="w-6 h-6 ml-0.5 fill-background" />
              )}
            </button>
            <button
              onClick={nextTrack}
              className="p-2.5 text-textSecondary hover:text-textPrimary transition-colors"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>
          <div className="w-8" />
        </div>

        {/* Playlist Drawer */}
        <div className="pt-4 border-t border-white/10 space-y-2 text-left">
          <p className="text-[10px] uppercase tracking-widest text-rosePink-300/80 font-cinzel">
            Playlist ({playlist.length})
          </p>
          <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
            {playlist.map((track, idx) => {
              const active = idx === currentTrackIndex;
              return (
                <button
                  key={track.id}
                  onClick={() => selectTrack(idx)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs transition-all ${
                    active
                      ? "bg-rosePink-300/15 text-rosePink-300 border border-rosePink-300/30"
                      : "hover:bg-white/5 text-textSecondary hover:text-textPrimary"
                  }`}
                >
                  <div className="flex items-center space-x-3 truncate">
                    <span className="w-4 text-center font-mono opacity-50 text-[10px]">
                      0{idx + 1}
                    </span>
                    <div className="truncate">
                      <p className="font-medium truncate">{track.title}</p>
                      <p className="text-[10px] opacity-60 truncate">{track.artist}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono opacity-50">{track.duration}</span>
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
