"use client";

import React from "react";
import { Volume2, VolumeX, Music } from "lucide-react";
import { cn } from "@/lib/utils";

interface AudioPlayerProps {
  isPlaying: boolean;
  isMuted: boolean;
  onToggleMute: () => void;
  className?: string;
}

export function AudioPlayer({
  isPlaying,
  isMuted,
  onToggleMute,
  className,
}: AudioPlayerProps) {
  return (
    <div className={cn("relative flex items-center gap-2 select-none", className)}>
      {/* Subtle automatic track status pill - NO manual play/pause needed */}
      <div className="glass-pill rounded-full px-3 py-1.5 flex items-center gap-2 shadow-lg border border-rose-300/20">
        {isPlaying ? (
          <div className="flex items-end gap-0.5 h-3">
            <span className="w-0.5 h-2 bg-rose-400 animate-pulse" />
            <span className="w-0.5 h-3 bg-pink-300 animate-pulse [animation-delay:150ms]" />
            <span className="w-0.5 h-1.5 bg-[#F2D7B0] animate-pulse [animation-delay:300ms]" />
          </div>
        ) : (
          <Music size={12} className="text-rose-300/60" />
        )}

        <span className="text-[11px] font-medium text-rose-200/90 tracking-wide max-w-[140px] sm:max-w-[180px] truncate">
          {isPlaying ? "Maan Panu — The Last Letter" : "Sound Off"}
        </span>

        {/* Quick Mute/Unmute control */}
        <button
          onClick={onToggleMute}
          aria-label={isMuted ? "Unmute sound" : "Mute sound"}
          className="w-6 h-6 rounded-full flex items-center justify-center text-rose-200 hover:text-white hover:bg-rose-500/20 transition-colors cursor-pointer"
          title={isMuted ? "Unmute" : "Mute Sound"}
        >
          {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
        </button>
      </div>
    </div>
  );
}
