const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const GHIBLI_PATH = path.join(PUBLIC_DIR, 'images', 'ghibli-avatar.png');
const FALLBACK_PHOTO_PATH = path.join(PUBLIC_DIR, 'images', 'photo-1.jpg');
const PHOTO_PATH = fs.existsSync(GHIBLI_PATH) ? GHIBLI_PATH : FALLBACK_PHOTO_PATH;

async function generateAll() {
  console.log('Generating production visual assets & social preview images...');

  // 1. Prepare circular avatar from photo-1.jpg
  const avatarSize = 320;
  const circleSvg = Buffer.from(
    `<svg width="${avatarSize}" height="${avatarSize}">
      <circle cx="${avatarSize / 2}" cy="${avatarSize / 2}" r="${avatarSize / 2}" fill="#fff" />
    </svg>`
  );

  let avatarBuffer;
  try {
    avatarBuffer = await sharp(PHOTO_PATH)
      .resize(avatarSize, avatarSize, { fit: 'cover', position: 'center' })
      .composite([{
        input: circleSvg,
        blend: 'dest-in'
      }])
      .png()
      .toBuffer();
    console.log('✓ Avatar cropped successfully');
  } catch (err) {
    console.warn('Could not crop photo-1, using fallback avatar', err);
  }

  // 2. Build 1200x630 OpenGraph Banner SVG overlay
  const width = 1200;
  const height = 630;

  // Generate star field points
  const stars = [
    { cx: 80, cy: 90, r: 1.5, o: 0.6 },
    { cx: 200, cy: 160, r: 2, o: 0.8 },
    { cx: 150, cy: 490, r: 1.8, o: 0.7 },
    { cx: 340, cy: 560, r: 1.2, o: 0.5 },
    { cx: 430, cy: 80, r: 2, o: 0.8 },
    { cx: 620, cy: 50, r: 1.5, o: 0.6 },
    { cx: 850, cy: 90, r: 1.8, o: 0.7 },
    { cx: 1080, cy: 140, r: 2.2, o: 0.9 },
    { cx: 1140, cy: 300, r: 1.4, o: 0.5 },
    { cx: 1110, cy: 480, r: 1.9, o: 0.75 },
    { cx: 960, cy: 570, r: 1.3, o: 0.6 },
    { cx: 720, cy: 590, r: 1.5, o: 0.5 },
    { cx: 500, cy: 550, r: 2, o: 0.7 },
  ];

  const starsSvg = stars
    .map(s => `<circle cx="${s.cx}" cy="${s.cy}" r="${s.r}" fill="#FFFFFF" opacity="${s.o}" />`)
    .join('\n');

  const bannerSvg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background linear gradient -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#08070C" />
      <stop offset="50%" stop-color="#120B17" />
      <stop offset="100%" stop-color="#09080E" />
    </linearGradient>

    <!-- Ambient radial glows -->
    <radialGradient id="pinkGlow" cx="240" cy="315" r="380" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#F8C8DC" stop-opacity="0.28" />
      <stop offset="45%" stop-color="#E8A5B8" stop-opacity="0.10" />
      <stop offset="100%" stop-color="#120B17" stop-opacity="0" />
    </radialGradient>

    <radialGradient id="goldGlow" cx="1000" cy="180" r="420" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#F2D7B0" stop-opacity="0.22" />
      <stop offset="50%" stop-color="#E6C896" stop-opacity="0.08" />
      <stop offset="100%" stop-color="#09080E" stop-opacity="0" />
    </radialGradient>

    <!-- Glass border gradient -->
    <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F8C8DC" stop-opacity="0.5" />
      <stop offset="50%" stop-color="#FFFFFF" stop-opacity="0.15" />
      <stop offset="100%" stop-color="#F2D7B0" stop-opacity="0.45" />
    </linearGradient>

    <linearGradient id="goldText" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="60%" stop-color="#FFF0F5" />
      <stop offset="100%" stop-color="#F8C8DC" />
    </linearGradient>

    <linearGradient id="accentText" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#F8C8DC" />
      <stop offset="100%" stop-color="#F2D7B0" />
    </linearGradient>

    <filter id="softBlur" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" />
    </filter>
  </defs>

  <!-- Base background -->
  <rect width="100%" height="100%" fill="url(#bgGrad)" />

  <!-- Ambient glowing spheres -->
  <circle cx="240" cy="315" r="380" fill="url(#pinkGlow)" />
  <circle cx="1000" cy="180" r="420" fill="url(#goldGlow)" />

  <!-- Star field -->
  ${starsSvg}

  <!-- Outer Glass Frame -->
  <rect x="28" y="28" width="1144" height="574" rx="28" fill="none" stroke="url(#borderGrad)" stroke-width="1.5" />
  <rect x="36" y="36" width="1128" height="558" rx="22" fill="none" stroke="#FFFFFF" stroke-opacity="0.05" stroke-width="1" />

  <!-- Corner 4-point Stars (✦) -->
  <g fill="#F2D7B0" opacity="0.8">
    <path d="M 52,47 L 54,52 L 59,54 L 54,56 L 52,61 L 50,56 L 45,54 L 50,52 Z" />
    <path d="M 1148,47 L 1150,52 L 1155,54 L 1150,56 L 1148,61 L 1146,56 L 1141,54 L 1146,52 Z" />
    <path d="M 52,577 L 54,582 L 59,584 L 54,586 L 52,591 L 50,586 L 45,584 L 50,582 Z" />
    <path d="M 1148,577 L 1150,582 L 1155,584 L 1150,586 L 1148,591 L 1146,586 L 1141,584 L 1146,582 Z" />
  </g>

  <!-- Left Side: Avatar Halo Rings (Avatar center is at cx=240, cy=315) -->
  <circle cx="240" cy="315" r="176" fill="none" stroke="#F8C8DC" stroke-opacity="0.35" stroke-width="3" filter="url(#softBlur)" />
  <circle cx="240" cy="315" r="172" fill="none" stroke="#F2D7B0" stroke-opacity="0.6" stroke-width="1.5" stroke-dasharray="6 4" />
  <circle cx="240" cy="315" r="165" fill="none" stroke="#FFFFFF" stroke-opacity="0.4" stroke-width="2" />
  <circle cx="240" cy="315" r="162" fill="none" stroke="#F8C8DC" stroke-opacity="0.8" stroke-width="1.5" />

  <!-- Halo sparkle accents -->
  <g fill="#F8C8DC">
    <circle cx="395" cy="210" r="3.5" opacity="0.9" />
    <path d="M 395,198 L 397,204 L 403,206 L 397,208 L 395,214 L 393,208 L 387,206 L 393,204 Z" opacity="0.85" />
    <circle cx="95" cy="410" r="3" opacity="0.8" />
    <path d="M 95,400 L 96.5,405 L 101.5,406.5 L 96.5,408 L 95,413 L 93.5,408 L 88.5,406.5 L 93.5,405 Z" opacity="0.75" />
  </g>

  <!-- Right Side: Content Area (starts at x=460) -->

  <!-- Top Badge -->
  <rect x="460" y="80" width="370" height="34" rx="17" fill="#F8C8DC" fill-opacity="0.12" stroke="#F8C8DC" stroke-opacity="0.35" stroke-width="1" />
  <text x="645" y="102" fill="#F8C8DC" font-family="'Cinzel', 'Playfair Display', Georgia, serif" font-size="12" font-weight="600" letter-spacing="3" text-anchor="middle">
    ✦ SPECIAL DIGITAL EXPERIENCE ✦
  </text>

  <!-- Main Headline -->
  <text x="460" y="172" fill="url(#goldText)" font-family="'Cinzel', 'Playfair Display', Georgia, serif" font-size="44" font-weight="700" letter-spacing="0.5">
    Happy Birthday to You
  </text>

  <!-- Subtitle -->
  <text x="460" y="215" fill="url(#accentText)" font-family="'Playfair Display', Georgia, serif" font-style="italic" font-size="24" font-weight="400" letter-spacing="0.5">
    A Quiet World of Memories, Music &amp; Warm Wishes ♡
  </text>

  <!-- Quote Glass Card -->
  <rect x="460" y="250" width="670" height="152" rx="20" fill="#FFFFFF" fill-opacity="0.04" stroke="#F8C8DC" stroke-opacity="0.22" stroke-width="1.2" />

  <!-- Heart on card -->
  <g transform="translate(485, 275)" fill="#F8C8DC" opacity="0.8">
    <path d="M 8,2 C 4.5,-2 0,0.5 0,5 C 0,9.5 8,15 8,15 C 8,15 16,9.5 16,5 C 16,0.5 11.5,-2 8,2 Z" />
  </g>
  <text x="510" y="287" fill="#F8C8DC" font-family="'Cinzel', Georgia, serif" font-size="11" font-weight="600" letter-spacing="2">
    HEARTFELT NOTE
  </text>

  <!-- Hindi Quote Line -->
  <text x="485" y="332" fill="#FFFFFF" font-family="'Segoe UI', 'Arial Unicode MS', sans-serif" font-size="21" font-weight="500" letter-spacing="0.5">
    “कुछ रिश्ते खत्म नहीं होते, बस बात करना बंद हो जाती है।”
  </text>

  <!-- English Translation Line -->
  <text x="485" y="372" fill="#E0D4E4" font-family="'Playfair Display', Georgia, serif" font-style="italic" font-size="15" font-weight="300" letter-spacing="0.2">
    “Some bonds never truly end; only words quietly fall silent.”
  </text>

  <!-- Feature Pills -->
  <g transform="translate(460, 424)">
    <!-- Pill 1: Music -->
    <rect x="0" y="0" width="175" height="34" rx="17" fill="#FFFFFF" fill-opacity="0.04" stroke="#FFFFFF" stroke-opacity="0.12" stroke-width="1" />
    <text x="87" y="22" fill="#F8C8DC" font-family="Georgia, serif" font-size="12" text-anchor="middle">
      🎵 Special Audio
    </text>

    <!-- Pill 2: Candle -->
    <rect x="187" y="0" width="180" height="34" rx="17" fill="#FFFFFF" fill-opacity="0.04" stroke="#FFFFFF" stroke-opacity="0.12" stroke-width="1" />
    <text x="277" y="22" fill="#F2D7B0" font-family="Georgia, serif" font-size="12" text-anchor="middle">
      🕯 Candle &amp; Wish
    </text>

    <!-- Pill 3: Photo Memories -->
    <rect x="379" y="0" width="195" height="34" rx="17" fill="#FFFFFF" fill-opacity="0.04" stroke="#FFFFFF" stroke-opacity="0.12" stroke-width="1" />
    <text x="476" y="22" fill="#FFFFFF" font-family="Georgia, serif" font-size="12" text-anchor="middle">
      📸 Treasured Photos
    </text>
  </g>

  <!-- Bottom CTA Ribbon -->
  <g transform="translate(460, 482)">
    <rect x="0" y="0" width="460" height="48" rx="24" fill="#F8C8DC" fill-opacity="0.18" stroke="#F8C8DC" stroke-opacity="0.5" stroke-width="1.2" />
    <text x="230" y="30" fill="#FFFFFF" font-family="'Cinzel', Georgia, serif" font-size="13" font-weight="600" letter-spacing="2.5" text-anchor="middle">
      ✦ TAP TO OPEN THE EXPERIENCE ✦
    </text>
  </g>

  <!-- Sub note -->
  <text x="460" y="560" fill="#A89EAE" font-family="'Segoe UI', sans-serif" font-size="12" letter-spacing="1">
    Crafted with quiet warmth &amp; heartfelt memories • Available in high definition
  </text>
</svg>
`;

  // 3. Composite background + avatar into final OG images
  const baseImg = sharp(Buffer.from(bannerSvg));

  const composites = [];
  if (avatarBuffer) {
    composites.push({
      input: avatarBuffer,
      top: 315 - avatarSize / 2, // 155
      left: 240 - avatarSize / 2, // 80
    });
  }

  const finalComposite = baseImg.composite(composites);

  // Write public/og-image.jpg (high quality JPEG, under 300KB)
  await finalComposite
    .clone()
    .jpeg({ quality: 90, progressive: true, mozjpeg: true })
    .toFile(path.join(PUBLIC_DIR, 'og-image.jpg'));
  console.log('✓ Generated public/og-image.jpg');

  // Write public/og-image.png (crisp PNG)
  await finalComposite
    .clone()
    .png()
    .toFile(path.join(PUBLIC_DIR, 'og-image.png'));
  console.log('✓ Generated public/og-image.png');

  // Also write to src/app/opengraph-image.png for native Next.js file-based OG route fallback
  const appDir = path.join(__dirname, '..', 'src', 'app');
  await finalComposite
    .clone()
    .png()
    .toFile(path.join(appDir, 'opengraph-image.png'));
  console.log('✓ Generated src/app/opengraph-image.png');

  // 4. Generate App Icons (apple-touch-icon, pwa icons, favicon)
  const iconBaseSvg = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#140B17" />
      <stop offset="100%" stop-color="#070709" />
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#F8C8DC" stop-opacity="0.35" />
      <stop offset="100%" stop-color="#000" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" rx="112" fill="url(#bg)" />
  <circle cx="256" cy="256" r="220" fill="url(#glow)" />
  <rect x="20" y="20" width="472" height="472" rx="96" fill="none" stroke="#F8C8DC" stroke-opacity="0.4" stroke-width="4" />
  
  <!-- Central Heart & Sparkle Symbol -->
  <g transform="translate(256, 256) scale(12)" fill="#F8C8DC">
    <path d="M 0,-5 C -4,-10 -11,-7 -11,-1 C -11,5 0,12 0,12 C 0,12 11,5 11,-1 C 11,-7 4,-10 0,-5 Z" />
  </g>
  <g fill="#F2D7B0">
    <circle cx="370" cy="150" r="8" />
    <circle cx="140" cy="360" r="6" />
  </g>
</svg>
`;

  // 512x512 icon
  await sharp(Buffer.from(iconBaseSvg))
    .resize(512, 512)
    .png()
    .toFile(path.join(PUBLIC_DIR, 'icon-512.png'));
  console.log('✓ Generated public/icon-512.png');

  // 192x192 icon
  await sharp(Buffer.from(iconBaseSvg))
    .resize(192, 192)
    .png()
    .toFile(path.join(PUBLIC_DIR, 'icon-192.png'));
  console.log('✓ Generated public/icon-192.png');

  // 180x180 apple-touch-icon
  await sharp(Buffer.from(iconBaseSvg))
    .resize(180, 180)
    .png()
    .toFile(path.join(PUBLIC_DIR, 'apple-touch-icon.png'));
  console.log('✓ Generated public/apple-touch-icon.png');

  // 32x32 favicon.png
  await sharp(Buffer.from(iconBaseSvg))
    .resize(32, 32)
    .png()
    .toFile(path.join(PUBLIC_DIR, 'favicon.png'));
  console.log('✓ Generated public/favicon.png');

  // 32x32 favicon.ico
  await sharp(Buffer.from(iconBaseSvg))
    .resize(32, 32)
    .png()
    .toFile(path.join(PUBLIC_DIR, 'favicon.ico'));
  console.log('✓ Generated public/favicon.ico');

  console.log('🎉 All visual assets generated successfully!');
}

generateAll().catch(err => {
  console.error('Asset generation failed:', err);
  process.exit(1);
});
