"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Volume2, VolumeX, Music, Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

interface AudioPlayerProps {
  isMuted: boolean;
  onToggleMute: () => void;
  className?: string;
}

export function AudioPlayer({ isMuted, onToggleMute, className }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isOpen, setIsOpen] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);

  // Gentle dreamy chord notes (pentatonic / romantic ambient arpeggio)
  // Frequencies: D4, F#4, A4, C#5, E5 (Dmaj9 warm romantic chord)
  const chordNotes = [293.66, 369.99, 440.0, 554.37, 659.25, 739.99, 880.0];

  const stopSynth = useCallback(() => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
  }, []);

  const startSynth = useCallback(() => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      if (!masterGainRef.current) {
        masterGainRef.current = ctx.createGain();
        masterGainRef.current.connect(ctx.destination);
      }
      masterGainRef.current.gain.setValueAtTime(isMuted ? 0 : volume * 0.12, ctx.currentTime);

      stopSynth();

      let noteIdx = 0;
      const playNextTone = () => {
        if (!audioCtxRef.current || !masterGainRef.current) return;
        const noteFreq = chordNotes[noteIdx % chordNotes.length];
        noteIdx++;

        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(noteFreq, ctx.currentTime);

        noteGain.gain.setValueAtTime(0.001, ctx.currentTime);
        noteGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.6);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.2);

        osc.connect(noteGain);
        noteGain.connect(masterGainRef.current);

        osc.start();
        osc.stop(ctx.currentTime + 3.4);
      };

      playNextTone();
      synthIntervalRef.current = setInterval(playNextTone, 1400);
    } catch {
      // Audio context restricted
    }
  }, [chordNotes, isMuted, volume, stopSynth]);

  useEffect(() => {
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.setValueAtTime(
        isMuted ? 0 : volume * 0.12,
        audioCtxRef.current.currentTime
      );
    }
  }, [isMuted, volume]);

  const toggleMusic = () => {
    if (isPlaying) {
      stopSynth();
      setIsPlaying(false);
    } else {
      startSynth();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      stopSynth();
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, [stopSynth]);

  return (
    <div className={cn("relative flex items-center gap-2", className)}>
      {/* Mini control pill */}
      <div className="glass-pill rounded-full p-1.5 flex items-center gap-1 shadow-lg border border-rose-300/20">
        <button
          onClick={toggleMusic}
          aria-label={isPlaying ? "Pause ambient melody" : "Play ambient melody"}
          className="w-8 h-8 rounded-full flex items-center justify-center text-rose-200 hover:text-white hover:bg-rose-500/20 transition-colors cursor-pointer"
          title={isPlaying ? "Pause Ambient Music" : "Play Ambient Music (Optional)"}
        >
          {isPlaying ? <Pause size={14} /> : <Music size={14} />}
        </button>

        <button
          onClick={onToggleMute}
          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
          className="w-8 h-8 rounded-full flex items-center justify-center text-rose-200 hover:text-white hover:bg-rose-500/20 transition-colors cursor-pointer"
          title={isMuted ? "Unmute" : "Mute Sound"}
        >
          {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-[10px] font-medium tracking-wide uppercase px-2 py-1 text-rose-200/80 hover:text-rose-100 transition-colors cursor-pointer"
        >
          Sound
        </button>
      </div>

      {/* Expanded volume slider popover */}
      {isOpen && (
        <div className="absolute right-0 top-12 glass-panel p-3 rounded-2xl flex flex-col gap-2 z-50 min-w-[170px] shadow-2xl border border-rose-400/20 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between text-xs text-rose-200 font-medium">
            <span>Ambient Melody</span>
            <span className="text-[10px] text-rose-300/70">{Math.round(volume * 100)}%</span>
          </div>

          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-full accent-rose-400 cursor-pointer h-1.5 bg-rose-950/80 rounded-lg"
          />

          <div className="flex items-center justify-between pt-1">
            <span className="text-[10px] text-rose-300/60">
              {isPlaying ? "Playing soft chimes" : "Music is paused"}
            </span>
            <button
              onClick={toggleMusic}
              className="text-xs text-rose-200 hover:text-white font-medium flex items-center gap-1 cursor-pointer"
            >
              {isPlaying ? <Pause size={10} /> : <Play size={10} />}
              {isPlaying ? "Pause" : "Play"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
