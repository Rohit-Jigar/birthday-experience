"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Heart, Sparkles, RefreshCw, ChevronDown, Download, Check, Loader2 } from "lucide-react";
import { birthdayConfig, getAssetPath } from "@/config/birthday";

interface SectionFinalProps {
  onReplay: () => void;
  onContinueToFarewell?: () => void;
}

export function SectionFinal({ onReplay, onContinueToFarewell }: SectionFinalProps) {
  const { finalSurprise } = birthdayConfig;
  const [step, setStep] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleExportPostcard = async () => {
    if (isExporting) return;
    setIsExporting(true);

    try {
      const canvas = document.createElement("canvas");
      canvas.width = 1200;
      canvas.height = 800;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Could not create canvas context");

      // 1. Background deep gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 1200, 800);
      bgGrad.addColorStop(0, "#0b060d");
      bgGrad.addColorStop(0.5, "#170c1b");
      bgGrad.addColorStop(1, "#0d0712");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1200, 800);

      // Ambient radial pink & gold glow
      const glow1 = ctx.createRadialGradient(340, 400, 10, 340, 400, 480);
      glow1.addColorStop(0, "rgba(248, 200, 220, 0.16)");
      glow1.addColorStop(1, "rgba(248, 200, 220, 0)");
      ctx.fillStyle = glow1;
      ctx.fillRect(0, 0, 1200, 800);

      const glow2 = ctx.createRadialGradient(900, 260, 10, 900, 260, 420);
      glow2.addColorStop(0, "rgba(226, 182, 121, 0.10)");
      glow2.addColorStop(1, "rgba(226, 182, 121, 0)");
      ctx.fillStyle = glow2;
      ctx.fillRect(0, 0, 1200, 800);

      // Star dust sprinkles
      ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
      const stars: [number, number, number][] = [
        [120, 80, 1.5], [240, 160, 1.2], [90, 680, 2], [1120, 90, 1.5],
        [1040, 720, 2], [620, 85, 1], [720, 740, 1.5], [1140, 420, 1.2],
        [70, 380, 1.5], [560, 720, 1], [980, 140, 2], [480, 60, 1.5],
        [320, 740, 1.2], [820, 60, 1.5]
      ];
      stars.forEach(([x, y, r]) => {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Vintage borders
      ctx.strokeStyle = "rgba(248, 200, 220, 0.35)";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(32, 32, 1136, 736);

      ctx.strokeStyle = "rgba(226, 182, 121, 0.32)";
      ctx.lineWidth = 1;
      ctx.setLineDash([8, 6]);
      ctx.strokeRect(44, 44, 1112, 712);
      ctx.setLineDash([]);

      // Corner florets
      const cornerStars: [number, number][] = [
        [56, 56], [1144, 56], [56, 744], [1144, 744]
      ];
      ctx.fillStyle = "#E2B679";
      ctx.font = "16px serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      cornerStars.forEach(([cx, cy]) => {
        ctx.fillText("✦", cx, cy);
      });

      // 2. Left side Polaroid Photo Frame
      const polaroidX = 85;
      const polaroidY = 85;
      const polaroidW = 440;
      const polaroidH = 630;

      ctx.save();
      ctx.shadowColor = "rgba(0, 0, 0, 0.55)";
      ctx.shadowBlur = 32;
      ctx.shadowOffsetY = 16;
      ctx.fillStyle = "#FBF7EF";
      ctx.beginPath();
      ctx.roundRect(polaroidX, polaroidY, polaroidW, polaroidH, 12);
      ctx.fill();
      ctx.restore();

      const photoX = polaroidX + 24;
      const photoY = polaroidY + 24;
      const photoW = polaroidW - 48;
      const photoH = 470;

      // Try loading Ghibli Avatar
      const avatarImg = new window.Image();
      avatarImg.crossOrigin = "anonymous";
      const imgLoaded = await new Promise<boolean>((resolve) => {
        avatarImg.onload = () => resolve(true);
        avatarImg.onerror = () => resolve(false);
        avatarImg.src = getAssetPath("/images/ghibli-avatar.png");
      });

      if (imgLoaded) {
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(photoX, photoY, photoW, photoH, 6);
        ctx.clip();
        ctx.drawImage(avatarImg, photoX, photoY, photoW, photoH);
        ctx.restore();
      } else {
        ctx.fillStyle = "#201224";
        ctx.beginPath();
        ctx.roundRect(photoX, photoY, photoW, photoH, 6);
        ctx.fill();
        ctx.fillStyle = "#F8C8DC";
        ctx.font = "bold 56px serif";
        ctx.textAlign = "center";
        ctx.fillText("♡", photoX + photoW / 2, photoY + photoH / 2);
      }

      ctx.strokeStyle = "rgba(0, 0, 0, 0.1)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(photoX, photoY, photoW, photoH, 6);
      ctx.stroke();

      // Polaroid Handwritten text
      ctx.fillStyle = "#4A3E4D";
      ctx.font = "italic 20px Georgia, serif";
      ctx.textAlign = "center";
      ctx.fillText("November 7 • Always remembered ✦", polaroidX + polaroidW / 2, polaroidY + 545);

      ctx.fillStyle = "#8E7D8F";
      ctx.font = "13px monospace";
      ctx.fillText("EDITION #2026 // WITH QUIET LOVE", polaroidX + polaroidW / 2, polaroidY + 580);

      // 3. Right side: Typography & Reflection
      const rightX = 575;

      ctx.fillStyle = "#E2B679";
      ctx.font = "600 13px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      ctx.textAlign = "left";
      ctx.textBaseline = "alphabetic";
      ctx.fillText("✦  SPECIAL BIRTHDAY KEEPSAKE  ✦", rightX, 135);

      // Headline
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 48px Georgia, 'Cinzel', serif";
      ctx.fillText("Happy Birthday", rightX, 195);
      ctx.fillStyle = "#F8C8DC";
      ctx.fillText("to You", rightX, 252);

      // Decorative divider
      const divGrad = ctx.createLinearGradient(rightX, 285, rightX + 480, 285);
      divGrad.addColorStop(0, "#F8C8DC");
      divGrad.addColorStop(0.5, "#E2B679");
      divGrad.addColorStop(1, "rgba(248, 200, 220, 0.05)");
      ctx.strokeStyle = divGrad;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(rightX, 285);
      ctx.lineTo(rightX + 480, 285);
      ctx.stroke();

      // Hindi Poetic Reflection
      ctx.fillStyle = "#F8C8DC";
      ctx.font = "italic 22px Georgia, 'Nirmala UI', serif";
      ctx.fillText("“कुछ रिश्ते खत्म नहीं होते, बस बात करना बंद हो जाती है।”", rightX, 345);

      // Gentle message
      ctx.fillStyle = "#D6C7DA";
      ctx.font = "300 17px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
      const bodyLines = [
        "May every silent wish of your kind heart come true.",
        "I hope this new chapter brings you deep peace, boundless",
        "happiness, radiant opportunities, and countless reasons to smile.",
        "",
        "No expectations, no pressure — just a sincere wish",
        "that life always treats you kindly, wherever your path may lead."
      ];
      let lineY = 398;
      bodyLines.forEach((line) => {
        ctx.fillText(line, rightX, lineY);
        lineY += 28;
      });

      // Closing Signature
      ctx.fillStyle = "#E2B679";
      ctx.font = "italic 19px Georgia, serif";
      ctx.fillText("With quiet gratitude and warmth,", rightX, 605);
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 21px Georgia, serif";
      ctx.fillText("Take care of yourself, always ♡", rightX, 638);

      // Vintage Postal Stamp
      const stampX = 1040;
      const stampY = 635;
      const stampR = 46;

      ctx.save();
      ctx.translate(stampX, stampY);
      ctx.rotate(-0.16);
      ctx.strokeStyle = "rgba(226, 182, 121, 0.55)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, stampR, 0, Math.PI * 2);
      ctx.stroke();

      ctx.setLineDash([4, 4]);
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(0, 0, stampR - 8, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = "rgba(226, 182, 121, 0.85)";
      ctx.font = "bold 10px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("NOV 07", 0, -12);
      ctx.fillText("OFFICIAL", 0, 2);
      ctx.fillText("★ 2026 ★", 0, 16);
      ctx.restore();

      // Trigger instant download
      const dataUrl = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = "Happy-Birthday-Keepsake-Postcard.png";
      downloadLink.href = dataUrl;
      downloadLink.click();

      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3500);
    } catch (err) {
      console.error("Failed to generate postcard:", err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 text-center z-10 py-24 overflow-hidden bg-background">
      <motion.div
        initial={{ scale: 0.2, opacity: 0.1 }}
        whileInView={{ scale: [0.5, 1.5, 1], opacity: [0.2, 0.6, 0.4] }}
        viewport={{ once: true }}
        transition={{ duration: 3, ease: "easeInOut" }}
        className="absolute w-[600px] h-[600px] bg-rosePink-300/18 rounded-full blur-[160px] pointer-events-none"
      />

      <div className="relative max-w-lg w-full flex flex-col items-center justify-center min-h-[300px] space-y-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          onAnimationComplete={() => setStep(1)}
          className="text-xl sm:text-2xl font-serif text-textSecondary italic will-change-transform"
        >
          {finalSurprise.waitLine1}
        </motion.p>

        {step >= 1 && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            onAnimationComplete={() => setStep(2)}
            className="text-lg sm:text-xl font-light text-rosePink-300/90 tracking-widest uppercase font-cinzel glow-text-pink will-change-transform"
          >
            {finalSurprise.waitLine2}
          </motion.p>
        )}

        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="space-y-4 pt-6 will-change-transform"
          >
            <div className="flex items-center justify-center space-x-2 text-rosePink-300">
              <Heart className="w-5 h-5 fill-rosePink-300 animate-pulse" />
              <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: "8s" }} />
              <Heart className="w-5 h-5 fill-rosePink-300 animate-pulse" />
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-cinzel font-bold tracking-wider text-textPrimary glow-text-pink">
              Happy Birthday to You
            </h1>

            <p className="text-base sm:text-lg font-serif text-rosePink-100 font-light italic max-w-sm mx-auto leading-relaxed">
              {finalSurprise.subline}
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.2 }}
              className="pt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 flex-wrap"
            >
              <button
                onClick={handleExportPostcard}
                disabled={isExporting}
                className="group relative flex items-center space-x-2.5 px-6 py-3.5 rounded-full bg-surface/90 hover:bg-surface border border-rosePink-300/40 hover:border-rosePink-300/80 text-rosePink-200 hover:text-white text-xs tracking-widest uppercase transition-all duration-300 active:scale-95 shadow-glow-pink/30 disabled:opacity-60"
              >
                {isExporting ? (
                  <>
                    <Loader2 className="w-4 h-4 text-rosePink-300 animate-spin" />
                    <span>Crafting Postcard...</span>
                  </>
                ) : isSaved ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300">Postcard Saved! ✨</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 text-rosePink-300 group-hover:translate-y-0.5 transition-transform" />
                    <span>Save Postcard 💌</span>
                  </>
                )}
              </button>

              <button
                onClick={onReplay}
                className="group relative flex items-center space-x-2.5 px-6 py-3.5 rounded-full bg-surface/80 hover:bg-surface border border-white/15 hover:border-white/30 text-textSecondary hover:text-textPrimary text-xs tracking-widest uppercase transition-all duration-300 active:scale-95"
              >
                <RefreshCw className="w-4 h-4 text-textSecondary group-hover:text-rosePink-300 group-hover:rotate-180 transition-transform duration-700" />
                <span>{finalSurprise.replayButton}</span>
              </button>

              {onContinueToFarewell && (
                <button
                  onClick={onContinueToFarewell}
                  className="group relative flex items-center space-x-2.5 px-7 py-3.5 rounded-full glass-panel-pink hover:border-rosePink-300/60 text-rosePink-200 text-xs tracking-widest uppercase transition-all duration-500 shadow-glow-pink hover:shadow-glow active:scale-95"
                >
                  <span>Wait... There&apos;s one more thing</span>
                  <ChevronDown className="w-4 h-4 text-rosePink-300 group-hover:translate-y-1 transition-transform" />
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
