export interface MemoryItem {
  id: string;
  title: string;
  date: string;
  caption: string;
  image: string;
}

export interface PlaylistItem {
  id: string;
  title: string;
  artist: string;
  src: string;
  cover: string;
  duration: string;
}

export interface BirthdayConfig {
  recipientName: string;
  subtitle: string;
  openingText: {
    line1: string;
    line2: string;
    line3: string;
    buttonText: string;
  };
  mainPhoto: string;
  cakeMessage: string;
  letter: {
    title: string;
    greeting: string;
    paragraphs: string[];
    closing: string;
    sender: string;
  };
  memories: MemoryItem[];
  playlist: PlaylistItem[];
  wishes: string[];
  finalWishQuote: string;
  interactiveStars: {
    title: string;
    instruction: string;
    starCount: number;
    completedTitle: string;
    hiddenMessage: string;
  };
  finalSurprise: {
    waitLine1: string;
    waitLine2: string;
    headline: string;
    subline: string;
    replayButton: string;
  };
}

export const birthdayConfig: BirthdayConfig = {
  recipientName: "Nurul Fauziah",
  subtitle: "INI SPECIAL SEKALI ANJAY",
  openingText: {
    line1: "Hey...",
    line2: "I made something for you.",
    line3: "So take your time.",
    buttonText: "Continue ↓",
  },
  mainPhoto: "/images/birthday-photo.jpg",
  cakeMessage: "Make a wish ✦",
  letter: {
    title: "Surat Kecil dari Aku",
    greeting: "Dearest Nurul Fauziah,",
    paragraphs: [
      "Halo jia, Happy Birthday, Selamat buat kamu yaa udhh bisa ngelewatin sampai detik ini, keren sihh kamu sebenarnya",
      "Semoga panjang umur, Sehat selalu, Dan yang paling penting, selalu bahagia ya. Jangan lupa buat apresiasi diri kamu sendiri atas semua usaha dan perjuangan hebat yang udah kamu lalui selama ini.",
      "Semoga di usia yang baru ini, semua impian dan cita-citamu bisa terwujud satu per satu. Ingat ya, kamu nggak sendirian kok selalu ada orang-orang yang bangga dan sayang sama kamu. Nikmati harimu!",
    ],
    closing: "With endless warmth,",
    sender: "Always yours ♡",
  },
  memories: [
    {
      id: "1",
      title: "Si Paling 2 Jari",
      date: "Mei 2",
      caption: "A random little memory that still makes me smile.",
      image: "/images/memory-1.jpg",
    },
    {
      id: "2",
      title: "Kulineran Yang Sangat Sehat",
      date: "Agustus 3",
      caption: "Good food, warm conversations, and simple moments.",
      image: "/images/memory-2.jpg",
    },
    {
      id: "3",
      title: "Memories on Roblox",
      date: "May 3",
      caption: "Late night hangouts and endless laughs in our virtual world.",
      image: "/images/memory-3.jpg",
    },
    {
      id: "4",
      title: "Memories on Roblox",
      date: "May 3",
      caption: "No matter the distance, we always find our way back to this place.",
      image: "/images/memory-4.jpg",
    },
  ],
  playlist: [
    {
      id: "s1",
      title: "Some",
      artist: "Soyu & Junggigo",
      src: "/music/song1.mp3",
      cover: "/covers/song1.jpg",
      duration: "3:29",
    },
    {
      id: "s2",
      title: "Magnetic",
      artist: "ILLIT",
      src: "/music/song2.mp3",
      cover: "/covers/song2.jpg",
      duration: "2:57",
    },
    {
      id: "s3",
      title: "ONLY ",
      artist: "Lee Hi",
      src: "/music/song3.mp3",
      cover: "/covers/song3.jpg",
      duration: "2:50",
    },
  ],
  wishes: [
    "Semoga hari-harimu diwarnai lebih banyak senyuman.",
    "Semoga semua hal yang kamu impikan bisa terwujud satu per satu.",
    "Semoga tahun ini berjalan lebih ramah dan penuh kebaikan buat kamu.",
    "Semoga kamu selalu menemukan ketenangan di setiap momen heningmu.",
    "Semoga kamu selalu dikelilingi oleh cinta dan kehangatan.",
  ],
  finalWishQuote: "And I hope you always know how special you are.",
  interactiveStars: {
    title: "Find the stars ✦",
    instruction: "Tap on all glowing stars floating around to reveal a secret",
    starCount: 5,
    completedTitle: "You found them all ♡",
    hiddenMessage:
      "No matter how vast the universe is, your brightness always lights up the room. Keep shining bright!",
  },
  finalSurprise: {
    waitLine1: "Wait...",
    waitLine2: "There's one more thing.",
    headline: "Happy Birthday, Alya",
    subline: "I hope you have the happiest, most magical year ahead.",
    replayButton: "Replay ↻",
  },
};
