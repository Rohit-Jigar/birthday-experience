"use client";

import React, { useRef, useEffect } from "react";

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const particleCount = window.innerWidth < 768 ? 32 : 55;
    const palette = [
      "rgba(255, 255, 255, ",
      "rgba(248, 200, 220, ",
      "rgba(252, 228, 236, ",
      "rgba(230, 200, 150, ",
    ];

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      maxOpacity: number;
      pulseSpeed: number;
      color: string;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      const color = palette[Math.floor(Math.random() * palette.length)];
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.2 + 0.8,
        speedY: -(Math.random() * 0.35 + 0.1),
        speedX: (Math.random() - 0.5) * 0.25,
        opacity: Math.random() * 0.5,
        maxOpacity: Math.random() * 0.65 + 0.25,
        pulseSpeed: Math.random() * 0.012 + 0.006,
        color,
      });
    }

    const handleResize = () => {
      if (canvas) {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }
    };

    window.addEventListener("resize", handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.opacity += p.pulseSpeed;
        if (p.opacity > p.maxOpacity || p.opacity < 0.05) {
          p.pulseSpeed = -p.pulseSpeed;
        }
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, 2 * Math.PI);
        ctx.fillStyle = `${p.color}${Math.max(0, p.opacity)})`;
        ctx.shadowBlur = p.size * 5;
        ctx.shadowColor = `${p.color}0.6)`;
        ctx.fill();
      });
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute -top-32 -left-32 w-[420px] h-[420px] bg-rosePink-300/15 rounded-full blur-[130px] pointer-events-none animate-pulse-glow" />
      <div
        className="absolute top-1/3 -right-40 w-[520px] h-[520px] bg-rosePink-200/10 rounded-full blur-[160px] pointer-events-none animate-pulse-glow"
        style={{ animationDelay: "2s" }}
      />
      <div className="absolute -bottom-32 left-1/4 w-[450px] h-[450px] bg-champagne-300/10 rounded-full blur-[140px] pointer-events-none" />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
