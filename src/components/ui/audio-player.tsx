"use client";

import React, { useState, useEffect, useRef } from "react";
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
  const [volume, setVolume] = useState(0.8);
  const [isOpen, setIsOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTimeStr, setCurrentTimeStr] = useState("0:00");
  const [durationStr, setDurationStr] = useState("0:00");

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const songTitle = BIRTHDAY_CONFIG.audio.songTitle || "The Last Letter";
  const songArtist = BIRTHDAY_CONFIG.audio.songArtist || "Maan Panu";
  const youtubeUrl = BIRTHDAY_CONFIG.audio.youtubeUrl || "https://www.youtube.com/watch?v=kz0kbFmB7FU";
  const audioSrc = BIRTHDAY_CONFIG.audio.customAudioPath || "/audio/the-last-letter.m4a";

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return "0:00";
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins}:${remainingSecs < 10 ? "0" : ""}${remainingSecs}`;
  };

  // Sync mute and volume with audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
      audioRef.current.volume = volume;
    }
  }, [isMuted, volume]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn("Audio play prevented:", err);
        });
    }
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const current = audioRef.current.currentTime;
    const total = audioRef.current.duration;
    if (total > 0) {
      setProgress((current / total) * 100);
      setCurrentTimeStr(formatTime(current));
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDurationStr(formatTime(audioRef.current.duration));
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const seekPercent = parseFloat(e.target.value);
    const newTime = (seekPercent / 100) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
    setProgress(seekPercent);
  };

  return (
    <div className={cn("relative flex items-center gap-2", className)}>
      {/* HTML5 Native Audio Element for 100% Reliable Playback */}
      <audio
        ref={audioRef}
        src={audioSrc}
        preload="auto"
        loop
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Mini control pill */}
      <div className="glass-pill rounded-full p-1.5 flex items-center gap-1.5 shadow-lg border border-rose-300/20">
        <button
          onClick={togglePlay}
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
          className="flex items-center gap-1.5 text-[11px] font-medium tracking-wide px-2.5 py-1 text-rose-200 hover:text-rose-100 transition-colors cursor-pointer max-w-[170px] truncate"
          title="Track info & settings"
        >
          {/* Animated audio bars when playing */}
          {isPlaying ? (
            <div className="flex items-end gap-0.5 h-3">
              <span className="w-0.5 h-2 bg-rose-400 animate-pulse" />
              <span className="w-0.5 h-3 bg-pink-300 animate-pulse [animation-delay:150ms]" />
              <span className="w-0.5 h-1.5 bg-[#F2D7B0] animate-pulse [animation-delay:300ms]" />
            </div>
          ) : (
            <Music size={12} className="text-rose-300/70" />
          )}
          <span className="truncate">{songTitle}</span>
        </button>
      </div>

      {/* Expanded track details popover */}
      {isOpen && (
        <div className="absolute right-0 top-12 glass-panel p-4 rounded-2xl flex flex-col gap-3 z-50 min-w-[260px] shadow-2xl border border-rose-400/20 animate-in fade-in zoom-in-95 duration-150">
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

          {/* Scrubber Progress Bar */}
          <div className="flex flex-col gap-1">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleSeek}
              className="w-full accent-rose-400 cursor-pointer h-1.5 bg-rose-950/80 rounded-lg"
            />
            <div className="flex items-center justify-between text-[10px] text-rose-300/60 font-mono">
              <span>{currentTimeStr}</span>
              <span>{durationStr}</span>
            </div>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-2 pt-1 border-t border-rose-300/15">
            <button
              onClick={onToggleMute}
              className="text-rose-300/70 hover:text-white"
            >
              {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full accent-rose-400 cursor-pointer h-1 bg-rose-950/80 rounded-lg"
            />
            <span className="text-[10px] text-rose-300/70 font-mono w-7 text-right">
              {Math.round(volume * 100)}%
            </span>
          </div>

          {/* Play/Pause CTA */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-[10px] text-rose-300/60">
              {isPlaying ? "Playing official track" : "Paused"}
            </span>
            <button
              onClick={togglePlay}
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
