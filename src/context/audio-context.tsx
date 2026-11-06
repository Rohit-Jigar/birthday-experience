"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { birthdayConfig, PlaylistItem } from "@/config/birthday";

interface AudioContextType {
  isPlaying: boolean;
  currentTrackIndex: number;
  currentTrack: PlaylistItem;
  currentTime: number;
  duration: number;
  volume: number;
  hasInteracted: boolean;
  togglePlay: () => void;
  play: () => void;
  pause: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  selectTrack: (index: number) => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  setHasInteracted: (interacted: boolean) => void;
  formatTime: (time: number) => string;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const playlist = birthdayConfig.playlist;
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.7);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "none";
    audio.volume = volume;
    audioRef.current = audio;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const handleEnded = () => {
      setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
    };
  }, [playlist.length]);

  useEffect(() => {
    if (!audioRef.current || !playlist[currentTrackIndex]) return;

    const targetSrc = playlist[currentTrackIndex].src;
    // Only load if the audio source has actually changed to a new track
    if (audioRef.current.src && !audioRef.current.src.endsWith(targetSrc)) {
      audioRef.current.src = targetSrc;
      audioRef.current.preload = "auto";
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      }
    }
  }, [currentTrackIndex, isPlaying, playlist]);

  const currentTrack = playlist[currentTrackIndex] || playlist[0];

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const play = () => {
    if (!audioRef.current || !playlist[currentTrackIndex]) return;
    if (!hasInteracted) setHasInteracted(true);

    const targetSrc = playlist[currentTrackIndex].src;
    if (!audioRef.current.src || !audioRef.current.src.endsWith(targetSrc)) {
      audioRef.current.src = targetSrc;
      audioRef.current.preload = "auto";
    }

    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch((err) => {
        console.warn("Audio playback delayed until user gesture", err);
        setIsPlaying(false);
      });
  };

  const pause = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const nextTrack = () => {
    const next = (currentTrackIndex + 1) % playlist.length;
    selectTrack(next);
  };

  const prevTrack = () => {
    const prev = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    selectTrack(prev);
  };

  const selectTrack = (index: number) => {
    if (index >= 0 && index < playlist.length) {
      setCurrentTrackIndex(index);
      if (!hasInteracted) setHasInteracted(true);
      if (audioRef.current) {
        audioRef.current.src = playlist[index].src;
        audioRef.current.preload = "auto";
        audioRef.current.load();
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const setVolume = (val: number) => {
    const clamped = Math.max(0, Math.min(1, val));
    setVolumeState(clamped);
    if (audioRef.current) {
      audioRef.current.volume = clamped;
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time) || time <= 0) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        currentTrackIndex,
        currentTrack,
        currentTime,
        duration,
        volume,
        hasInteracted,
        togglePlay,
        play,
        pause,
        nextTrack,
        prevTrack,
        selectTrack,
        seek,
        setVolume,
        setHasInteracted,
        formatTime,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
