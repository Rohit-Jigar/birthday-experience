"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import { motion } from "motion/react";
import { Sparkles, ArrowRight } from "lucide-react";
import { ThreeHeart } from "./three-heart";
import { SceneFallback } from "./scene-fallback";
import { BIRTHDAY_CONFIG } from "@/config/birthday";
import { Button } from "@/components/ui/button";
import { useRenderingMode } from "@/hooks/use-rendering-mode";

interface RomanticSceneProps {
  onExploreGallery: () => void;
}

export function RomanticScene({ onExploreGallery }: RomanticSceneProps) {
  const { mode, triggerContextLoss } = useRenderingMode();

  if (mode !== "enhanced-3d") {
    return <SceneFallback onExploreGallery={onExploreGallery} />;
  }

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-between overflow-hidden bg-radial from-[#251025] via-[#160D22] to-[#0A050E] select-none">
      {/* 3D WebGL Canvas Layer - Optimized for 60 FPS Mobile */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={[1, 1.5]}
          performance={{ min: 0.5 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          onCreated={({ gl }) => {
            gl.domElement.addEventListener("webglcontextlost", (e) => {
              e.preventDefault();
              triggerContextLoss();
            });
          }}
        >
          <ambientLight intensity={0.7} />
          <directionalLight position={[4, 4, 4]} intensity={1.1} color="#FFF5EE" />
          <pointLight position={[-3, 2, 2]} intensity={1.5} color="#E8A5B8" />
          <pointLight position={[3, -2, 2]} intensity={1.2} color="#F2D7B0" />

          <Suspense fallback={null}>
            {/* Optimized Starfield background */}
            <Stars
              radius={70}
              depth={35}
              count={450}
              factor={2.5}
              saturation={0.5}
              fade
              speed={0.9}
            />

            {/* Floating 3D Glass Heart */}
            <Float
              speed={1.8}
              rotationIntensity={0.5}
              floatIntensity={0.6}
              floatingRange={[-0.12, 0.12]}
            >
              <ThreeHeart />
            </Float>
          </Suspense>
        </Canvas>
      </div>

      {/* Top Heading Overlay */}
      <div className="relative z-10 pt-20 sm:pt-24 px-6 text-center max-w-xl mx-auto pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full glass-pill text-xs text-rose-200 border border-rose-300/20 shadow-md mb-3"
        >
          <Sparkles size={12} className="text-[#F2D7B0]" />
          <span>Chapter I &bull; The Sanctuary</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-3xl sm:text-5xl font-serif font-light text-white tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
        >
          A Realm of Peace
        </motion.h2>
      </div>

      {/* Bottom Floating Glass Card & CTA */}
      <div className="relative z-10 pb-12 sm:pb-16 px-4 w-full max-w-lg mx-auto pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="glass-panel rounded-3xl p-6 sm:p-7 border border-rose-300/25 shadow-2xl rose-glow text-center space-y-4"
        >
          {/* Sincere Quote in Hindi & English */}
          <p className="text-base sm:text-lg font-medium text-white/95 leading-relaxed tracking-wide">
            {BIRTHDAY_CONFIG.personalQuote.hindi}
          </p>

          <p className="text-xs sm:text-sm text-rose-200/70 font-light italic">
            "{BIRTHDAY_CONFIG.personalQuote.english}"
          </p>

          <div className="pt-2">
            <Button
              onClick={onExploreGallery}
              variant="champagne"
              size="lg"
              className="w-full sm:w-auto px-8 py-3 text-sm font-semibold rounded-full shadow-xl hover:scale-[1.02] active:scale-95 transition-transform"
            >
              <span>Explore Memories &amp; Moments</span>
              <ArrowRight size={15} className="ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
