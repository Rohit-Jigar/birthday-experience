"use client";

import React, { useRef, useEffect } from "react";

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 22 : 38;
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
        size: Math.random() * 2 + 0.8,
        speedY: -(Math.random() * 0.3 + 0.08),
        speedX: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.5,
        maxOpacity: Math.random() * 0.6 + 0.2,
        pulseSpeed: Math.random() * 0.01 + 0.005,
        color,
      });
    }

    // Shooting Star state
    const shootingStar = {
      active: false,
      x: 0,
      y: 0,
      length: 120,
      speed: 15,
      opacity: 0,
      nextSpawn: performance.now() + 3500,
    };

    let isVisible = !document.hidden;
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        lastTime = performance.now();
        animId = requestAnimationFrame(render);
      } else {
        cancelAnimationFrame(animId);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const handleResize = () => {
      if (canvas) {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }
    };
    window.addEventListener("resize", handleResize, { passive: true });

    // Gyroscope tilt tracking for physical mobile depth
    let tiltX = 0;
    let tiltY = 0;
    let targetTiltX = 0;
    let targetTiltY = 0;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        targetTiltX = Math.max(-24, Math.min(24, e.gamma)) * 0.35;
        targetTiltY = Math.max(-24, Math.min(24, e.beta - 45)) * 0.25;
      }
    };
    window.addEventListener("deviceorientation", handleOrientation, { passive: true });

    let lastTime = performance.now();
    const render = (time: number) => {
      if (!isVisible) return;
      const delta = Math.min((time - lastTime) / 16.666, 2);
      lastTime = time;

      // Smooth interpolation of gyroscope tilt
      tiltX += (targetTiltX - tiltX) * 0.06;
      tiltY += (targetTiltY - tiltY) * 0.06;

      ctx.clearRect(0, 0, width, height);

      // Render drifting starlight particles with subtle parallax
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += (p.speedY + tiltY * 0.012) * delta;
        p.x += (p.speedX + tiltX * 0.012) * delta;
        p.opacity += p.pulseSpeed * delta;
        if (p.opacity > p.maxOpacity || p.opacity < 0.05) {
          p.pulseSpeed = -p.pulseSpeed;
        }
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const currentAlpha = Math.max(0, Math.min(1, p.opacity));

        // Soft glow halo
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.2, 0, 2 * Math.PI);
        ctx.fillStyle = `${p.color}${(currentAlpha * 0.25).toFixed(3)})`;
        ctx.fill();

        // Sharp particle core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, 2 * Math.PI);
        ctx.fillStyle = `${p.color}${currentAlpha.toFixed(3)})`;
        ctx.fill();
      }

      // Render Shooting Star
      if (!shootingStar.active && time > shootingStar.nextSpawn) {
        shootingStar.active = true;
        shootingStar.x = Math.random() * (width * 0.7);
        shootingStar.y = Math.random() * (height * 0.35);
        shootingStar.length = Math.random() * 80 + 110;
        shootingStar.opacity = 1;
      }

      if (shootingStar.active) {
        const angle = Math.PI / 4; // 45 deg angle
        const dx = Math.cos(angle);
        const dy = Math.sin(angle);

        shootingStar.x += dx * shootingStar.speed * delta;
        shootingStar.y += dy * shootingStar.speed * delta;
        shootingStar.opacity -= 0.014 * delta;

        if (shootingStar.opacity > 0) {
          const grad = ctx.createLinearGradient(
            shootingStar.x,
            shootingStar.y,
            shootingStar.x - dx * shootingStar.length,
            shootingStar.y - dy * shootingStar.length
          );
          grad.addColorStop(0, `rgba(255, 255, 255, ${shootingStar.opacity})`);
          grad.addColorStop(0.3, `rgba(248, 200, 220, ${(shootingStar.opacity * 0.8).toFixed(2)})`);
          grad.addColorStop(1, "rgba(248, 200, 220, 0)");

          ctx.beginPath();
          ctx.moveTo(shootingStar.x, shootingStar.y);
          ctx.lineTo(
            shootingStar.x - dx * shootingStar.length,
            shootingStar.y - dy * shootingStar.length
          );
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.8;
          ctx.stroke();

          // Star head
          ctx.beginPath();
          ctx.arc(shootingStar.x, shootingStar.y, 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${shootingStar.opacity})`;
          ctx.fill();
        } else {
          shootingStar.active = false;
          shootingStar.nextSpawn = time + Math.random() * 9000 + 7000;
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("deviceorientation", handleOrientation);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden transform-gpu">
      {/* Subtle background ambient nebulas */}
      <div className="absolute -top-32 -left-32 w-[420px] h-[420px] bg-rosePink-300/15 rounded-full blur-[130px] pointer-events-none animate-pulse-glow will-change-transform" />
      <div
        className="absolute top-1/3 -right-40 w-[520px] h-[520px] bg-rosePink-200/10 rounded-full blur-[160px] pointer-events-none animate-pulse-glow will-change-transform"
        style={{ animationDelay: "2s" }}
      />
      <div className="absolute -bottom-32 left-1/4 w-[450px] h-[450px] bg-champagne-300/10 rounded-full blur-[140px] pointer-events-none will-change-transform" />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full transform-gpu" />
    </div>
  );
}
