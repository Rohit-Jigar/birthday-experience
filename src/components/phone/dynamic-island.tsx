"use client";

import React from "react";
import { Wifi, BatteryMedium, Signal } from "lucide-react";
import { motion } from "motion/react";

export function DynamicIsland() {
  return (
    <div className="w-full flex items-center justify-between px-7 pt-3.5 pb-2 select-none text-white text-xs z-30">
      {/* Carrier / Time on iPhone notch status bar */}
      <span className="font-semibold tracking-tight text-[13px] text-white/90">9:41</span>

      {/* Dynamic Island pill */}
      <motion.div
        initial={{ width: 110, height: 28 }}
        whileHover={{ width: 130 }}
        className="h-7 bg-black rounded-full flex items-center justify-between px-3.5 shadow-md shadow-black/80 border border-white/10"
      >
        {/* Camera sensor dot */}
        <div className="w-2.5 h-2.5 rounded-full bg-[#0a0a0f] border border-neutral-800 flex items-center justify-center">
          <div className="w-1 h-1 rounded-full bg-blue-950/70" />
        </div>
        {/* Subtle orange microphone indicator or music wave */}
        <div className="flex items-center gap-0.5">
          <span className="w-1 h-2 bg-rose-400/80 rounded-full animate-pulse" />
          <span className="w-1 h-3 bg-pink-400 rounded-full" />
        </div>
      </motion.div>

      {/* Right status icons: Signal, Wi-Fi, Battery */}
      <div className="flex items-center gap-1.5 text-white/90">
        <Signal size={13} strokeWidth={2.4} />
        <Wifi size={13} strokeWidth={2.4} />
        <div className="flex items-center gap-0.5">
          <BatteryMedium size={18} strokeWidth={2.2} />
        </div>
      </div>
    </div>
  );
}
