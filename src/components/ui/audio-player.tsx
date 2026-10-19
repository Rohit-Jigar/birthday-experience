"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Volume2, VolumeX, Music, Play, Pause, ExternalLink } from "lucide-react";
import { BIRTHDAY_CONFIG } from "@/config/birthday";
import { cn } from "@/lib/utils";

interface AudioPlayerProps {
  isMuted: boolean;
  onToggleMute: () => void;
  className?: string;
}

export function AudioPlayer({ isMuted, onToggleMute, className }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isOpen, setIsOpen] = useState(false);
  const [useYouTube, setUseYouTube] = useState(true);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const songTitle = BIRTHDAY_CONFIG.audio.songTitle || "The Last Letter";
  const songArtist = BIRTHDAY_CONFIG.audio.songArtist || "Maan Panu";
  const youtubeUrl = BIRTHDAY_CONFIG.audio.youtubeUrl || "https://www.youtube.com/watch?v=kz0kbFmB7FU";

  // Gentle dreamy chord notes fallback (pentatonic ambient arpeggio)
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

  const controlYouTube = useCallback((action: "play" | "pause") => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      const func = action === "play" ? "playVideo" : "pauseVideo";
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: "command", func: func, args: [] }),
        "*"
      );
    }
  }, []);

  const toggleMusic = () => {
    if (isPlaying) {
      if (useYouTube) {
        controlYouTube("pause");
      }
      stopSynth();
      setIsPlaying(false);
    } else {
      if (useYouTube) {
        controlYouTube("play");
      } else {
        startSynth();
      }
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
      {/* Hidden YouTube IFrame stream player for Maan Panu - The Last Letter */}
      <iframe
        ref={iframeRef}
        src="https://www.youtube-nocookie.com/embed/kz0kbFmB7FU?enablejsapi=1&playsinline=1&controls=0&modestbranding=1&origin=https://birthday-experience.vercel.app"
        title="Maan Panu - The Last Letter"
        className="hidden w-0 h-0 opacity-0 pointer-events-none"
        allow="autoplay; encrypted-media"
      />

      {/* Mini control pill */}
      <div className="glass-pill rounded-full p-1.5 flex items-center gap-1.5 shadow-lg border border-rose-300/20">
        <button
          onClick={toggleMusic}
          aria-label={isPlaying ? `Pause ${songTitle}` : `Play ${songTitle}`}
          className="w-8 h-8 rounded-full flex items-center justify-center text-rose-200 hover:text-white hover:bg-rose-500/20 transition-colors cursor-pointer"
          title={isPlaying ? `Pause ${songTitle}` : `Play ${songTitle} - ${songArtist}`}
        >
          {isPlaying ? (
            <Pause size={14} className="text-[#F2D7B0]" />
          ) : (
            <Play size={14} className="ml-0.5" />
          )}
        </button>

        <button
          onClick={onToggleMute}
          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
          className="w-8 h-8 rounded-full flex items-center justify-center text-rose-200 hover:text-white hover:bg-rose-500/20 transition-colors cursor-pointer"
          title={isMuted ? "Unmute" : "Mute Sound"}
        >
          {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>

        {/* Current track pill label */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 text-[11px] font-medium tracking-wide px-2.5 py-1 text-rose-200 hover:text-rose-100 transition-colors cursor-pointer max-w-[150px] truncate"
          title="Track info & settings"
        >
          <Music size={11} className={isPlaying ? "text-rose-400 animate-bounce" : "text-rose-300/70"} />
          <span className="truncate">{songTitle}</span>
        </button>
      </div>

      {/* Expanded track details popover */}
      {isOpen && (
        <div className="absolute right-0 top-12 glass-panel p-4 rounded-2xl flex flex-col gap-3 z-50 min-w-[240px] shadow-2xl border border-rose-400/20 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="text-xs font-semibold text-white tracking-wide">{songTitle}</h4>
              <p className="text-[11px] text-rose-300/80 font-light">{songArtist}</p>
            </div>
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-rose-300/70 hover:text-white transition-colors"
              title="Open video on YouTube"
            >
              <ExternalLink size={13} />
            </a>
          </div>

          {/* Audio stream selector */}
          <div className="flex items-center justify-between text-[11px] text-rose-200/80 pt-1 border-t border-rose-300/15">
            <span>Audio Source</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  stopSynth();
                  setUseYouTube(true);
                  if (isPlaying) controlYouTube("play");
                }}
                className={cn(
                  "px-2 py-0.5 rounded text-[10px] transition-colors cursor-pointer",
                  useYouTube ? "bg-rose-500/30 text-rose-100 font-semibold" : "text-rose-300/50 hover:text-rose-200"
                )}
              >
                Maan Panu
              </button>
              <button
                onClick={() => {
                  controlYouTube("pause");
                  setUseYouTube(false);
                  if (isPlaying) startSynth();
                }}
                className={cn(
                  "px-2 py-0.5 rounded text-[10px] transition-colors cursor-pointer",
                  !useYouTube ? "bg-rose-500/30 text-rose-100 font-semibold" : "text-rose-300/50 hover:text-rose-200"
                )}
              >
                Ambient
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-[10px] text-rose-300/60">
              {isPlaying ? "Playing music" : "Paused"}
            </span>
            <button
              onClick={toggleMusic}
              className="glass-pill px-3 py-1 rounded-full text-xs text-rose-100 hover:text-white font-medium flex items-center gap-1 cursor-pointer"
            >
              {isPlaying ? <Pause size={11} /> : <Play size={11} />}
              <span>{isPlaying ? "Pause" : "Play"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
