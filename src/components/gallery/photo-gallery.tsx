"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Sparkles, Maximize2, ArrowRight, Heart } from "lucide-react";
import { PhotoLightbox } from "./photo-lightbox";
import { BIRTHDAY_CONFIG, PhotoMemory } from "@/config/birthday";
import { Button } from "@/components/ui/button";

interface PhotoGalleryProps {
  onContinueToLetter: () => void;
  onPlayChime?: () => void;
}

export function PhotoGallery({ onContinueToLetter, onPlayChime }: PhotoGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoMemory | null>(null);

  const handleOpenPhoto = (photo: PhotoMemory) => {
    if (onPlayChime) onPlayChime();
    setSelectedPhoto(photo);
  };

  return (
    <section className="relative w-full min-h-screen py-24 px-4 sm:px-8 flex flex-col items-center justify-between overflow-hidden bg-radial from-[#251025] via-[#160D22] to-[#0A050E] select-none">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[#F2D7B0]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto space-y-3 z-10 mb-12">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full glass-pill text-xs text-rose-200 border border-rose-300/20 shadow-md"
        >
          <Sparkles size={12} className="text-[#F2D7B0]" />
          <span>Chapter II &bull; Beautiful Memories</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl sm:text-5xl font-serif font-light text-white tracking-tight"
        >
          Moments in Time
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-sm sm:text-base text-rose-200/80 font-light max-w-md mx-auto"
        >
          {BIRTHDAY_CONFIG.personalQuote.hindi}
        </motion.p>
      </div>

      {/* Three Photos in 3D Floating Tilt Cards */}
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-6 z-10 mb-16">
        {BIRTHDAY_CONFIG.photos.map((photo, idx) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 + idx * 0.2 }}
            whileHover={{ y: -8, scale: 1.02 }}
            onClick={() => handleOpenPhoto(photo)}
            className="group relative cursor-pointer"
          >
            {/* Card Frame (Polaroid / Glass aesthetic) */}
            <div className="glass-panel rounded-3xl p-3.5 pb-5 border border-rose-300/25 shadow-xl hover:border-rose-300/50 hover:shadow-2xl transition-all duration-300 flex flex-col items-center">
              {/* Photo image container with light sweep */}
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-black/40 border border-white/10 shine-effect">
                <Image
                  src={photo.src}
                  alt={photo.caption}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={idx === 0}
                />

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="glass-pill px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs text-white">
                    <Maximize2 size={13} />
                    <span>View full</span>
                  </div>
                </div>
              </div>

              {/* Caption & details */}
              <div className="w-full mt-4 px-1 text-center">
                <div className="flex items-center justify-center gap-1 mb-1 text-[11px] text-rose-300/80 font-mono uppercase tracking-wider">
                  <Heart size={11} className="text-rose-400 fill-rose-400/40" />
                  <span>Memory {idx + 1}</span>
                </div>
                <p className="text-xs sm:text-sm font-medium text-rose-100/90 line-clamp-2 leading-relaxed">
                  {photo.caption}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA to proceed to Letter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="z-10 text-center"
      >
        <Button
          onClick={onContinueToLetter}
          variant="champagne"
          size="lg"
          className="px-8 py-3.5 text-sm sm:text-base font-medium rounded-full shadow-2xl hover:scale-105 transition-transform"
        >
          <span>Read the Birthday Letter</span>
          <ArrowRight size={16} className="ml-2" />
        </Button>
      </motion.div>

      {/* Lightbox Modal */}
      <PhotoLightbox
        photo={selectedPhoto}
        photos={BIRTHDAY_CONFIG.photos}
        onClose={() => setSelectedPhoto(null)}
        onSelectPhoto={setSelectedPhoto}
      />
    </section>
  );
}
