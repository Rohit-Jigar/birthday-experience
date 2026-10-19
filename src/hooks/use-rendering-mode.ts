"use client";

import { useState, useEffect, useCallback } from "react";

export type RenderingMode = "enhanced-3d" | "lightweight-motion" | "static-fallback";

export function useRenderingMode() {
  const [mode, setMode] = useState<RenderingMode>("enhanced-3d");
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isLowPower, setIsLowPower] = useState(false);
  const [isContextLost, setIsContextLost] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Check prefers-reduced-motion
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotionQuery.matches) {
      setMode("lightweight-motion");
    }

    // 2. Hardware / Memory detection
    const nav = navigator as unknown as { deviceMemory?: number; hardwareConcurrency?: number };
    const lowMemory = nav.deviceMemory ? nav.deviceMemory < 3 : false;
    const lowCores = nav.hardwareConcurrency ? nav.hardwareConcurrency <= 2 : false;
    if (lowMemory || lowCores) {
      setIsLowPower(true);
    }

    // 3. Test WebGL context creation and capabilities
    try {
      const testCanvas = document.createElement("canvas");
      const gl =
        testCanvas.getContext("webgl2") ||
        testCanvas.getContext("webgl") ||
        testCanvas.getContext("experimental-webgl");

      if (!gl) {
        setHasWebGL(false);
        setMode("lightweight-motion");
        return;
      }

      // Check for WEBGL_lose_context simulation support and listen to context loss
      const handleContextLost = (e: Event) => {
        e.preventDefault();
        console.warn("WebGL context lost. Automatically switching to lightweight motion mode.");
        setIsContextLost(true);
        setMode("lightweight-motion");
      };

      testCanvas.addEventListener("webglcontextlost", handleContextLost, false);

      // Clean up test context
      const loseContextExt = (gl as WebGLRenderingContext).getExtension("WEBGL_lose_context");
      if (loseContextExt) {
        loseContextExt.loseContext();
      }
    } catch {
      setHasWebGL(false);
      setMode("static-fallback");
    }
  }, []);

  const setManualMode = useCallback((newMode: RenderingMode) => {
    setMode(newMode);
  }, []);

  const triggerContextLoss = useCallback(() => {
    setIsContextLost(true);
    setMode("lightweight-motion");
  }, []);

  return {
    mode,
    setManualMode,
    triggerContextLoss,
    hasWebGL,
    isLowPower,
    isContextLost,
  };
}
