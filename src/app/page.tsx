"use client";

import React, { useState, useEffect, useRef } from "react";
import { ParticleBackground } from "@/components/ParticleBackground";
import { SectionNav } from "@/components/SectionNav";
import { FloatingAudioWidget } from "@/components/FloatingAudioWidget";
import { SectionIntro } from "@/components/SectionIntro";
import { SectionHero } from "@/components/SectionHero";
import { SectionCake } from "@/components/SectionCake";
import { SectionLetter } from "@/components/SectionLetter";
import { SectionMemories } from "@/components/SectionMemories";
import { SectionSoundtrack } from "@/components/SectionSoundtrack";
import { SectionWishes } from "@/components/SectionWishes";
import { SectionStars } from "@/components/SectionStars";
import { SectionFinal } from "@/components/SectionFinal";
import { SectionGoodbye } from "@/components/SectionGoodbye";
import { useAudio } from "@/context/audio-context";

export default function BirthdayPage() {
  const [activeSection, setActiveSection] = useState(1);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const { play, pause } = useAudio();
  const prevSectionRef = useRef<number>(1);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.indexOf(entry.target as HTMLElement);
            if (index !== -1) {
              const currentSection = index + 1;
              setActiveSection(currentSection);

              // Automatic Music Lifecycle:
              // Chapters 2 to 8 (Hero, Cake, Letter, Memories, Soundtrack, Wishes, Stars) -> Auto-start / resume music
              // Chapter 1 (Intro) and Chapters 9 & 10 (Finale & Farewell) -> Auto-stop music
              if (currentSection !== prevSectionRef.current) {
                if (currentSection >= 2 && currentSection <= 8) {
                  play();
                } else if (currentSection === 1 || currentSection === 9 || currentSection === 10) {
                  pause();
                }
                prevSectionRef.current = currentSection;
              }
            }
          }
        });
      },
      { threshold: 0.35 }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [play, pause]);

  // Mobile / browser gesture listener:
  // If user scrolls or taps into chapters 2-8, ensure audio begins playing seamlessly
  useEffect(() => {
    const handleFirstGesture = () => {
      if (prevSectionRef.current >= 2 && prevSectionRef.current <= 8) {
        play();
      }
    };

    window.addEventListener("pointerdown", handleFirstGesture, { once: true, passive: true });
    window.addEventListener("touchstart", handleFirstGesture, { once: true, passive: true });
    window.addEventListener("scroll", handleFirstGesture, { once: true, passive: true });

    return () => {
      window.removeEventListener("pointerdown", handleFirstGesture);
      window.removeEventListener("touchstart", handleFirstGesture);
      window.removeEventListener("scroll", handleFirstGesture);
    };
  }, [play]);

  const scrollToSection = (sectionIndex: number) => {
    const target = sectionRefs.current[sectionIndex - 1];
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="relative min-h-screen bg-background text-textPrimary overflow-x-hidden selection:bg-champagne-300/30 selection:text-champagne-100">
      <ParticleBackground />
      <SectionNav activeSection={activeSection} totalSections={10} />
      <FloatingAudioWidget />

      <section
        ref={(el) => {
          sectionRefs.current[0] = el;
        }}
        id="section-1"
        className="w-full min-h-screen"
      >
        <SectionIntro onContinue={() => scrollToSection(2)} />
      </section>

      <section
        ref={(el) => {
          sectionRefs.current[1] = el;
        }}
        id="section-2"
        className="w-full min-h-screen"
      >
        <SectionHero />
      </section>

      <section
        ref={(el) => {
          sectionRefs.current[2] = el;
        }}
        id="section-3"
        className="w-full min-h-screen"
      >
        <SectionCake />
      </section>

      <section
        ref={(el) => {
          sectionRefs.current[3] = el;
        }}
        id="section-4"
        className="w-full min-h-screen"
      >
        <SectionLetter />
      </section>

      <section
        ref={(el) => {
          sectionRefs.current[4] = el;
        }}
        id="section-5"
        className="w-full min-h-screen"
      >
        <SectionMemories />
      </section>

      <section
        ref={(el) => {
          sectionRefs.current[5] = el;
        }}
        id="section-6"
        className="w-full min-h-screen"
      >
        <SectionSoundtrack />
      </section>

      <section
        ref={(el) => {
          sectionRefs.current[6] = el;
        }}
        id="section-7"
        className="w-full min-h-screen"
      >
        <SectionWishes />
      </section>

      <section
        ref={(el) => {
          sectionRefs.current[7] = el;
        }}
        id="section-8"
        className="w-full min-h-screen"
      >
        <SectionStars />
      </section>

      <section
        ref={(el) => {
          sectionRefs.current[8] = el;
        }}
        id="section-9"
        className="w-full min-h-screen"
      >
        <SectionFinal
          onReplay={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setActiveSection(1);
            prevSectionRef.current = 1;
            pause();
          }}
          onContinueToFarewell={() => scrollToSection(10)}
        />
      </section>

      <section
        ref={(el) => {
          sectionRefs.current[9] = el;
        }}
        id="section-10"
        className="w-full min-h-screen"
      >
        <SectionGoodbye
          onReplay={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setActiveSection(1);
            prevSectionRef.current = 1;
            pause();
          }}
        />
      </section>
    </main>
  );
}
