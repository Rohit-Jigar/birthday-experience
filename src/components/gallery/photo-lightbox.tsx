"use client";

import React, { useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, Calendar, MapPin } from "lucide-react";
import { PhotoMemory } from "@/config/birthday";

interface PhotoLightboxProps {
  photo: PhotoMemory | null;
  photos: PhotoMemory[];
  onClose: () => void;
  onSelectPhoto: (photo: PhotoMemory) => void;
}

export function PhotoLightbox({
  photo,
  photos,
  onClose,
  onSelectPhoto,
}: PhotoLightboxProps) {
  const currentIndex = photos.findIndex((p) => p.id === photo?.id);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      onSelectPhoto(photos[currentIndex - 1]);
    } else {
      onSelectPhoto(photos[photos.length - 1]);
    }
  }, [currentIndex, photos, onSelectPhoto]);

  const handleNext = useCallback(() => {
    if (currentIndex < photos.length - 1) {
      onSelectPhoto(photos[currentIndex + 1]);
    } else {
      onSelectPhoto(photos[0]);
    }
  }, [currentIndex, photos, onSelectPhoto]);

  // Keyboard controls
  useEffect(() => {
    if (!photo) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [photo, onClose, handlePrev, handleNext]);

  if (!photo) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl select-none"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-11 h-11 rounded-full glass-panel flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors z-50 cursor-pointer"
          aria-label="Close fullscreen view"
        >
          <X size={20} />
        </button>

        {/* Previous Button */}
        <button
          onClick={handlePrev}
          className="absolute left-3 sm:left-6 w-11 h-11 rounded-full glass-panel flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors z-50 cursor-pointer"
          aria-label="Previous photo"
        >
          <ChevronLeft size={22} />
        </button>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute right-3 sm:right-6 w-11 h-11 rounded-full glass-panel flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors z-50 cursor-pointer"
          aria-label="Next photo"
        >
          <ChevronRight size={22} />
        </button>

        {/* Photo Container */}
        <motion.div
          key={photo.id}
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="relative max-w-2xl w-full max-h-[88vh] flex flex-col items-center justify-center"
        >
          <div className="relative w-full max-h-[70vh] aspect-[3/4] sm:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-white/15">
            <Image
              src={photo.src}
              alt={photo.caption}
              fill
              className="object-contain sm:object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
              priority
            />
          </div>

          {/* Caption banner */}
          <div className="mt-4 px-6 py-3 rounded-2xl glass-panel max-w-lg text-center border border-rose-300/20">
            <p className="text-sm sm:text-base font-medium text-rose-100/95 leading-relaxed">
              {photo.caption}
            </p>
            {(photo.date || photo.location) && (
              <div className="flex items-center justify-center gap-4 mt-2 text-[11px] text-rose-200/60 font-light">
                {photo.date && (
                  <span className="flex items-center gap-1">
                    <Calendar size={11} />
                    {photo.date}
                  </span>
                )}
                {photo.location && (
                  <span className="flex items-center gap-1">
                    <MapPin size={11} />
                    {photo.location}
                  </span>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
