"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Share2,
  Copy,
  Check,
  QrCode,
  ExternalLink,
  Sparkles,
  Heart,
  MessageCircle,
  Send,
  Eye,
} from "lucide-react";
import QRCode from "qrcode";
import { birthdayConfig, getAssetPath } from "@/config/birthday";

interface VisualShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VisualShareModal({ isOpen, onClose }: VisualShareModalProps) {
  const [activeTab, setActiveTab] = useState<"card" | "qr">("card");
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [qrSvg, setQrSvg] = useState<string>("");
  const [hasNativeShare, setHasNativeShare] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = window.location.origin + window.location.pathname;
      setShareUrl(url);
      setHasNativeShare(typeof navigator !== "undefined" && !!navigator.share);

      QRCode.toString(url, {
        type: "svg",
        margin: 1,
        color: {
          dark: "#F8C8DC",
          light: "#00000000",
        },
      })
        .then((svg) => setQrSvg(svg))
        .catch((err) => console.error("Failed to generate QR code", err));
    }
  }, []);

  const shareTitle = `Happy Birthday, ${birthdayConfig.recipientName} ✦`;
  const shareText = `Hey... I made something quiet and special for you. Take a breath and open this world made just for your birthday ✦`;

  const handleCopy = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        // Fallback for older browsers
        const textarea = document.createElement("textarea");
        textarea.value = shareUrl;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2600);
    } catch (err) {
      console.error("Failed to copy link", err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        // User cancelled or failed
        console.warn("Share cancelled or failed", err);
      }
    } else {
      handleCopy();
    }
  };

  const handleWhatsAppShare = () => {
    const fullMessage = `${shareText}\n\n${shareUrl}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      fullMessage
    )}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const handleTelegramShare = () => {
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(
      shareUrl
    )}&text=${encodeURIComponent(shareText)}`;
    window.open(telegramUrl, "_blank", "noopener,noreferrer");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-full max-w-lg glass-panel p-6 sm:p-8 rounded-3xl border border-white/20 shadow-2xl z-10 my-auto text-left"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-rosePink-300/15 border border-rosePink-300/30 flex items-center justify-center text-rosePink-300">
                <Share2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-serif font-medium text-textPrimary">
                  Share the Experience
                </h3>
                <p className="text-[11px] text-textSecondary">
                  Visual preview card for WhatsApp, iMessage &amp; Social
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-textSecondary hover:text-textPrimary hover:bg-white/10 transition-colors"
              aria-label="Close share dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex rounded-full bg-surface/70 p-1 border border-white/10 mb-6">
            <button
              onClick={() => setActiveTab("card")}
              className={`flex-1 py-1.5 text-xs font-cinzel tracking-wider rounded-full flex items-center justify-center space-x-2 transition-all ${
                activeTab === "card"
                  ? "bg-rosePink-300/25 text-rosePink-200 border border-rosePink-300/30 shadow-glow-pink"
                  : "text-textSecondary hover:text-textPrimary"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Card Preview</span>
            </button>
            <button
              onClick={() => setActiveTab("qr")}
              className={`flex-1 py-1.5 text-xs font-cinzel tracking-wider rounded-full flex items-center justify-center space-x-2 transition-all ${
                activeTab === "qr"
                  ? "bg-rosePink-300/25 text-rosePink-200 border border-rosePink-300/30 shadow-glow-pink"
                  : "text-textSecondary hover:text-textPrimary"
              }`}
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>QR Code</span>
            </button>
          </div>

          {activeTab === "card" ? (
            <div className="space-y-5">
              {/* Live Visual Social Card Preview */}
              <div className="relative group rounded-2xl overflow-hidden border border-rosePink-300/30 bg-surface/60 shadow-lg p-3">
                <div className="relative w-full aspect-[1200/630] rounded-xl overflow-hidden bg-background mb-3 border border-white/10">
                  <img
                    src={getAssetPath("/og-image.jpg")}
                    alt="Social Share Card Preview"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] text-rosePink-300 border border-rosePink-300/30 flex items-center space-x-1">
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>Social Link Card</span>
                  </div>
                </div>

                <div className="px-1 space-y-1">
                  <div className="flex items-center space-x-1.5 text-[10px] text-rosePink-300 uppercase tracking-widest font-mono">
                    <Heart className="w-2.5 h-2.5 fill-rosePink-300/50" />
                    <span>Personal Birthday Journey</span>
                  </div>
                  <h4 className="text-sm font-serif font-medium text-textPrimary truncate">
                    Happy Birthday, {birthdayConfig.recipientName} ✦ A Special Journey
                  </h4>
                  <p className="text-[11px] text-textSecondary line-clamp-2 leading-relaxed font-light">
                    {birthdayConfig.subtitle}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                {/* WhatsApp button */}
                <button
                  onClick={handleWhatsAppShare}
                  className="flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-medium transition-all duration-300 active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-emerald-500/30" />
                  <span>WhatsApp</span>
                </button>

                {/* Telegram button */}
                <button
                  onClick={handleTelegramShare}
                  className="flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/30 text-sky-300 text-xs font-medium transition-all duration-300 active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>Telegram</span>
                </button>
              </div>

              {/* Native Share or Direct Copy */}
              <div className="flex items-center space-x-2 pt-1">
                {hasNativeShare && (
                  <button
                    onClick={handleNativeShare}
                    className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-rosePink-300/20 hover:bg-rosePink-300/30 border border-rosePink-300/40 text-rosePink-200 text-xs font-cinzel tracking-wider transition-all duration-300 shadow-glow-pink active:scale-95"
                  >
                    <Share2 className="w-4 h-4 text-rosePink-300" />
                    <span>Native Share</span>
                  </button>
                )}

                <button
                  onClick={handleCopy}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl border text-xs font-cinzel tracking-wider transition-all duration-300 active:scale-95 ${
                    copied
                      ? "bg-rosePink-300/30 border-rosePink-300 text-rosePink-200"
                      : "bg-surface hover:bg-surface-hover border-white/15 text-textPrimary"
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-rosePink-300" />
                      <span>Link Copied! ♡</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-rosePink-300" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            /* QR Code Tab */
            <div className="flex flex-col items-center justify-center py-4 space-y-4 text-center">
              <div className="relative p-6 rounded-3xl bg-surface/90 border border-rosePink-300/40 shadow-glow-pink flex items-center justify-center">
                {qrSvg ? (
                  <div
                    className="w-48 h-48 sm:w-56 sm:h-56 [&>svg]:w-full [&>svg]:h-full"
                    dangerouslySetInnerHTML={{ __html: qrSvg }}
                  />
                ) : (
                  <div className="w-48 h-48 flex items-center justify-center text-xs text-textSecondary">
                    Generating QR...
                  </div>
                )}
                <div className="absolute inset-0 pointer-events-none rounded-3xl border border-white/10" />
              </div>

              <div className="space-y-1">
                <p className="text-xs font-serif text-rosePink-200">
                  Scan with any phone camera
                </p>
                <p className="text-[11px] text-textSecondary font-light">
                  Direct instant access to the personalized experience
                </p>
              </div>

              <button
                onClick={handleCopy}
                className="mt-2 flex items-center space-x-2 px-5 py-2.5 rounded-full bg-surface hover:bg-surface-hover border border-white/10 text-xs text-textPrimary transition-all active:scale-95"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-rosePink-300" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-rosePink-300" />
                    <span>Copy Page URL</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Footer note */}
          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-textSecondary">
            <span className="flex items-center space-x-1">
              <Sparkles className="w-3 h-3 text-rosePink-300" />
              <span>Production Grade Experience</span>
            </span>
            <a
              href={getAssetPath("/og-image.jpg")}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-rosePink-300 transition-colors flex items-center space-x-1"
            >
              <span>View Full Card</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
