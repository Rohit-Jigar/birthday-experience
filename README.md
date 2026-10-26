<div align="center">

  <img src="public/images/ghibli-avatar.png" alt="Studio Ghibli Aesthetic Birthday Tribute" width="220" height="220" style="border-radius: 50%; border: 3px solid rgba(248, 200, 220, 0.4); box-shadow: 0 0 35px rgba(248, 200, 220, 0.35); object-fit: cover;" />

  <br />

  # ✨ Happy Birthday to You 🌹
  
  **A bespoke, cinematic digital gift crafted with quiet warmth, timeless memories & delicate aesthetics.**

  <p>
    <a href="https://rohit-jigar.github.io/birthday-experience/"><img src="https://img.shields.io/badge/Live_Experience-Open_Here_✦-ff69b4?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Live Demo" /></a>
    <a href="https://github.com/Rohit-Jigar/birthday-experience"><img src="https://img.shields.io/badge/GitHub_Pages-Online-2ea44f?style=for-the-badge&logo=github&logoColor=white" alt="Deployment Status" /></a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/Next.js-16.3-black?style=flat-square&logo=next.js" alt="Next.js" />
    <img src="https://img.shields.io/badge/React-19.2-61dafb?style=flat-square&logo=react" alt="React" />
    <img src="https://img.shields.io/badge/TailwindCSS-4.0-38b2ac?style=flat-square&logo=tailwind-css" alt="Tailwind" />
    <img src="https://img.shields.io/badge/Framer_Motion-12.4-ff0055?style=flat-square&logo=framer" alt="Framer Motion" />
    <img src="https://img.shields.io/badge/PWA-Ready-f08a5d?style=flat-square" alt="PWA Ready" />
  </p>

  <p>
    <em>“कुछ रिश्ते खत्म नहीं होते, बस बात करना बंद हो जाती है।”</em><br/>
    <sub>(Some bonds never truly end; only words quietly fall silent.)</sub>
  </p>

</div>

---

## 🌟 The 9 Chapters of the Experience

| Chapter | Title | Highlights |
| :---: | :--- | :--- |
| **01** | **Cinematic Prologue** | Midnight cosmic atmosphere, drifting rose petals, breathing glow orb, and gentle entrance typography. |
| **02** | **Hero Birthday Dedication** | Floating luxury avatar framed with celestial orbits, champagne stars, and personal dedication. |
| **03** | **Interactive Birthday Cake** | Tap the flame to make a secret wish; blows out with golden sparkle particle confetti. |
| **04** | **Handwritten Letter** | Interactive vintage envelope sealed with wax heart; unfolds a sincere, heartfelt personal letter. |
| **05** | **Cherished Moments Gallery** | Floating glassmorphism Polaroid cards with interactive 3D tilt, subtle light sweeps, and timestamps. |
| **06** | **Curated Soundtrack** | Animated spinning vinyl record sleeve with integrated audio controls, progress seeker, and volume slider. |
| **07** | **Whispers of Hope** | Staggered fade-in cards containing sincere life blessings and the iconic Hindi reflection. |
| **08** | **Interactive Star Constellation** | Interactive mini-game: search and collect 5 hidden glowing stars across the cosmos to unlock a secret message. |
| **09** | **Grand Celebration Finale** | Rose-gold confetti cascade, sincere closing dedication, and replay experience navigation. |

---

## 🎨 Visual Sharing & Privacy-First Design

- **🌸 Studio Ghibli Aesthetic Tribute:**
  - The public repository and open-source cards feature an original, charming **Studio Ghibli / Hayao Miyazaki-inspired anime illustration** (`ghibli-avatar.png`), keeping personal privacy preserved while presenting an enchanting aesthetic.
- **📱 Rich Social Link Previews (OpenGraph & Twitter):**
  - Instant high-definition card preview when sharing on **WhatsApp, iMessage, Instagram, Telegram, Twitter, LinkedIn, and Facebook**.
  - Custom 1200×630 luxury visual banner (`public/og-image.jpg`) with starry nebula backdrop, halo avatar frame, and refined typography.
- **💎 Progressive Web App (PWA):**
  - Integrated `manifest.webmanifest`, `apple-touch-icon.png`, and high-resolution adaptive favicons (`favicon.ico`, `icon-192.png`, `icon-512.png`).
  - Dark obsidian theme (`#050507`) with native iOS safe-area handling.

---

## 🛠 Tech Stack & Architecture

```
birthday-experience/
├── .github/workflows/deploy.yml   # Automated GitHub Pages Edge CDN CI/CD
├── public/
│   ├── audio/                     # Curated audio soundtrack
│   ├── covers/                    # Music album artworks
│   ├── images/
│   │   ├── ghibli-avatar.png      # Cute Ghibli aesthetic tribute art
│   │   ├── photo-[1..4].jpg       # Personal memory snapshots
│   │   └── memory-[1..4].jpg      # Treasured moment cards
│   ├── og-image.jpg               # 1200x630 Social share banner
│   ├── manifest.webmanifest       # PWA Web manifest
│   ├── apple-touch-icon.png       # iOS Homescreen icon
│   └── favicon.ico                # Adaptive browser icon
├── scripts/
│   └── generate-assets.js         # Automated OG & icon artwork generator
└── src/
    ├── app/
    │   ├── layout.tsx             # Absolute SEO, OpenGraph & viewport configuration
    │   └── page.tsx               # Main chapter orchestrator
    ├── components/                # 9 Immersive chapter components & audio widget
    ├── config/birthday.ts         # Centralized configuration (all copy, quotes & music)
    └── context/audio-context.tsx  # Offline audio player state management
```

---

## 🚀 Local Development & Quick Start

### 1. Prerequisites
- Node.js `>= 18.18` (Node 22 or 24 recommended)
- npm `>= 9`

### 2. Installation
```bash
git clone https://github.com/Rohit-Jigar/birthday-experience.git
cd birthday-experience
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build & Verify Static Export
```bash
npm run typecheck
npm run build
```

---

## ✍️ Customizing the Experience

All messages, recipient names, dates, quotes, and music tracks are centralized in **one single file**:  
[`src/config/birthday.ts`](src/config/birthday.ts)

```typescript
export const birthdayConfig = {
  recipientName: "You",
  birthdayDate: "November 7",
  subtitle: "November 7 • A world made with gratitude & quiet love",
  
  letter: {
    title: "A Letter from the Heart",
    greeting: "Happy Birthday to you,",
    paragraphs: [...],
    closing: "With quiet gratitude and warmth,",
    sender: "Take care of yourself, always ♡",
  },
  
  finalWishQuote: "“कुछ रिश्ते खत्म नहीं होते, बस बात करना बंद हो जाती है।”",
};
```

---

## 🌐 Deployment to GitHub Pages

This project is set up with automated **GitHub Actions CI/CD**:
1. Any commit pushed to the `main` branch triggers `.github/workflows/deploy.yml`.
2. Automatically installs dependencies, runs TypeScript verification, builds the Next.js static export (`output: "export"`), and deploys to GitHub Pages Edge CDN.
3. Access your live website at:  
   **`https://<your-username>.github.io/<repo-name>/`**

---

<div align="center">
  <sub>Crafted with quiet gratitude, gentle memories & timeless warmth ♡</sub>
</div>
