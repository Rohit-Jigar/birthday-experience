# Premium 3D Birthday Experience 🌹

A bespoke, production-ready digital gift crafted with Next.js App Router, React 19, Three.js / React Three Fiber, Framer Motion, and Tailwind CSS.

---

## 🌟 Overview of the Experience

1. **Chapter 0: Cinematic Intro & Prologue**
   - Midnight plum and rose-black cosmic atmosphere with drifting rose petals and glowing particles.
   - Staggered typography entrance: *"A little world, made just for you."* and *"Some people leave beautiful memories wherever they go."*
   - Center glowing crystal emblem with breathing pulse.
   - Gentle invitation to begin the journey.

2. **Chapter I: iPhone Lock Screen Simulation**
   - Dynamic Island with camera sensor & audio wave.
   - Realistic simulated status bar (Signal, Wi-Fi, Battery, Real Time).
   - Large digital clock and dynamic date formatted for November 7.
   - Romantic lockscreen notification banner featuring:  
     *“कुछ रिश्ते खत्म नहीं होते, बस बात करना बंद हो जाती है।”*
   - Flashlight and camera quick-action buttons.
   - Interactive passcode keypad:
     - **Passcode:** `0712`
     - Visual haptic feedback, soft Web Audio glass taps.
     - Gentle error shake on incorrect passcode.
     - Full keyboard support (0-9, Backspace, Escape).

3. **Chapter II: Three-Dimensional Romantic Universe**
   - Centerpiece 3D Glass Heart created with parametric ExtrudeGeometry and physical glass material (`meshPhysicalMaterial`).
   - Dual rotating translucent celestial rings (`#F2D7B0` champagne and `#E8A5B8` soft rose).
   - Starry galaxy depth with 1,200 floating stars and smooth pointer parallax.
   - Graceful CSS fallback for low-power mobile or non-WebGL devices.

4. **Chapter III: Photograph Gallery & Memories**
   - 3 Curated photographs revealed in floating 3D Polaroid / glass memory frames.
   - Interactive 3D tilt and light sweep effects.
   - High-resolution fullscreen lightbox with smooth keyboard and touch navigation.

5. **Chapter IV: Handwritten Birthday Letter & Candle**
   - Animated envelope with wax seal stamped with a heart.
   - Unfolding vintage parchment letter with delicate serif typography.
   - Sincere, dignified message with no pressure.
   - Interactive birthday candle: tap to blow out flame and make a silent wish with golden sparkle particles.

6. **Chapter V: Final Celebration & Wishes**
   - Champagne and rose confetti shower (`canvas-confetti`).
   - Sincere closing wishes and dedication.
   - Replay journey and revisit photos navigation.

---

## 🚀 Quick Start & Local Development

### 1. Requirements
- Node.js `>= 18.18` (Node 24 recommended)
- npm `>= 9`

### 2. Install & Run
```bash
cd birthday-experience
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Verify Build & Types
```bash
npm run typecheck
npm run build
```

---

## 📸 Adding or Replacing Photographs

All personal photos are located in `public/images/`:
- `public/images/photo-1.jpg`
- `public/images/photo-2.jpg`
- `public/images/photo-3.jpg`

To replace any photograph:
1. Copy your desired image into `public/images/`.
2. Name it `photo-1.jpg`, `photo-2.jpg`, or `photo-3.jpg` (or update paths in `src/config/birthday.ts`).

---

## ✍️ Customizing Personal Content

All copy, names, dates, quotes, and passcodes are centralized in **one single file**:
[`src/config/birthday.ts`](file:///D:/Manu/birthday-experience/src/config/birthday.ts)

Key configuration fields:
```typescript
export const BIRTHDAY_CONFIG = {
  recipientName: "You",
  birthdayDate: "November 7",
  passcode: "0712", // Phone lock code

  personalQuote: {
    hindi: "कुछ रिश्ते खत्म नहीं होते, बस बात करना बंद हो जाती है।",
    english: "Some bonds never truly end; only words quietly fall silent.",
  },

  letter: {
    salutation: "Happy Birthday,",
    paragraphs: [...],
    favoriteMemoryText: "...",
    birthdayWishText: "...",
  },
};
```

---

## 🌐 Deploying to Vercel

### Method 1: Using Vercel CLI
```bash
# In the birthday-experience folder:
npx vercel
```
Follow the simple CLI prompts:
- Link to existing project? **No**
- Project name: `birthday-experience`
- Directory: `./`
- Deploy to production: `npx vercel --prod`

### Method 2: Deploying via GitHub & Vercel Dashboard
1. Create a private GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "feat: complete premium 3D birthday experience"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. Go to [https://vercel.com/new](https://vercel.com/new).
3. Import your GitHub repository.
4. Framework Preset will automatically detect **Next.js**.
5. Click **Deploy**.

---

## ♿ Performance & Accessibility

- **Zero API Keys Required**: Procedural Web Audio API sound effects and ambient chimes work 100% offline.
- **Mobile First**: Optimized touch targets, Android Chrome & iOS Safari compatibility, viewport safe areas.
- **Reduced Motion**: Respects `prefers-reduced-motion` to disable particle animations and 3D camera shifts.
- **WebGL Fallback**: If WebGL is disabled or unsupported on older devices, automatically switches to a graceful CSS glassmorphism rendering.
